<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreServiceRequest;
use App\Models\Service;
use App\Services\ServiceService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function __construct(protected ServiceService $serviceService) {}

    public function index(): Response
    {
        $services = $this->serviceService->all();
        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
        ]);
    }

    public function store(StoreServiceRequest $request): RedirectResponse
    {
        $this->serviceService->create($request->validated());
        return redirect()->back()->with('success', 'Service created successfully.');
    }

    public function update(StoreServiceRequest $request, Service $service): RedirectResponse
    {
        $this->serviceService->update($service, $request->validated());
        return redirect()->back()->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $this->serviceService->delete($service);
        return redirect()->back()->with('success', 'Service deleted successfully.');
    }
}
