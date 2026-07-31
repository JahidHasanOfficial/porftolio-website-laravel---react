<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCertificateRequest;
use App\Models\Certificate;
use App\Services\CertificateService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function __construct(protected CertificateService $certificateService) {}

    public function index(): Response
    {
        $certificates = $this->certificateService->all();
        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => $certificates,
        ]);
    }

    public function store(StoreCertificateRequest $request): RedirectResponse
    {
        $this->certificateService->create($request->validated());
        return redirect()->back()->with('success', 'Certificate created successfully.');
    }

    public function update(StoreCertificateRequest $request, Certificate $certificate): RedirectResponse
    {
        // Inertia requests with files sometimes don't bind PUT/PATCH fields correctly.
        // It is standard practice to send files using POST request with a _method=PUT override,
        // which Laravel handles properly.
        $this->certificateService->update($certificate, $request->validated());
        return redirect()->back()->with('success', 'Certificate updated successfully.');
    }

    public function destroy(Certificate $certificate): RedirectResponse
    {
        $this->certificateService->delete($certificate);
        return redirect()->back()->with('success', 'Certificate deleted successfully.');
    }
}
