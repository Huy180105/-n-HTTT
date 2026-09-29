<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class KnowledgeBase extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'knowledge_base';

    protected $fillable = [
        'filename',
        'content',
        'embedding', // Array of floats (vector dimensions)
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'embedding' => 'array',
    ];
}
