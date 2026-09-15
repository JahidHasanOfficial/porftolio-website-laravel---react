<?php

namespace App\Http\Controllers;

use App\Http\Requests\AiChatRequest;
use App\Services\AiChatService;
use Illuminate\Http\JsonResponse;

class AiChatController extends Controller
{
    public function __construct(
        protected AiChatService $aiChatService
    ) {}

    /**
     * Process message from the AI chatbot and return dynamic response.
     */
    public function chat(AiChatRequest $request): JsonResponse
    {
        $response = $this->aiChatService->generateResponse($request->validated('message'));

        return response()->json($response);
    }
}
