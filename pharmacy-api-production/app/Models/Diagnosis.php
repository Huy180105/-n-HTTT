<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Diagnosis extends Model
{
    use SoftDeletes;

    protected $connection = 'mongodb';
    protected $collection = 'diagnoses';

    protected $fillable = [
        'user_id',
        'human', // array containing symptoms, patient_age, patient_gender
        'ai',    // array containing primary_diagnosis, alternative_diagnoses, general_advice, related_symptoms, overall_severity_level, recommended_actions
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'human' => 'array',
        'ai' => 'array',
    ];

    /**
     * Relationship with the User model.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
