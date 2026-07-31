<?php

namespace App\Services;

use App\Models\Certificate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

class CertificateService
{
    public function all(): Collection
    {
        return Certificate::orderBy('date', 'desc')->get();
    }

    public function create(array $data): Certificate
    {
        if (isset($data['image']) && request()->hasFile('image')) {
            $path = request()->file('image')->store('certificates', 'public');
            $data['image'] = '/storage/' . $path;
        }

        return Certificate::create($data);
    }

    public function update(Certificate $certificate, array $data): Certificate
    {
        if (isset($data['image']) && request()->hasFile('image')) {
            if ($certificate->image && Storage::disk('public')->exists(str_replace('/storage/', '', $certificate->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $certificate->image));
            }
            $path = request()->file('image')->store('certificates', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $certificate->update($data);
        return $certificate;
    }

    public function delete(Certificate $certificate): void
    {
        if ($certificate->image && Storage::disk('public')->exists(str_replace('/storage/', '', $certificate->image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $certificate->image));
        }
        $certificate->delete();
    }
}
