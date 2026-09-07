import sys
import os
import asyncio
import time
from motor.motor_asyncio import AsyncIOMotorClient

# Add app to path
sys.path.append("/app")

from config.config import Settings
from services.embedding_service import EmbeddingService

async def main():
    settings = Settings()
    client = AsyncIOMotorClient(settings.DATABASE_URL)
    db = client[settings.DATABASE_NAME]
    collection = db["medicines"]
    
    # Get all medicines
    cursor = collection.find({})
    medicines = await cursor.to_list(length=100)
    
    print(f"Found {len(medicines)} medicines. Starting embedding generation with 5s delay to avoid Gemini rate limits...")
    
    embedding_service = EmbeddingService()
    for med in medicines:
        name = med.get('name')
        med_id = med.get('_id')
        print(f"Embedding medicine: {name} (ID: {med_id})...")
        
        # Try up to 3 times in case of rate limits
        for attempt in range(3):
            success = embedding_service.insert_medicine_embedding(med)
            if success:
                print("Success!")
                break
            else:
                print(f"Failed on attempt {attempt+1}. Retrying in 10 seconds...")
                await asyncio.sleep(10)
        
        # Delay between different medicines
        await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(main())
