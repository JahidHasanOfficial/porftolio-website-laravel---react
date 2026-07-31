<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSettingsRequest;
use App\Services\SettingService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function __construct(protected SettingService $settingService) {}

    public function index(): Response
    {
        $settings = $this->settingService->getAllSettings();
        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
        ]);
    }

    public function update(UpdateSettingsRequest $request): RedirectResponse
    {
        $this->settingService->updateSettings($request->validated());
        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
