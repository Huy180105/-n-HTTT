import logging
from typing import Any, Dict, List, Optional

import cohere
from fastembed import TextEmbedding

try:
    from pymilvus import (
        Collection,
        CollectionSchema,
        DataType,
        FieldSchema,
        connections,
        utility,
    )

    PYMILVUS_AVAILABLE = True
except Exception as e:
    Collection = None
    CollectionSchema = None
    DataType = None
    FieldSchema = None
    connections = None
    utility = None
    PYMILVUS_AVAILABLE = False
    PYMILVUS_IMPORT_ERROR = e

from config.config import Settings

logger = logging.getLogger(__name__)


class EmbeddingService:
    _local_model = None

    def __init__(self):
        self.settings = Settings()
        self.cohere_client = None
        self.milvus_collection = None

        # Initialize fastembed locally
        if EmbeddingService._local_model is None:
            try:
                # Use a small multilingual model suitable for Vietnamese
                logger.info("Initializing local fastembed model...")
                EmbeddingService._local_model = TextEmbedding("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
                logger.info("Local fastembed model initialized successfully")
            except Exception as e:
                logger.error(f"Error initializing local fastembed model: {e}")

        if self.settings.COHERE_API_KEY:
            try:
                self.cohere_client = cohere.ClientV2(self.settings.COHERE_API_KEY)
                logger.info("Cohere client initialized")
            except Exception as e:
                logger.error(f"Error initializing Cohere client: {e}")
        else:
            logger.warning("COHERE_API_KEY not found in config")

        self._init_milvus_connection()

    def _init_milvus_connection(self):
        """Initialize Milvus/Zilliz Cloud connection if available."""
        try:
            if not PYMILVUS_AVAILABLE:
                logger.warning("Pymilvus not available, skipping Milvus init")
                return

            if self.settings.MILVUS_URI and self.settings.MILVUS_TOKEN:
                connections.connect(
                    alias="default",
                    uri=self.settings.MILVUS_URI,
                    token=self.settings.MILVUS_TOKEN,
                )
                logger.info("Milvus connected successfully")
                self._create_collection_if_not_exists()
            else:
                logger.warning("MILVUS_URI or MILVUS_TOKEN not configured")
        except Exception as e:
            logger.error(f"Error connecting to Milvus: {e}")

    def _create_collection_if_not_exists(self):
        """Create the collection if it does not exist."""
        try:
            if not PYMILVUS_AVAILABLE:
                logger.warning("Pymilvus not available, cannot create collection")
                return

            collection_name = self.settings.MILVUS_COLLECTION_NAME
            if utility.has_collection(collection_name):
                self.milvus_collection = Collection(collection_name)
                logger.info(f"Collection {collection_name} already exists")
                return

            fields = [
                FieldSchema(name="id", dtype=DataType.VARCHAR, max_length=100, is_primary=True),
                FieldSchema(name="medicine_id", dtype=DataType.VARCHAR, max_length=100),
                FieldSchema(name="name", dtype=DataType.VARCHAR, max_length=500),
                FieldSchema(name="category_id", dtype=DataType.VARCHAR, max_length=100),
                FieldSchema(name="supplier_id", dtype=DataType.VARCHAR, max_length=100),
                FieldSchema(name="description", dtype=DataType.VARCHAR, max_length=2000),
                FieldSchema(name="ingredients", dtype=DataType.VARCHAR, max_length=1000),
                FieldSchema(name="usage", dtype=DataType.VARCHAR, max_length=1000),
                FieldSchema(name="origin", dtype=DataType.VARCHAR, max_length=200),
                FieldSchema(name="packaging", dtype=DataType.VARCHAR, max_length=500),
                FieldSchema(name="price", dtype=DataType.FLOAT),
                FieldSchema(name="stock_status", dtype=DataType.VARCHAR, max_length=50),
                FieldSchema(name="is_featured", dtype=DataType.BOOL),
                FieldSchema(name="is_active", dtype=DataType.BOOL),
                FieldSchema(name="rating_star", dtype=DataType.FLOAT),
                FieldSchema(
                    name="embedding",
                    dtype=DataType.FLOAT_VECTOR,
                    dim=self.settings.EMBEDDING_DIMENSION,
                ),
            ]

            schema = CollectionSchema(fields, f"Embedding collection for {collection_name}")
            self.milvus_collection = Collection(collection_name, schema)
            index_params = {
                "metric_type": "COSINE",
                "index_type": "IVF_FLAT",
                "params": {"nlist": 1024},
            }
            self.milvus_collection.create_index(
                field_name="embedding", index_params=index_params
            )
            logger.info(f"Created collection {collection_name} successfully")
        except Exception as e:
            logger.error(f"Error creating collection: {e}")

    def check_medicine_embedding_exists(self, medicine_id: str) -> Dict[str, Any]:
        """Check if a medicine embedding exists in Milvus or MongoDB fallback."""
        try:
            if PYMILVUS_AVAILABLE and self.milvus_collection:
                self.milvus_collection.load()
                search_results = self.milvus_collection.query(
                    expr=f'medicine_id == "{medicine_id}"',
                    output_fields=["id", "medicine_id", "name", "description"],
                )
                if search_results:
                    result = search_results[0]
                    return {
                        "exists": True,
                        "medicine_id": result.get("medicine_id"),
                        "name": result.get("name"),
                        "description": result.get("description"),
                        "vector_id": result.get("id"),
                    }
                return {"exists": False, "error": "Embedding not found"}
            else:
                # Fallback: check directly in MongoDB
                from pymongo import MongoClient
                client = MongoClient(self.settings.DATABASE_URL)
                db = client[self.settings.DATABASE_NAME]
                collection = db["medicines"]
                
                med = collection.find_one({"_id": medicine_id})
                if med and med.get("embedding") is not None:
                    return {
                        "exists": True,
                        "medicine_id": medicine_id,
                        "name": med.get("name", ""),
                        "description": med.get("description", ""),
                        "vector_id": "mongodb_" + medicine_id,
                    }
                return {"exists": False, "error": "Embedding not found in MongoDB"}
        except Exception as e:
            logger.error(f"Error checking embedding: {e}")
            return {"exists": False, "error": str(e)}

    def delete_medicine_embedding(self, medicine_id: str) -> bool:
        """Delete a medicine embedding from Milvus or MongoDB fallback."""
        try:
            if PYMILVUS_AVAILABLE and self.milvus_collection:
                self.milvus_collection.load()
                search_results = self.milvus_collection.query(
                    expr=f'medicine_id == "{medicine_id}"',
                    output_fields=["id", "medicine_id", "name"],
                )
                if not search_results:
                    logger.warning(f"No embedding found for medicine ID: {medicine_id}")
                    return False
                self.milvus_collection.delete(expr=f'medicine_id == "{medicine_id}"')
                self.milvus_collection.flush()
                logger.info(f"Deleted embedding for medicine ID: {medicine_id} from Milvus")
                return True
            else:
                # Fallback: clear embedding field in MongoDB
                from pymongo import MongoClient
                client = MongoClient(self.settings.DATABASE_URL)
                db = client[self.settings.DATABASE_NAME]
                collection = db["medicines"]
                
                res = collection.update_one(
                    {"_id": medicine_id},
                    {"$unset": {"embedding": ""}}
                )
                if res.modified_count > 0:
                    logger.info(f"Deleted embedding for medicine ID: {medicine_id} from MongoDB")
                    return True
                return False
        except Exception as e:
            logger.error(f"Error deleting embedding: {e}")
            return False
        except Exception as e:
            logger.error(f"Error deleting embedding: {e}")
            return False

    def create_medicine_embedding_text(self, medicine_data: Dict[str, Any]) -> str:
        """Create embedding text from medicine data."""
        try:
            text_parts = []
            text_parts.append(f"Medicine name: {medicine_data.get('name', '')}")
            text_parts.append(f"Description: {medicine_data.get('description', '')}")

            if "details" in medicine_data:
                details = medicine_data["details"]
                if "ingredients" in details:
                    text_parts.append(f"Ingredients: {details['ingredients']}")
                if "usage" in details and isinstance(details["usage"], list):
                    usage_text = ", ".join(details["usage"])
                    text_parts.append(f"Usage: {usage_text}")

            if "usageguide" in medicine_data:
                guide = medicine_data["usageguide"]
                if "indications" in guide:
                    text_parts.append(f"Indications: {guide['indications']}")
                if "contraindications" in guide:
                    text_parts.append(f"Contraindications: {guide['contraindications']}")
                if "dosage" in guide:
                    dosage = guide["dosage"]
                    if "adult" in dosage:
                        text_parts.append(f"Adult dosage: {dosage['adult']}")
                    if "child" in dosage:
                        text_parts.append(f"Child dosage: {dosage['child']}")
                if "directions" in guide and isinstance(guide["directions"], list):
                    text_parts.append(f"Directions: {', '.join(guide['directions'])}")
                if "precautions" in guide and isinstance(guide["precautions"], list):
                    text_parts.append(f"Precautions: {', '.join(guide['precautions'])}")

            if "variants" in medicine_data:
                variants = medicine_data["variants"]
                text_parts.append(f"Stock status: {variants.get('stock_status', '')}")

            return ". ".join(text_parts)
        except Exception as e:
            logger.error(f"Error creating embedding text: {e}")
            return f"{medicine_data.get('name', '')}. {medicine_data.get('description', '')}"

    def generate_embedding(self, text: str, input_type: str = "search_document") -> Optional[List[float]]:
        """Generate embedding from text using local fastembed (preferred) or Gemini/Cohere fallback."""
        try:
            if EmbeddingService._local_model is not None:
                # Use local fastembed model
                embeddings_gen = EmbeddingService._local_model.embed([text])
                embedding = list(embeddings_gen)[0]
                return [float(x) for x in embedding]

            if self.settings.GEMINI_API_KEY:
                # Call Gemini Embedding API
                import http.client
                import json
                
                conn = http.client.HTTPSConnection("generativelanguage.googleapis.com")
                headers = {"Content-Type": "application/json"}
                payload = {
                    "content": {
                        "parts": [{"text": text}]
                    }
                }
                url = f"/v1beta/models/gemini-embedding-001:embedContent?key={self.settings.GEMINI_API_KEY}"
                conn.request("POST", url, json.dumps(payload), headers)
                res = conn.getresponse()
                if res.status == 200:
                    data = json.loads(res.read().decode("utf-8"))
                    embedding = data.get("embedding", {}).get("values", [])
                    if embedding:
                        logger.info("Successfully generated embedding using Gemini")
                        return embedding
                else:
                    logger.error(f"Gemini Embedding API returned status: {res.status}, body: {res.read().decode('utf-8')}")
            
            # Fallback to Cohere if Gemini key is missing or failed
            if self.cohere_client:
                response = self.cohere_client.embed(
                    texts=[text],
                    model=self.settings.COHERE_EMBEDDING_MODEL,
                    input_type=input_type,
                    embedding_types=["float"],
                    output_dimension=self.settings.EMBEDDING_DIMENSION,
                )
                return response.embeddings.float[0]
            else:
                logger.error("No embedding client available (local fastembed, Gemini, or Cohere)")
                return None
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            return None

    def insert_medicine_embedding(self, medicine_data: Dict[str, Any]) -> bool:
        """Insert embedding into Milvus or fallback to MongoDB."""
        try:
            embedding_text = self.create_medicine_embedding_text(medicine_data)
            embedding = self.generate_embedding(embedding_text)
            if not embedding:
                logger.error("Could not generate embedding")
                return False

            medicine_id = medicine_data.get("_id", "")
            if isinstance(medicine_id, dict) and "$oid" in medicine_id:
                medicine_id = medicine_id["$oid"]
            elif hasattr(medicine_id, "binary"):
                medicine_id = str(medicine_id)
            else:
                medicine_id = str(medicine_id)

            if PYMILVUS_AVAILABLE and self.milvus_collection:
                variants = medicine_data.get("variants", {})
                details = medicine_data.get("details", {})
                params = details.get("paramaters", {})
                ratings = medicine_data.get("ratings", {})

                usage_list = details.get("usage", [])
                usage_str = ", ".join(usage_list) if isinstance(usage_list, list) else str(usage_list)

                data = [
                    [str(medicine_id)],
                    [str(medicine_id)],
                    [medicine_data.get("name", "")],
                    [medicine_data.get("category_id", "")],
                    [medicine_data.get("supplier_id", "")],
                    [medicine_data.get("description", "")],
                    [details.get("ingredients", "")],
                    [usage_str],
                    [params.get("origin", "")],
                    [params.get("packaging", "")],
                    [float(variants.get("price", 0))],
                    [variants.get("stock_status", "")],
                    [bool(variants.get("is_featured", False))],
                    [bool(variants.get("is_active", True))],
                    [float(ratings.get("star", 0))],
                    [embedding],
                ]

                self.milvus_collection.insert(data)
                self.milvus_collection.flush()
                logger.info(f"Inserted embedding for medicine: {medicine_data.get('name', '')} into Milvus")
                return True
            else:
                # Fallback: Save embedding directly in MongoDB medicines collection
                from pymongo import MongoClient
                client = MongoClient(self.settings.DATABASE_URL)
                db = client[self.settings.DATABASE_NAME]
                collection = db["medicines"]
                
                collection.update_one(
                    {"_id": medicine_id},
                    {"$set": {"embedding": embedding}}
                )
                logger.info(f"Updated MongoDB with embedding for medicine: {medicine_data.get('name', '')}")
                return True
        except Exception as e:
            logger.error(f"Error inserting embedding: {e}")
            return False

    def search_similar_medicines(self, query_text: str, limit: int = 10) -> List[Dict]:
        """Search similar medicines based on embedding using Milvus or MongoDB fallback."""
        try:
            query_embedding = self.generate_embedding(query_text, input_type="search_query")
            if not query_embedding:
                return []

            if PYMILVUS_AVAILABLE and self.milvus_collection:
                self.milvus_collection.load()
                search_params = {
                    "metric_type": "COSINE",
                    "params": {"nprobe": 10},
                }
                results = self.milvus_collection.search(
                    data=[query_embedding],
                    anns_field="embedding",
                    param=search_params,
                    limit=limit,
                    output_fields=[
                        "medicine_id",
                        "name",
                        "description",
                        "ingredients",
                        "usage",
                        "price",
                        "rating_star",
                        "stock_status",
                    ],
                )

                formatted_results = []
                for hits in results:
                    for hit in hits:
                        formatted_results.append(
                            {
                                "medicine_id": hit.entity.get("medicine_id"),
                                "name": hit.entity.get("name"),
                                "description": hit.entity.get("description"),
                                "ingredients": hit.entity.get("ingredients"),
                                "usage": hit.entity.get("usage"),
                                "price": hit.entity.get("price"),
                                "rating_star": hit.entity.get("rating_star"),
                                "stock_status": hit.entity.get("stock_status"),
                                "similarity_score": hit.score,
                            }
                        )
                return formatted_results
            else:
                # Fallback: search directly in MongoDB
                import math
                from pymongo import MongoClient
                
                def cosine_similarity(v1, v2):
                    dot_product = sum(a * b for a, b in zip(v1, v2))
                    magnitude_v1 = math.sqrt(sum(a * a for a in v1))
                    magnitude_v2 = math.sqrt(sum(b * b for b in v2))
                    if magnitude_v1 == 0 or magnitude_v2 == 0:
                        return 0.0
                    return dot_product / (magnitude_v1 * magnitude_v2)

                client = MongoClient(self.settings.DATABASE_URL)
                db = client[self.settings.DATABASE_NAME]
                collection = db["medicines"]
                
                # Fetch all medicines that have embedding
                medicines = list(collection.find({"embedding": {"$exists": True}}))
                if not medicines:
                    logger.warning("No medicines with embeddings found in MongoDB")
                    return []
                
                scored_results = []
                for med in medicines:
                    med_embedding = med.get("embedding")
                    if not med_embedding or not isinstance(med_embedding, list):
                        continue
                    
                    score = cosine_similarity(query_embedding, med_embedding)
                    
                    variants = med.get("variants", {})
                    details = med.get("details", {})
                    ratings = med.get("ratings", {})
                    
                    scored_results.append({
                        "medicine_id": med.get("id") or str(med.get("_id")),
                        "name": med.get("name", ""),
                        "description": med.get("description", ""),
                        "ingredients": details.get("ingredients", ""),
                        "usage": details.get("usage", ""),
                        "price": float(variants.get("price", 0)),
                        "rating_star": float(ratings.get("star", 0)),
                        "stock_status": variants.get("stock_status", ""),
                        "similarity_score": score
                    })
                
                # Sort by score descending and return limit
                scored_results.sort(key=lambda x: x["similarity_score"], reverse=True)
                return scored_results[:limit]
        except Exception as e:
            logger.error(f"Error searching similar medicines: {e}")
            return []

    def batch_insert_medicines(self, medicines_data: List[Dict[str, Any]]) -> Dict[str, int]:
        """Insert multiple medicines at once."""
        success_count = 0
        error_count = 0
        for medicine in medicines_data:
            if self.insert_medicine_embedding(medicine):
                success_count += 1
            else:
                error_count += 1
        logger.info(f"Batch insert completed: {success_count} success, {error_count} error")
        return {"success": success_count, "error": error_count}
