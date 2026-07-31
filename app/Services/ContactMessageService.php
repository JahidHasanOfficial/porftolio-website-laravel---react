<?php

namespace App\Services;

use App\Models\ContactMessage;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class ContactMessageService
{
    public function paginated(int $perPage = 10): LengthAwarePaginator
    {
        return ContactMessage::orderBy('is_read', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function create(array $data): ContactMessage
    {
        $message = ContactMessage::create($data);

        // Notify admin via log (simulating Email Notification)
        Log::info("New Contact Message received from {$message->name} ({$message->email}): {$message->subject}");

        return $message;
    }

    public function markAsRead(ContactMessage $message): void
    {
        $message->update(['is_read' => true]);
    }

    public function delete(ContactMessage $message): void
    {
        $message->delete();
    }
}
