<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Facades\Storage;

class SettingService
{
    public function getAllSettings(): array
    {
        try {
            return Setting::pluck('value', 'key')->toArray();
        } catch (\Throwable $e) {
            return [];
        }
    }

    public function updateSettings(array $data): void
    {
        foreach ($data as $key => $value) {
            // Handle file uploads for logo and favicon
            if (in_array($key, ['logo', 'favicon']) && request()->hasFile($key)) {
                $file = request()->file($key);
                // Delete old file if exists
                $oldPath = Setting::where('key', $key)->value('value');
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
                $path = $file->store('settings', 'public');
                $value = '/storage/' . $path;
            }

            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
