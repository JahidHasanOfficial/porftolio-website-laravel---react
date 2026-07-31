<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique()->index();
            $table->string('category')->index(); // ERP, CRM, HRM, POS, Inventory, LMS, E-Commerce, API, Portfolio
            $table->string('status'); // Completed, In Progress, Maintenance
            $table->string('client')->nullable();
            $table->string('duration');
            $table->text('description')->nullable();
            $table->text('overview')->nullable();
            $table->text('problem')->nullable();
            $table->text('solution')->nullable();
            $table->json('features')->nullable();
            $table->json('technology_stack')->nullable();
            $table->string('live_demo')->nullable();
            $table->string('github')->nullable();
            $table->text('challenges')->nullable();
            $table->text('solutions')->nullable();
            $table->string('thumbnail')->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
