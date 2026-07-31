<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Services\ContactMessageService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function __construct(protected ContactMessageService $contactMessageService) {}

    public function index(): Response
    {
        $messages = $this->contactMessageService->paginated(15);
        return Inertia::render('Admin/ContactMessages/Index', [
            'messages' => $messages,
        ]);
    }

    public function update(ContactMessage $message): RedirectResponse
    {
        $this->contactMessageService->markAsRead($message);
        return redirect()->back()->with('success', 'Message marked as read.');
    }

    public function destroy(ContactMessage $message): RedirectResponse
    {
        $this->contactMessageService->delete($message);
        return redirect()->back()->with('success', 'Message deleted successfully.');
    }
}
