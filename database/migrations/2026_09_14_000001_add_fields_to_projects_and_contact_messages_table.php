<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->string('project_type')->nullable()->after('phone');
            $table->string('budget')->nullable()->after('project_type');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->string('role')->nullable()->after('duration');
            $table->text('objective')->nullable()->after('problem');
            $table->text('architecture_flow')->nullable()->after('solution');
            $table->text('business_impact')->nullable()->after('solutions');
        });
    }

    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropColumn(['project_type', 'budget']);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['role', 'objective', 'architecture_flow', 'business_impact']);
        });
    }
};
