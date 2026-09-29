<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin account
        User::factory()->create([
            'firstname' => 'Admin',
            'lastname' => 'System',
            'username' => 'admin',
            'email' => 'admin@pharmacity.com',
            'password' => Hash::make('Admin@123'),
            'role' => UserRole::ADMIN->value,
            'status' => UserStatus::ACTIVE->value,
        ]);

        // 2. Pharmacist account
        User::factory()->create([
            'firstname' => 'Pharmacist',
            'lastname' => 'Store',
            'username' => 'pharmacist',
            'email' => 'pharmacist@pharmacity.com',
            'password' => Hash::make('Password@123'),
            'role' => UserRole::PHARMACIST->value,
            'status' => UserStatus::ACTIVE->value,
        ]);

        // 3. Customer account
        User::factory()->create([
            'firstname' => 'Customer',
            'lastname' => 'Guest',
            'username' => 'customer',
            'email' => 'customer@pharmacity.com',
            'password' => Hash::make('Password@123'),
            'role' => UserRole::CUSTOMER->value,
            'status' => UserStatus::ACTIVE->value,
        ]);

        // 4. Additional random users
        User::factory()->count(20)->create();

        // 5. Medicines, Categories, and Suppliers
        $this->call(MedicineSeeder::class);
    }
}
