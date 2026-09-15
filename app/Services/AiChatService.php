<?php

namespace App\Services;

use App\Models\Experience;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Skill;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiChatService
{
    /**
     * Process visitor query and generate dynamic AI response based on live database data.
     */
    public function generateResponse(string $userQuery): array
    {
        try {
            $rawQuery = trim($userQuery);
            $q = mb_strtolower($rawQuery);

            // 1. Fetch live database settings
            $settings = Setting::pluck('value', 'key')->toArray();
            $developerName = $settings['name'] ?? 'Md. Jahid Hasan';
            $designation   = $settings['designation'] ?? 'Software Engineer (Laravel & React)';
            $email         = $settings['email'] ?? 'jahidhasanofficial23@gmail.com';
            $phone         = $settings['phone'] ?? '+880 1521-719305';
            $whatsapp      = $settings['whatsapp'] ?? '8801865277323';
            $location      = $settings['address'] ?? 'Dhaka, Bangladesh';
            $experienceYrs = $settings['years_of_experience'] ?? '3+';
            $biography     = $settings['biography'] ?? '';

            // 2. CHECK IF GEMINI API KEY IS CONFIGURED
            $geminiKey = config('services.gemini.key') ?: env('GEMINI_API_KEY');
            if (!empty($geminiKey)) {
                $llmResponse = $this->callGeminiApi($rawQuery, $geminiKey, [
                    'developerName' => $developerName,
                    'designation'   => $designation,
                    'email'         => $email,
                    'phone'         => $phone,
                    'whatsapp'      => $whatsapp,
                    'location'      => $location,
                    'experienceYrs' => $experienceYrs,
                    'biography'     => $biography,
                ]);

                if ($llmResponse) {
                    return $llmResponse;
                }
            }

            // 3. NATIVE INTELLIGENT RULE & INTENT ENGINE (Fallback / Free Mode)
            return $this->processNativeQuery($rawQuery, $q, [
                'developerName' => $developerName,
                'designation'   => $designation,
                'email'         => $email,
                'phone'         => $phone,
                'whatsapp'      => $whatsapp,
                'location'      => $location,
                'experienceYrs' => $experienceYrs,
                'biography'     => $biography,
            ]);
        } catch (\Throwable $e) {
            Log::error('AI Chatbot Service Error: ' . $e->getMessage());

            return [
                'text' => "Hello! How can I assist you with **Md. Jahid Hasan's** projects, skills, or hiring inquiries today?",
                'actions' => [
                    ['label' => '🚀 View Projects', 'query' => 'Show me your projects'],
                    ['label' => '💬 Chat on WhatsApp', 'actionType' => 'whatsapp'],
                ],
            ];
        }
    }

    /**
     * Call Google Gemini API with rich dynamic database context.
     */
    protected function callGeminiApi(string $query, string $apiKey, array $data): ?array
    {
        try {
            // Fetch live projects, skills, services from database for prompt
            $projects = Project::query()->select(['name', 'category', 'description', 'technology_stack', 'live_demo'])->take(6)->get()->toArray();
            $skills = Skill::query()->select(['name', 'category', 'percentage'])->get()->groupBy('category')->toArray();
            $services = Service::query()->select(['title', 'description'])->get()->toArray();

            $contextJson = json_encode([
                'developer' => $data,
                'projects'  => $projects,
                'skills'    => $skills,
                'services'  => $services,
            ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

            $systemPrompt = "You are the official AI Assistant on the portfolio website of {$data['developerName']} ({$data['designation']}).
Your job is to answer visitor questions accurately and politely using the following live database information:
{$contextJson}

RULES:
1. If the user speaks/writes in Bengali or requests Bengali (e.g. 'bangla', 'not english', 'বাংলায় বলো', 'কেমন আছেন'), ALWAYS answer in natural, polite, and fluent Bengali.
2. If the user writes in English, reply in fluent, professional English.
3. If they ask about projects, mention specific projects from the database with tech stack.
4. If they ask about hiring/contact/budget, provide WhatsApp (+{$data['whatsapp']}), Phone ({$data['phone']}), and Email ({$data['email']}).
5. Keep responses concise, clear, and well-formatted with markdown bullet points. Never hallucinate false contact info.";

            $response = Http::timeout(10)->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}", [
                'contents' => [
                    [
                        'role' => 'user',
                        'parts' => [
                            ['text' => $systemPrompt . "\n\nUser Question: " . $query]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.4,
                    'maxOutputTokens' => 600,
                ]
            ]);

            if ($response->successful()) {
                $resultText = $response->json('candidates.0.content.parts.0.text');
                if (!empty($resultText)) {
                    $lang = $this->detectLanguage($query);
                    return [
                        'text' => trim($resultText),
                        'actions' => $lang === 'bn' ? [
                            ['label' => '🚀 প্রজেক্টগুলো দেখুন', 'query' => 'প্রজেক্টগুলো দেখাও'],
                            ['label' => '💬 WhatsApp-এ কথা বলুন', 'actionType' => 'whatsapp'],
                            ['label' => '📞 যোগাযোগ করুন', 'query' => 'যোগাযোগের তথ্য কি?'],
                        ] : [
                            ['label' => '🚀 View Projects', 'query' => 'Show me your projects'],
                            ['label' => '💬 Chat on WhatsApp', 'actionType' => 'whatsapp'],
                            ['label' => '📞 Contact Info', 'query' => 'How to contact Jahid?'],
                        ],
                    ];
                }
            }
        } catch (\Throwable $e) {
            Log::warning('Gemini API call failed, falling back to native engine: ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Native Intelligent Query Processor with dynamic DB lookups and bilingual support.
     */
    protected function processNativeQuery(string $rawQuery, string $q, array $data): array
    {
        $lang = $this->detectLanguage($q);
        $name = $data['developerName'];

        // 1. DIRECT LANGUAGE SWITCH / PREFERENCE
        if ($this->matchesIntent($q, ['bangla', 'bengali', 'not english', 'বাংলা', 'বাংলায়', 'বাংলা ভাষা', 'banglay', 'bangla bolo', 'banglate'])) {
            return [
                'text' => "অবশ্যই! 😊 আমি এখন থেকে আপনার সাথে সম্পূর্ণ **বাংলায়** কথা বলব।\n\nআপনি **{$name}**-এর প্রজেক্ট, স্কিলস, কাজের অভিজ্ঞতা বা কোনো নতুন সফটওয়্যার প্রজেক্ট তৈরির ব্যাপারে কী জানতে চান?",
                'actions' => [
                    ['label' => '🚀 প্রজেক্টগুলো দেখাও', 'query' => 'প্রজেক্টগুলো দেখাও'],
                    ['label' => '⚡ তোমার স্কিলস কী কী?', 'query' => 'তোমার স্কিলস কি কি?'],
                    ['label' => '💼 হায়ার করতে কত টাকা লাগবে?', 'query' => 'হায়ার করার নিয়ম কি?'],
                    ['label' => '💬 WhatsApp-এ কথা বলুন', 'actionType' => 'whatsapp'],
                ],
            ];
        }

        if ($this->matchesIntent($q, ['english', 'speak english', 'in english', 'english please', 'english bolo'])) {
            return [
                'text' => "Sure thing! 😊 I will communicate with you in **English**.\n\nHow can I help you today regarding **{$name}**'s software development projects, technical skills, or hiring inquiries?",
                'actions' => [
                    ['label' => '🚀 Show Projects', 'query' => 'Show me your projects'],
                    ['label' => '⚡ Technical Skills', 'query' => 'What are your skills?'],
                    ['label' => '💼 Hire / Contact', 'query' => 'How can I hire Jahid?'],
                    ['label' => '💬 Chat on WhatsApp', 'actionType' => 'whatsapp'],
                ],
            ];
        }

        // 2. GREETINGS & HELLO
        if ($this->matchesIntent($q, ['hi', 'hello', 'hey', 'salam', 'assalamu', 'hola', 'kemn', 'kemon', 'halo', 'hai', 'হাই', 'হ্যালো', 'সালাম', 'কেমন', 'আছেন', 'কি খবর', 'ki khobor', 'good morning', 'good evening'])) {
            if ($lang === 'bn') {
                return [
                    'text' => "আসসালামু আলাইকুম / হ্যালো! 👋 আমি **{$name}**-এর AI অ্যাসিস্ট্যান্ট।\n\nআমি সরাসরি এই ওয়েবসাইটের লাইভ ডাটাবেজের সাথে যুক্ত। আপনি জাহিদের **তৈরি করা প্রজেক্ট, টেকনিক্যাল স্কিল, অভিজ্ঞতা, সার্ভিস** অথবা **হায়ার করার নিয়ম** সম্পর্কে যেকোনো প্রশ্ন করতে পারেন।",
                    'actions' => [
                        ['label' => '🚀 প্রজেক্টগুলো দেখাও', 'query' => 'প্রজেক্টগুলো দেখাও'],
                        ['label' => '⚡ স্কিলস কী কী আছে?', 'query' => 'তোমার স্কিলস কি কি?'],
                        ['label' => '💼 হায়ার করতে চাই', 'query' => 'হায়ার করার নিয়ম কি?'],
                        ['label' => '💬 সরাসরি WhatsApp-এ চ্যাট', 'actionType' => 'whatsapp'],
                    ],
                ];
            }

            return [
                'text' => "Hello! 👋 Thanks for reaching out to **{$name}**'s portfolio.\n\nI am his AI assistant connected directly to this live database. You can ask me in **English or বাংলা** about his **live projects, technical stack, services, work history**, or discuss **hiring him for a project**!",
                'actions' => [
                    ['label' => '🚀 What projects did he build?', 'query' => 'Show me your projects'],
                    ['label' => '⚡ Technical Skills', 'query' => 'What are your skills?'],
                    ['label' => '💼 How to hire him?', 'query' => 'How can I hire Jahid?'],
                    ['label' => '💬 Chat on WhatsApp', 'actionType' => 'whatsapp'],
                ],
            ];
        }

        // 3. SPECIFIC PROJECT SEARCH (e.g. ERP, CRM, Ecommerce, etc.)
        $specificProject = $this->searchSpecificProject($q);
        if ($specificProject) {
            $tech = is_array($specificProject->technology_stack) ? implode(', ', $specificProject->technology_stack) : '';
            $desc = $specificProject->description ?: $specificProject->overview ?: 'Enterprise web application.';

            if ($lang === 'bn') {
                return [
                    'text' => "🎯 **{$specificProject->name}** ({$specificProject->category})\n\n{$desc}\n\n• **ব্যবহৃত টেকনোলজি:** `{$tech}`\n• **ক্লায়েন্ট/টাইপ:** {$specificProject->client}\n\nআপনি কি এই প্রজেক্টের বিস্তারিত দেখতে চান?",
                    'actions' => [
                        ['label' => "🔍 বিস্তারিত দেখুন", 'href' => route('projects.show', $specificProject->slug)],
                        ['label' => '🌐 সব প্রজেক্ট দেখুন', 'href' => route('projects.index')],
                        ['label' => '💬 এই ধরণের প্রজেক্ট নিয়ে কথা বলুন', 'actionType' => 'whatsapp'],
                    ],
                ];
            }

            return [
                'text' => "🎯 **{$specificProject->name}** ({$specificProject->category})\n\n{$desc}\n\n• **Tech Stack:** `{$tech}`\n• **Client/Type:** {$specificProject->client}\n\nWould you like to explore full architectural details for this project?",
                'actions' => [
                    ['label' => "🔍 View Case Study", 'href' => route('projects.show', $specificProject->slug)],
                    ['label' => '🌐 Browse All Projects', 'href' => route('projects.index')],
                    ['label' => '💬 Discuss similar project on WhatsApp', 'actionType' => 'whatsapp'],
                ],
            ];
        }

        // 4. GENERAL PROJECTS INQUIRY
        if ($this->matchesIntent($q, ['project', 'work', 'built', 'portfolio', 'system', 'app', 'প্রজেক্ট', 'কাজ', 'কি কি বানিয়েছ', 'কি কাজ করেছেন', 'projek', 'kaj', 'dekhaw', 'dekhao'])) {
            $projects = Project::query()
                ->select(['id', 'name', 'slug', 'category', 'description', 'technology_stack', 'is_featured'])
                ->orderByDesc('is_featured')
                ->latest()
                ->take(5)
                ->get();

            if ($projects->isNotEmpty()) {
                if ($lang === 'bn') {
                    $text = "লাইভ ডাটাবেজ থেকে পাওয়া **{$name}**-এর সাম্প্রতিক প্রজেক্টসমূহ:\n\n";
                    $actions = [];

                    foreach ($projects as $index => $project) {
                        $num = $index + 1;
                        $tech = is_array($project->technology_stack) ? implode(', ', array_slice($project->technology_stack, 0, 3)) : '';
                        $desc = $project->description ? mb_substr($project->description, 0, 80) . '...' : 'ওয়েব অ্যাপ্লিকেশন';
                        $text .= "**{$num}. {$project->name}** ({$project->category})\n   • {$desc}\n";
                        if ($tech) {
                            $text .= "   • *স্ট্যাক:* `{$tech}`\n\n";
                        } else {
                            $text .= "\n";
                        }

                        if (count($actions) < 2) {
                            $actions[] = ['label' => "🔍 {$project->name}", 'href' => route('projects.show', $project->slug)];
                        }
                    }

                    $actions[] = ['label' => '🌐 সব প্রজেক্ট দেখুন', 'href' => route('projects.index')];
                    $actions[] = ['label' => '💬 নতুন প্রজেক্ট নিয়ে কথা বলুন', 'actionType' => 'whatsapp'];

                    return [
                        'text' => $text . "কোনো নির্দিষ্ট প্রজেক্ট সম্পর্কে জানতে চাইলে বা নতুন প্রজেক্ট বানাতে চাইলে বলতে পারেন!",
                        'actions' => $actions,
                    ];
                }

                $text = "Here are **{$name}'s recent production projects** directly from the database:\n\n";
                $actions = [];

                foreach ($projects as $index => $project) {
                    $num = $index + 1;
                    $tech = is_array($project->technology_stack) ? implode(', ', array_slice($project->technology_stack, 0, 3)) : '';
                    $desc = $project->description ? mb_substr($project->description, 0, 80) . '...' : 'Enterprise Web Application';
                    $text .= "**{$num}. {$project->name}** ({$project->category})\n   • {$desc}\n";
                    if ($tech) {
                        $text .= "   • *Stack:* `{$tech}`\n\n";
                    } else {
                        $text .= "\n";
                    }

                    if (count($actions) < 2) {
                        $actions[] = ['label' => "🔍 {$project->name}", 'href' => route('projects.show', $project->slug)];
                    }
                }

                $actions[] = ['label' => '🌐 Browse All Projects', 'href' => route('projects.index')];
                $actions[] = ['label' => '💬 Discuss a Project on WhatsApp', 'actionType' => 'whatsapp'];

                return [
                    'text' => $text . "Would you like to explore full details or discuss a custom development?",
                    'actions' => $actions,
                ];
            }
        }

        // 5. SKILLS & TECHNOLOGIES
        if ($this->matchesIntent($q, ['skill', 'tech', 'stack', 'laravel', 'react', 'php', 'mysql', 'javascript', 'inertia', 'tailwind', 'bootstrap', 'স্কিল', 'প্রযুক্তি', 'কি পারেন', 'দক্ষতা', 'জানেন', 'kisu janen', 'ki ki paro'])) {
            $skills = Skill::query()
                ->select(['name', 'category', 'percentage', 'years_of_experience'])
                ->orderBy('category')
                ->orderByDesc('percentage')
                ->get();

            if ($skills->isNotEmpty()) {
                $grouped = $skills->groupBy('category');

                if ($lang === 'bn') {
                    $text = "**{$name}**-এর টেকনিক্যাল স্কিল ও দক্ষতা (লাইভ ডাটাবেজ):\n\n";
                    foreach ($grouped as $cat => $items) {
                        $categoryTitle = $cat === 'backend' ? 'ব্যাকএন্ড (Backend)' : ($cat === 'frontend' ? 'ফ্রন্টএন্ড (Frontend)' : ucfirst($cat));
                        $names = $items->pluck('name')->implode(', ');
                        $text .= "🔹 **{$categoryTitle}:** {$names}\n";
                    }
                    $text .= "\n📐 **আর্কিটেকচার স্ট্যান্ডার্ড:** Clean Controller ➜ Service ➜ Model প্যাটার্ন, Eloquent ORM, RESTful API, Spatie Permissions ও CI/CD অটোমেশন।";

                    return [
                        'text' => $text,
                        'actions' => [
                            ['label' => '🚀 এই স্কিল দিয়ে তৈরি প্রজেক্ট', 'query' => 'প্রজেক্টগুলো দেখাও'],
                            ['label' => '💼 Laravel / React প্রজেক্টের জন্য হায়ার করুন', 'actionType' => 'whatsapp'],
                        ],
                    ];
                }

                $text = "Here is **{$name}'s live technical skill set**:\n\n";
                foreach ($grouped as $cat => $items) {
                    $categoryTitle = ucfirst($cat);
                    $names = $items->pluck('name')->implode(', ');
                    $text .= "🔹 **{$categoryTitle}:** {$names}\n";
                }
                $text .= "\n📐 **Architecture & Quality:** Strict **Controller ➜ Service ➜ Model** pattern, Eloquent ORM, RESTful API design, Spatie Role & Permissions, and automated CI/CD.";

                return [
                    'text' => $text,
                    'actions' => [
                        ['label' => '🚀 See Projects built with this stack', 'query' => 'Show me your projects'],
                        ['label' => '💼 Hire for a Laravel/React Project', 'actionType' => 'whatsapp'],
                    ],
                ];
            }
        }

        // 6. WHO IS JAHID / ABOUT
        if ($this->matchesIntent($q, ['who', 'about', 'jahid', 'zahid', 'developer', 'introduce', 'কার পোর্টফোলিও', 'কে', 'সম্পর্কে', 'পরিচয়', 'bio', 'k koren', 'porichoy'])) {
            if ($lang === 'bn') {
                $bio = $data['biography'] ?: "{$name} একজন প্রফেশনাল {$data['designation']} যার {$data['experienceYrs']} বছরের বাস্তব সফটওয়্যার তৈরির অভিজ্ঞতা রয়েছে। তিনি জটিল বিজনেস প্রসেসকে সহজ ও নির্ভরযোগ্য ডিজিটাল সিস্টেমে রূপান্তর করতে ভালোবাসেন।";
                return [
                    'text' => "**{$name}** ({$data['designation']})\n📍 *লোকেশন:* {$data['location']} | ⏱️ *অভিজ্ঞতা:* {$data['experienceYrs']} বছর\n\n{$bio}\n\n**মূল দক্ষতা:**\n• **Backend:** Laravel, PHP ও স্কেলেবল Service Layer আর্কিটেকচার\n• **Frontend:** React, Inertia.js, Tailwind CSS\n• **Enterprise Systems:** কাস্টম ERP, CRM, HRM ও লিড অটোমেশন\n• **Databases:** হাই-পারফরম্যান্স MySQL ডিজাইন ও অপটিমাইজেশন।",
                    'actions' => [
                        ['label' => '📂 পুরো প্রোফাইল দেখুন', 'href' => route('about')],
                        ['label' => '⚡ টেকনিক্যাল স্কিলস', 'query' => 'স্কিলস কি কি?'],
                        ['label' => '📞 যোগাযোগের তথ্য', 'query' => 'যোগাযোগের তথ্য কি?'],
                    ],
                ];
            }

            $bio = $data['biography'] ?: "{$name} is a {$data['designation']} with {$data['experienceYrs']} years of experience specializing in building practical, reliable and scalable web applications, custom ERPs, CRMs, and automated workflow platforms.";
            return [
                'text' => "**{$name}** ({$data['designation']})\n📍 *Location:* {$data['location']} | ⏱️ *Experience:* {$data['experienceYrs']} years\n\n{$bio}\n\n**Core Expertise:**\n• **Backend:** Robust Laravel, PHP & Clean Service-Layer Architecture\n• **Frontend:** React, Inertia.js & Tailwind CSS\n• **Enterprise Systems:** Custom ERP, Sales CRM, HRM & Lead Automation\n• **Databases:** High-performance MySQL design & Query optimization.",
                'actions' => [
                    ['label' => '📂 View Full About Page', 'href' => route('about')],
                    ['label' => '⚡ Technical Stack', 'query' => 'What are your skills?'],
                    ['label' => '📞 Contact Details', 'query' => 'How to contact Jahid?'],
                ],
            ];
        }

        // 7. SERVICES
        if ($this->matchesIntent($q, ['service', 'offer', 'can you', 'develop', 'website', 'build', 'software', 'সার্ভিস', 'কি কাজ করেন', 'বানাতে পারবেন', 'সেবা', 'banate', 'korte parben'])) {
            $services = Service::query()->select(['title', 'description'])->take(6)->get();

            if ($lang === 'bn') {
                $text = "**{$name}** যেসব সফটওয়্যার সার্ভিস প্রদান করেন:\n\n";
                if ($services->isNotEmpty()) {
                    foreach ($services as $srv) {
                        $text .= "✨ **{$srv->title}**\n   {$srv->description}\n\n";
                    }
                } else {
                    $text .= "✨ **1. কাস্টম ওয়েব অ্যাপ্লিকেশন (Laravel + React)**\n✨ **2. এন্টারপ্রাইজ ERP, CRM ও HRM সফটওয়্যার**\n✨ **3. বিজনেস অটোমেশন ও থার্ড-পার্টি API ইন্টিগ্রেশন**\n✨ **4. ডাটাবেজ আর্কিটেকচার ও স্পিড অপটিমাইজেশন**\n✨ **5. বাগ ফিক্সিং ও সিকিউরিটি হার্ডেনিং**\n✨ **6. CI/CD ডেপ্লয়মেন্ট ও ক্লাউড সেটআপ**\n\n";
                }

                return [
                    'text' => $text,
                    'actions' => [
                        ['label' => '💬 WhatsApp-এ কোটেশন চান', 'actionType' => 'whatsapp'],
                        ['label' => '📧 ইমেইলে যোগাযোগ করুন', 'actionType' => 'email'],
                    ],
                ];
            }

            $text = "Here are the professional software services **{$name}** provides:\n\n";
            if ($services->isNotEmpty()) {
                foreach ($services as $srv) {
                    $text .= "✨ **{$srv->title}**\n   {$srv->description}\n\n";
                }
            } else {
                $text .= "✨ **1. Custom Web Applications (Laravel + React)**\n✨ **2. Enterprise ERP, CRM & HRM Systems**\n✨ **3. Lead Automation & API Integrations**\n✨ **4. Database Architecture & Optimization**\n✨ **5. Bug Fixing & Performance Hardening**\n✨ **6. Automated CI/CD & Deployment Setup**\n\n";
            }

            return [
                'text' => $text,
                'actions' => [
                    ['label' => '💬 Request a Quote on WhatsApp', 'actionType' => 'whatsapp'],
                    ['label' => '📧 Send Email Inquiry', 'actionType' => 'email'],
                ],
            ];
        }

        // 8. HIRING, BUDGET, PRICING & TIMELINE
        if ($this->matchesIntent($q, ['hire', 'price', 'cost', 'budget', 'rate', 'timeline', 'freelance', 'available', 'হায়ার', 'খরচ', 'টাকা', 'বাজেট', 'পারিশ্রমিক', 'কবে পাব', 'hire korte', 'koto taka', 'koto lagbe'])) {
            if ($lang === 'bn') {
                return [
                    'text' => "**{$name}** বর্তমানে নতুন প্রজেক্টের জন্য **Available for Hire** (Full-Time, Contract, বা Milestone ভিত্তিতে) আছেন!\n\n💰 **প্রজেক্টের খরচ ও সময়:**\nপ্রতিটি প্রজেক্টের ফিচার, মডিউল এবং ডেডলাইনের ওপর ভিত্তি করে বাজেট ও সময় নির্ধারণ করা হয়। জাহিদ খুবই সাশ্রয়ী ও মাইলস্টোন-ভিত্তিক স্বচ্ছ কাজের অফার দেন।\n\nআপনার প্রজেক্টের রিকোয়ারমেন্ট নিয়ে সরাসরি WhatsApp-এ কথা বলে সাথে সাথে বাজেট ও টাইমলাইন জেনে নিন!",
                    'actions' => [
                        ['label' => '💬 WhatsApp-এ কথা বলুন (দ্রুততম)', 'actionType' => 'whatsapp'],
                        ['label' => '📞 কল করুন: ' . $data['phone'], 'actionType' => 'call'],
                        ['label' => '📧 ইমেইল পাঠান: ' . $data['email'], 'actionType' => 'email'],
                    ],
                ];
            }

            return [
                'text' => "**{$name}** is currently **Available for Hire** (Full-Time, Contract, or Milestone Project Basis)!\n\n💰 **Pricing & Delivery Timeline:**\nPricing depends on project scope, features, and timeline requirements. Jahid offers competitive, milestone-based rates with transparent deliverables.\n\nLet’s discuss your project requirement directly on WhatsApp for an instant consultation & quotation!",
                'actions' => [
                    ['label' => '💬 Chat on WhatsApp (Fastest)', 'actionType' => 'whatsapp'],
                    ['label' => '📞 Call: ' . $data['phone'], 'actionType' => 'call'],
                    ['label' => '📧 Email: ' . $data['email'], 'actionType' => 'email'],
                ],
            ];
        }

        // 9. CONTACT DETAILS
        if ($this->matchesIntent($q, ['contact', 'email', 'phone', 'number', 'whatsapp', 'address', 'location', 'ইমেইল', 'ফোন', 'যোগাযোগ', 'ঠিকানা', 'নাম্বার', 'কথা', 'মোবাইল', 'kothay', 'thikana'])) {
            if ($lang === 'bn') {
                return [
                    'text' => "**{$name}**-এর সাথে সরাসরি যোগাযোগের মাধ্যম:\n\n💬 **WhatsApp:** `+{$data['whatsapp']}`\n📞 **ফোন:** `{$data['phone']}`\n📧 **ইমেইল:** `{$data['email']}`\n📍 **ঠিকানা:** {$data['location']}\n\nযেকোনো সময় মেসেজ বা কল করতে পারেন!",
                    'actions' => [
                        ['label' => '💬 WhatsApp ওপেন করুন', 'actionType' => 'whatsapp'],
                        ['label' => '📧 ইমেইল পাঠান', 'actionType' => 'email'],
                        ['label' => '📞 সরাসরি কল করুন', 'actionType' => 'call'],
                    ],
                ];
            }

            return [
                'text' => "You can reach **{$name}** directly via:\n\n💬 **WhatsApp:** `+{$data['whatsapp']}`\n📞 **Phone:** `{$data['phone']}`\n📧 **Email:** `{$data['email']}`\n📍 **Location:** {$data['location']}\n\nFeel free to reach out anytime!",
                'actions' => [
                    ['label' => '💬 Open WhatsApp Chat', 'actionType' => 'whatsapp'],
                    ['label' => '📧 Send Email', 'actionType' => 'email'],
                    ['label' => '📞 Call Now', 'actionType' => 'call'],
                ],
            ];
        }

        // 10. RESUME / CV
        if ($this->matchesIntent($q, ['resume', 'cv', 'সিভি', 'রেজুমে', 'বায়োডাটা'])) {
            if ($lang === 'bn') {
                return [
                    'text' => "আপনি জাহিদ হাসানের সর্বশেষ আপডেটেড **Software Engineer Resume (PDF)** এখান থেকে সরাসরি ডাউনলোড করতে পারেন:",
                    'actions' => [
                        ['label' => '📥 রেজুমে ডাউনলোড করুন (PDF)', 'href' => route('resume.download')],
                        ['label' => '📄 ক্যারিয়ার প্রোফাইল দেখুন', 'href' => route('about')],
                    ],
                ];
            }

            return [
                'text' => "You can download Jahid Hasan's latest updated **Software Engineer Resume (PDF)** directly:",
                'actions' => [
                    ['label' => '📥 Download Official Resume', 'href' => route('resume.download')],
                    ['label' => '📄 View Career Profile', 'href' => route('about')],
                ],
            ];
        }

        // 11. DYNAMIC INTELLIGENT FALLBACK
        if ($lang === 'bn') {
            return [
                'text' => "আমি বুঝতে পেরেছি! আপনি **{$name}**-এর সফটওয়্যার ডেভেলপমেন্ট সম্পর্কিত যেকোনো বিষয় জানতে পারেন:\n\n• **প্রজেক্ট ও লাইভ সিস্টেম** (ERP, CRM, E-Commerce)\n• **টেকনিক্যাল স্কিলস** (Laravel, React, MySQL, API)\n• **সার্ভিস ও কাস্টম ওয়েব ডেভেলপমেন্ট**\n• **হায়ারিং, বাজেট ও কন্টাক্ট ইনফো**\n\nআপনি কী বিষয়ে জানতে চান নিচে ক্লিক করুন অথবা লিখে জানান:",
                'actions' => [
                    ['label' => '🚀 প্রজেক্টগুলো দেখাও', 'query' => 'প্রজেক্টগুলো দেখাও'],
                    ['label' => '⚡ স্কিলস কী কী?', 'query' => 'তোমার স্কিলস কি কি?'],
                    ['label' => '💼 হায়ার করতে চাই', 'query' => 'হায়ার করার নিয়ম কি?'],
                    ['label' => '💬 WhatsApp-এ কথা বলুন', 'actionType' => 'whatsapp'],
                ],
            ];
        }

        return [
            'text' => "I am here to help you explore **{$name}**'s software engineering portfolio!\n\nYou can ask about:\n• **Production Projects** (ERP, CRM, E-Commerce, APIs)\n• **Technical Skills** (Laravel, React, MySQL, Inertia)\n• **Custom Software Services**\n• **Hiring & Project Quotations**\n\nWhat would you like to know?",
            'actions' => [
                ['label' => '🚀 Explore Projects', 'query' => 'Show me your projects'],
                ['label' => '⚡ Tech Skills', 'query' => 'What are your skills?'],
                ['label' => '💼 Hire Jahid', 'query' => 'How can I hire Jahid?'],
                ['label' => '💬 Connect on WhatsApp', 'actionType' => 'whatsapp'],
            ],
        ];
    }

    /**
     * Detect whether the query is in Bengali or English.
     */
    protected function detectLanguage(string $query): string
    {
        // Check for Bengali Unicode characters (U+0980 to U+09FF)
        if (preg_match('/[\x{0980}-\x{09FF}]/u', $query)) {
            return 'bn';
        }

        // Check for Banglish or Bengali request words
        $banglish = ['bangla', 'bengali', 'not english', 'kemon', 'asen', 'achen', 'bhai', 'tmi', 'tumi', 'apni', 'ki', 'koro', 'kaj', 'hobe', 'koto', 'taka', 'lagbe', 'chai', 'dekte', 'bolte', 'parba', 'amar', 'akta', 'korbo', 'dekhao', 'dite', 'parben', 'valo', 'bhalo', 'kore', 'dico', 'den', 'bolo'];
        foreach ($banglish as $word) {
            if (str_contains($query, $word)) {
                return 'bn';
            }
        }

        return 'en';
    }

    /**
     * Check if query matches any of the given intent keywords.
     */
    protected function matchesIntent(string $query, array $keywords): bool
    {
        foreach ($keywords as $keyword) {
            if (str_contains($query, mb_strtolower($keyword))) {
                return true;
            }
        }
        return false;
    }

    /**
     * Search specific project in the database based on query keywords.
     */
    protected function searchSpecificProject(string $query): ?Project
    {
        $projectKeywords = ['erp', 'crm', 'ecommerce', 'e-commerce', 'inventory', 'lead', 'certificate', 'hospital', 'clinic', 'billing', 'pos', 'hrm', 'payroll'];

        foreach ($projectKeywords as $kw) {
            if (str_contains($query, $kw)) {
                return Project::query()
                    ->where('name', 'LIKE', "%{$kw}%")
                    ->orWhere('category', 'LIKE', "%{$kw}%")
                    ->orWhere('description', 'LIKE', "%{$kw}%")
                    ->first();
            }
        }

        return null;
    }
}
