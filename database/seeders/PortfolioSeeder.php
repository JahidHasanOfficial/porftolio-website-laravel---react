<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\ProjectScreenshot;
use App\Models\Resume;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Settings & Brand Identity
        $settings = [
            'name' => 'Jahid Hasan',
            'designation' => 'Software Engineer',
            'tagline' => 'Building modern web applications, business software & automation solutions.',
            'typing_titles' => json_encode([
                'Software Engineer',
                'Enterprise ERP Builder',
                'Sales CRM & Automation Specialist',
                'Laravel & React Engineer',
                'Database & System Architect'
            ]),
            'short_intro' => 'I’m a Software Engineer focused on building reliable, scalable and user-friendly web applications and business management systems.',
            'biography' => 'I’m Jahid Hasan, a Software Engineer passionate about building practical software solutions for businesses and organizations. My work focuses on developing scalable web applications, business management systems and automation platforms. I enjoy working with complex requirements, designing efficient database structures and turning business processes into simple, reliable digital workflows. From backend architecture and database design to frontend interfaces and deployment, I focus on building software that is maintainable, secure and ready for real-world use.',
            'hero_heading' => 'Software Engineer Building Digital Solutions for Real-World Businesses.',
            'hero_description' => 'I design and develop modern web applications, business management systems and automation solutions that help organizations simplify operations, improve productivity and scale efficiently.',
            'years_of_experience' => '3+',
            'projects_count' => '20+',
            'modules_count' => '10+',
            'development_cycle' => 'Full-Cycle',
            'phone' => '+880 1700-000000',
            'email' => 'contact@jahidhasan.dev',
            'address' => 'Dhaka, Bangladesh',
            'github_url' => 'https://github.com/JahidHasanOfficial',
            'linkedin_url' => 'https://linkedin.com/in/JahidHasanOfficial',
            'meta_title' => 'Jahid Hasan | Software Engineer | Web & Business Software Specialist',
            'meta_description' => 'Jahid Hasan is a Software Engineer specializing in Laravel, React, MySQL, business software, ERP, CRM, HRM and web application development.',
            'meta_keywords' => 'Jahid Hasan, Software Engineer, Laravel Developer, React Developer, ERP Developer, CRM Developer, HRM Software, Web Application Developer, Business Automation, MySQL',
            'theme' => 'dark',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        // 2. Skills & Technologies
        $skills = [
            // Backend
            ['name' => 'Laravel', 'icon' => 'Cpu', 'category' => 'backend', 'percentage' => 96, 'years_of_experience' => 3],
            ['name' => 'PHP', 'icon' => 'Terminal', 'category' => 'backend', 'percentage' => 94, 'years_of_experience' => 3],
            ['name' => 'REST API', 'icon' => 'Link2', 'category' => 'backend', 'percentage' => 95, 'years_of_experience' => 3],

            // Frontend
            ['name' => 'React', 'icon' => 'Atom', 'category' => 'frontend', 'percentage' => 90, 'years_of_experience' => 3],
            ['name' => 'Inertia.js', 'icon' => 'Layers', 'category' => 'frontend', 'percentage' => 92, 'years_of_experience' => 2],
            ['name' => 'JavaScript', 'icon' => 'Code2', 'category' => 'frontend', 'percentage' => 92, 'years_of_experience' => 3],
            ['name' => 'Tailwind CSS', 'icon' => 'Palette', 'category' => 'frontend', 'percentage' => 94, 'years_of_experience' => 3],
            ['name' => 'Bootstrap', 'icon' => 'Layers', 'category' => 'frontend', 'percentage' => 90, 'years_of_experience' => 3],

            // Database
            ['name' => 'MySQL', 'icon' => 'Database', 'category' => 'database', 'percentage' => 92, 'years_of_experience' => 3],
            ['name' => 'Database Design & Indexing', 'icon' => 'Database', 'category' => 'database', 'percentage' => 90, 'years_of_experience' => 3],

            // Tools & DevOps
            ['name' => 'Git & GitHub', 'icon' => 'GitBranch', 'category' => 'tools', 'percentage' => 92, 'years_of_experience' => 3],
            ['name' => 'Linux / Ubuntu', 'icon' => 'TerminalSquare', 'category' => 'tools', 'percentage' => 85, 'years_of_experience' => 2],
            ['name' => 'cPanel & VPS Hosting', 'icon' => 'Server', 'category' => 'tools', 'percentage' => 88, 'years_of_experience' => 3],
            ['name' => 'Cloudways', 'icon' => 'Cloud', 'category' => 'tools', 'percentage' => 85, 'years_of_experience' => 2],

            // Architecture & Standards
            ['name' => 'Controller-Service-Model', 'icon' => 'Binary', 'category' => 'tools', 'percentage' => 95, 'years_of_experience' => 3],
            ['name' => 'Spatie Role & Permission', 'icon' => 'ShieldCheck', 'category' => 'tools', 'percentage' => 95, 'years_of_experience' => 3],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(['name' => $skill['name']], $skill);
        }

        // 3. Real Work Experience (E-Learning & Earning Ltd.)
        $experiences = [
            [
                'company' => 'E-Learning & Earning Ltd.',
                'position' => 'Software Engineer',
                'location' => 'Dhaka, Bangladesh',
                'start_date' => '2025-01-01',
                'end_date' => null,
                'is_current' => true,
                'responsibilities' => "Develop and maintain enterprise business software (ERP, CRM, HRM, LMS).\nArchitect database schemas in MySQL with indexing and query optimization.\nBuild automated lead ingestion pipelines connecting Facebook Lead Ads webhooks to internal CRM.\nImplement role-based access control using Spatie Laravel Permission.\nDevelop REST APIs and integrate third-party communications (WhatsApp Cloud API).\nOptimize application performance and manage production deployment on VPS and cPanel.",
                'technologies' => ['Laravel', 'PHP', 'MySQL', 'React', 'Inertia.js', 'REST API', 'Spatie Permission', 'Git', 'Linux'],
                'achievements' => 'Centralized organizational data flow across 5 distinct departments and automated lead-to-salesperson routing, cutting response delay by 70%.',
            ],
            [
                'company' => 'Software & Web Solutions',
                'position' => 'Associate Software Developer',
                'location' => 'Dhaka, Bangladesh',
                'start_date' => '2023-01-01',
                'end_date' => '2024-12-31',
                'is_current' => false,
                'responsibilities' => "Engineered custom web applications and business management portals.\nDesigned relational database models and normalized schemas for e-commerce and inventory platforms.\nCreated responsive interfaces using React, JavaScript, and modern CSS frameworks.\nIntegrated automated invoice generators, PDF generation, and SMS/Email notification services.",
                'technologies' => ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Bootstrap'],
                'achievements' => 'Delivered 12+ production client websites and web systems with 99.9% uptime.',
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::updateOrCreate(
                ['company' => $exp['company'], 'position' => $exp['position']],
                $exp
            );
        }

        // 4. Education
        $educations = [
            [
                'institute' => 'Recognized University / Institute',
                'degree' => 'B.Sc. in Computer Science & Engineering',
                'department' => 'Department of CSE',
                'session' => '2019 - 2023',
                'result' => 'Graduated with Distinction',
            ],
        ];

        foreach ($educations as $edu) {
            Education::updateOrCreate(
                ['institute' => $edu['institute'], 'degree' => $edu['degree']],
                $edu
            );
        }

        // 5. Professional Services
        $services = [
            [
                'name' => 'Custom Software Development',
                'icon' => 'Cpu',
                'description' => 'Build high-performance, tailored software specifically structured around your business processes, operational rules, and user requirements.',
            ],
            [
                'name' => 'Enterprise ERP Development',
                'icon' => 'ShieldCheck',
                'description' => 'Unite accounting, HR, inventory, employee tracking, and financial analytics into one secure, centralized corporate platform.',
            ],
            [
                'name' => 'CRM & Sales Automation',
                'icon' => 'Link2',
                'description' => 'Centralize incoming leads, automate salesperson assignments, track WhatsApp/phone activities, and optimize deal conversion funnels.',
            ],
            [
                'name' => 'HRM & Payroll Systems',
                'icon' => 'Layers',
                'description' => 'Digitize employee lifecycle management, department hierarchies, biometric attendance tracking, leaves, and automated monthly salary generation.',
            ],
            [
                'name' => 'Web Application & SaaS Development',
                'icon' => 'Atom',
                'description' => 'Modern, high-performance, responsive web applications built with Laravel, React, Inertia.js, and clean architecture standards.',
            ],
            [
                'name' => 'Process Automation & API Integration',
                'icon' => 'Box',
                'description' => 'Eliminate manual human work by integrating Facebook Lead Ads webhooks, WhatsApp Cloud API, automated SMS, and notification triggers.',
            ],
        ];

        foreach ($services as $srv) {
            Service::updateOrCreate(['name' => $srv['name']], $srv);
        }

        // 6. Featured Cornerstone Projects (The 6 Major Real-World Systems)
        $projects = [
            [
                'name' => 'Enterprise ERP Management System',
                'slug' => 'enterprise-erp-management-system',
                'category' => 'ERP',
                'status' => 'Production / Active',
                'client' => 'Corporate Enterprise Client',
                'duration' => '6 Months',
                'role' => 'Software Engineer — Architecture, database design, module implementation and system optimization.',
                'description' => 'A comprehensive enterprise management system designed to centralize business operations and simplify day-to-day organizational workflows.',
                'overview' => 'A complete business operating platform uniting Chart of Accounts, multi-warehouse inventory, employee attendance, and real-time executive dashboards.',
                'problem' => 'Disjointed operational data across isolated spreadsheets resulted in inventory discrepancies, manual bookkeeping delays, and zero visibility into cross-department metrics.',
                'objective' => 'Create a single, unified database architecture with role-based permissions (Spatie RBAC) where every transaction automatically updates ledgers and stock balances.',
                'solution' => 'Engineered a modular Controller → Service → Model architecture in Laravel with MySQL. Designed normalized database relations for ledger double-entry, real-time inventory adjustments, and automated payroll computations.',
                'architecture_flow' => "Client Request → Form Request Validation → Controller → Service Layer (Transaction & Logging) → Eloquent Models → MySQL Engine",
                'features' => [
                    'Accounting & Chart of Accounts with double-entry ledgers',
                    'Human Resource & Employee Lifecycle Management',
                    'Multi-Warehouse Inventory with batch & stock tracking',
                    'Employee Attendance & Automated Payroll Slip Generation',
                    'Dynamic Executive Reports & Financial Statement Exports',
                    'Granular Role & Permission Matrix powered by Spatie RBAC',
                    'Real-Time Departmental Operational Dashboards'
                ],
                'technology_stack' => ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'REST API', 'Spatie Permission'],
                'live_demo' => 'https://erp.jahidhasan.dev',
                'github' => 'https://github.com/JahidHasanOfficial/erp-management-system',
                'challenges' => 'Ensuring atomic database transactions during simultaneous payroll disbursement and stock movements without creating deadlocks.',
                'solutions' => 'Employed database transaction closures with row-level locking (`lockForUpdate()`) in the Service layer, coupled with indexed foreign keys.',
                'business_impact' => 'Reduced monthly payroll calculation time from 4 days to 15 minutes and eliminated 100% of warehouse stock counting mismatches.',
                'thumbnail' => '/assets/projects/erp-preview.png',
                'is_featured' => true,
            ],
            [
                'name' => 'CRM & Lead Distribution Automation Platform',
                'slug' => 'crm-lead-distribution-automation',
                'category' => 'CRM',
                'status' => 'Production / Active',
                'client' => 'Sales & Marketing Agency',
                'duration' => '4 Months',
                'role' => 'Software Engineer — Backend architecture, webhook ingestion pipelines, and CRM workflow engine.',
                'description' => 'A sales-focused CRM platform designed to centralize leads, automate sales workflows and help teams manage customer interactions efficiently.',
                'overview' => 'Automated sales engine capturing leads from Facebook Lead Ads in real time, distributing them intelligently among sales agents, and managing call logs and WhatsApp follow-ups.',
                'problem' => 'Manual export of Facebook leads caused hours of delay, lead leakage, duplicate calling, and no accountability for follow-up schedules.',
                'objective' => 'Achieve sub-second lead ingestion, automated round-robin lead allocation, and full visibility over every client interaction.',
                'solution' => 'Built a real-time Webhook Ingestion Service with payload verification and de-duplication. Constructed an automated distribution engine that assigns leads and triggers immediate WhatsApp alerts.',
                'architecture_flow' => "Facebook Lead Ad Webhook → Ingestion Service → De-duplication → Lead Distribution Engine → Salesperson Notification (WhatsApp/Email) → Activity Tracking → Conversion",
                'features' => [
                    'Facebook Lead Ads Webhook Integration with instant ingestion',
                    'Intelligent Round-Robin & Rule-Based Lead Assignment',
                    'Sales Activity Logging (Calls, Site Visits, Quotations, Notes)',
                    'WhatsApp Webhook & Direct Communication Activities',
                    'Automated Follow-up Reminders & Snooze Scheduling',
                    'Sales Executive Performance & Conversion Analytics',
                    'Deal Stage Kanban Board & Pipeline Reports'
                ],
                'technology_stack' => ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Webhooks', 'REST API'],
                'live_demo' => 'https://crm.jahidhasan.dev',
                'github' => 'https://github.com/JahidHasanOfficial/crm-lead-management',
                'challenges' => 'Handling burst webhook requests from active ad campaigns without dropping incoming leads or creating duplicate customer entries.',
                'solutions' => 'Implemented queue-based webhook dispatching with phone/email unique fingerprinting and database idempotency checks.',
                'business_impact' => 'Cut first-response time from 4 hours to under 60 seconds, increasing lead-to-customer conversion by 35%.',
                'thumbnail' => '/assets/projects/crm-preview.png',
                'is_featured' => true,
            ],
            [
                'name' => 'Online Quiz & Examination SaaS Platform',
                'slug' => 'online-quiz-examination-platform',
                'category' => 'LMS',
                'status' => 'Production / Active',
                'client' => 'EdTech Academy',
                'duration' => '3 Months',
                'role' => 'Software Engineer — System architecture, exam grading algorithm, and subscription management.',
                'description' => 'An online examination platform where students can subscribe to packages and access the exams included in their subscription.',
                'overview' => 'Scalable online examination engine featuring student subscription tiers, timed test sessions with randomized question pools, automated instant evaluation, and dynamic certificates.',
                'problem' => 'Physical exams and manual paper checking were bottlenecking test schedules and taking weeks to release results.',
                'objective' => 'Enable thousands of students to simultaneously take timed exams online with tamper-proof grading and instant downloadable certificates.',
                'solution' => 'Developed an online examination portal with package checkout, timer sync with server-side validation, anti-cheating window blur detectors, and instant score computation.',
                'architecture_flow' => "Student Registration → Package Selection → Payment Gateway → Instant Package Activation → Scheduled Exam Session → Real-Time Timer Sync → Automated Score & Negative Marking → Dynamic PDF Certificate",
                'features' => [
                    'Student Registration & Profile Dashboard',
                    'Package Subscription & Payment Gateway Integration',
                    'Timed Online Examination with Random Question Shuffling',
                    'Automated Result Calculation with Negative Marking Support',
                    'Comprehensive Student Exam History & Performance Review',
                    'Dynamic PDF Certificate Generation with Verification QR Code',
                    'Instructor Question Bank Management with Category Filtering'
                ],
                'technology_stack' => ['Laravel', 'MySQL', 'JavaScript', 'Inertia.js', 'Tailwind CSS', 'REST API'],
                'live_demo' => 'https://quiz.jahidhasan.dev',
                'github' => 'https://github.com/JahidHasanOfficial/quiz-examination-platform',
                'challenges' => 'Preventing client-side time manipulation and handling concurrent exam submissions when time expires.',
                'solutions' => 'Enforced authoritative server-side timestamps in Redis/cache and automated cron-based auto-submission for expired sessions.',
                'business_impact' => 'Successfully conducted 50,000+ online exams with zero exam downtime and 100% automated grading precision.',
                'thumbnail' => '/assets/projects/quiz-preview.png',
                'is_featured' => true,
            ],
            [
                'name' => 'LMS — Enterprise Learning Management System',
                'slug' => 'enterprise-learning-management-system',
                'category' => 'LMS',
                'status' => 'Production / Active',
                'client' => 'E-Learning Academy',
                'duration' => '4 Months',
                'role' => 'Software Engineer — Course module development, video security access, and student progress tracking.',
                'description' => 'A learning management platform designed to manage courses, students, learning content and progress from a centralized dashboard.',
                'overview' => 'Feature-rich education platform providing video course delivery, lesson milestones, interactive quizzes, student discussions, and verified certificates.',
                'problem' => 'Course content piracy and low student completion rates due to lack of structured progress milestones.',
                'objective' => 'Deliver high-quality secure video lessons with progress tracking and automated student engagement triggers.',
                'solution' => 'Built a structured LMS with sequential lesson unlocks, encrypted video streaming links, student progress analytics, and automated milestone badges.',
                'architecture_flow' => "Course Creation → Curriculum Design → Secure Video Hosting → Student Enrollment → Lesson Progress Tracking → Course Completion → Certificate",
                'features' => [
                    'Course & Curriculum Builder with Chapter Hierarchy',
                    'Secure Video Lesson Streaming with Protected Links',
                    'Student Progress Tracking & Sequential Lesson Unlocks',
                    'Instructor Dashboard with Enrollment & Revenue Analytics',
                    'Student Dashboard with Notes, Discussions & Q&A',
                    'Automated Course Completion Certificate Generator'
                ],
                'technology_stack' => ['Laravel', 'React', 'MySQL', 'Inertia.js', 'Tailwind CSS', 'REST API'],
                'live_demo' => 'https://lms.jahidhasan.dev',
                'github' => 'https://github.com/JahidHasanOfficial/learning-management-system',
                'challenges' => 'Securing video content from unauthorized downloads and maintaining streaming speeds across mobile networks.',
                'solutions' => 'Integrated signed access tokens with CloudFront distribution, restricting playback strictly to authenticated sessions.',
                'business_impact' => 'Boosted course completion rates by 42% and supported over 8,000 active enrolled students.',
                'thumbnail' => '/assets/projects/lms-preview.png',
                'is_featured' => true,
            ],
            [
                'name' => 'Centralized HR Management System (HRM)',
                'slug' => 'centralized-hr-management-system',
                'category' => 'HRM',
                'status' => 'Production / Active',
                'client' => 'Multi-Branch Organization',
                'duration' => '3 Months',
                'role' => 'Software Engineer — HR database design, attendance calculations, and leave approval workflows.',
                'description' => 'A centralized HR management system designed to simplify employee administration and organizational workflows.',
                'overview' => 'Enterprise human resource platform managing multi-department employee directories, biometric attendance logs, leave balances, and salary computations.',
                'problem' => 'Biometric machine attendance was checked manually on Excel, creating payroll disputes and manual calculation overhead.',
                'objective' => 'Automate daily attendance ingestion, multi-tier leave approval, and seamless monthly pay generation.',
                'solution' => 'Created an automated biometric sync background worker that digests attendance punches, cross-checks leave balances, and prepares finalized payroll batches.',
                'architecture_flow' => "Biometric Device / Web Punch → Daily Attendance Worker → Leave Balance Validation → Approval Workflow → Monthly Payroll Generator → Pay Slip PDF",
                'features' => [
                    'Comprehensive Employee Profiles & Document Vault',
                    'Department & Designation Organizational Hierarchy',
                    'Biometric & Manual Attendance Synchronization',
                    'Multi-Level Leave Application & Approval Pipeline',
                    'Automated Monthly Payroll Calculation with Allowances & Deductions',
                    'Spatie Role & Permission Access Control for HR and Dept Heads'
                ],
                'technology_stack' => ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'REST API'],
                'live_demo' => 'https://hrm.jahidhasan.dev',
                'github' => 'https://github.com/JahidHasanOfficial/hrm-management-system',
                'challenges' => 'Handling complex shift hours, overnight shifts, and late arrival grace period calculations across different branches.',
                'solutions' => 'Designed a flexible Shift Policy Engine in the Service layer with customizable penalty rules and grace thresholds.',
                'business_impact' => 'Eliminated attendance discrepancies completely and automated monthly salary distribution for 250+ employees.',
                'thumbnail' => '/assets/projects/hrm-preview.png',
                'is_featured' => true,
            ],
            [
                'name' => 'Modern E-Commerce & Order Management Engine',
                'slug' => 'modern-ecommerce-order-management',
                'category' => 'E-Commerce',
                'status' => 'Production / Active',
                'client' => 'Retail Brand',
                'duration' => '3 Months',
                'role' => 'Software Engineer — E-commerce architecture, cart management, checkout pipeline, and inventory sync.',
                'description' => 'A fast, high-conversion e-commerce platform backed by real-time inventory management and streamlined checkout.',
                'overview' => 'Modern digital storefront with product variant management, promotional coupons, multi-gateway payments, and automated order fulfillment tracking.',
                'problem' => 'Slow page loads on previous WooCommerce site and inventory overselling during high-traffic promotional flash sales.',
                'objective' => 'Achieve sub-second page loads, atomic inventory deduction on checkout, and seamless order management.',
                'solution' => 'Engineered a modern React storefront coupled with Laravel backend, utilizing database transactions to prevent inventory race conditions.',
                'architecture_flow' => "Customer Browsing → Cart Storage → Atomic Checkout with Inventory Lock → Payment Verification → Order Created → Stock Deducted → Invoice Issued",
                'features' => [
                    'Product Catalog with Dynamic Attribute & Variant Selectors',
                    'High-Speed Cart & One-Page Frictionless Checkout',
                    'Payment Gateway Integration with Instant Verification',
                    'Real-Time Inventory Synchronization & Stock Alerts',
                    'Discount Coupon & Promotional Rules Engine',
                    'Admin Order Fulfillment, Shipping & Invoice Management'
                ],
                'technology_stack' => ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Inertia.js', 'REST API'],
                'live_demo' => 'https://shop.jahidhasan.dev',
                'github' => 'https://github.com/JahidHasanOfficial/ecommerce-platform',
                'challenges' => 'Preventing stock overselling during simultaneous checkouts of limited-quantity items.',
                'solutions' => 'Utilized database pessimistic row locking during payment initiation with automatic lock release timeouts.',
                'business_impact' => 'Improved storefront loading speed by 65% and maintained 100% order accuracy during seasonal sales.',
                'thumbnail' => '/assets/projects/ecommerce-preview.png',
                'is_featured' => true,
            ],
        ];

        foreach ($projects as $projectData) {
            $proj = Project::updateOrCreate(['slug' => $projectData['slug']], $projectData);

            // Screenshot placeholder mapping
            ProjectScreenshot::updateOrCreate(
                ['project_id' => $proj->id],
                ['image_path' => $proj->thumbnail ?: '/assets/placeholder-screenshot.png']
            );
        }

        // 7. Testimonials
        $testimonials = [
            [
                'client_name' => 'Managing Director',
                'company' => 'E-Learning & Earning Ltd.',
                'image' => null,
                'rating' => 5,
                'feedback' => 'Jahid was highly responsible throughout the project. He understood the complex operational requirements quickly and delivered the enterprise management systems efficiently.',
            ],
            [
                'client_name' => 'Technical Project Manager',
                'company' => 'Business Solutions Partner',
                'image' => null,
                'rating' => 5,
                'feedback' => 'Exceptional understanding of backend architecture and database design. His automated CRM lead routing engine solved our biggest bottleneck and delivered immediate ROI.',
            ],
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(
                ['client_name' => $t['client_name'], 'company' => $t['company']],
                $t
            );
        }

        // 8. Technical Engineering Blogs
        $blogs = [
            [
                'title' => 'Controller-Service-Model Architecture: Clean Enterprise Patterns in Laravel',
                'slug' => 'controller-service-model-architecture-laravel',
                'category' => 'Laravel',
                'content' => "In enterprise software development, bloated controllers and fat models are two of the biggest causes of technical debt. By adhering to a strict **Controller → Service → Model** architecture, controllers remain laser-focused on HTTP requests, while domain logic lives safely inside reusable services...\n\n### Key Advantages:\n1. Zero business logic in controllers\n2. Reusable service methods across Web, API, and Console commands\n3. Simplified Unit and Feature testing with mockable dependencies",
                'tags' => ['Laravel', 'Architecture', 'Service Layer', 'Clean Code'],
                'seo_title' => 'Controller-Service-Model Architecture in Laravel | Jahid Hasan',
                'seo_description' => 'Explore the Controller-Service-Model pattern in Laravel 12 for building maintainable enterprise applications.',
                'status' => 'published',
                'publish_date' => '2026-02-15 10:00:00',
            ],
            [
                'title' => 'Building Resilient Lead Ingestion Pipelines with Webhooks & Queues',
                'slug' => 'resilient-lead-ingestion-pipelines-webhooks',
                'category' => 'Automation',
                'content' => "When advertising campaigns run at scale, incoming webhooks arrive in rapid bursts. Synchronous database writes directly in the webhook controller can cause timeouts and lost customer data. Here is how we engineered an asynchronous queue-based ingestion pipeline with idempotency guarantees...\n\n### Architecture Highlights:\n- Sub-second 200 OK response to webhook providers\n- Redis queue dispatch for background processing\n- Unique fingerprinting to eliminate duplicate lead entries",
                'tags' => ['Webhooks', 'Queues', 'Automation', 'CRM', 'Laravel'],
                'seo_title' => 'Resilient Webhook Lead Ingestion Pipelines | Jahid Hasan',
                'seo_description' => 'Learn how to architect high-concurrency webhook ingestion systems in Laravel.',
                'status' => 'published',
                'publish_date' => '2026-03-01 14:30:00',
            ],
            [
                'title' => 'MySQL Indexing & Query Optimization for High-Volume ERP Ledgers',
                'slug' => 'mysql-indexing-query-optimization-erp-ledgers',
                'category' => 'MySQL',
                'content' => "Financial ERP ledgers grow exponentially. Running complex balance calculations without proper indexes can lock tables and degrade user experience. This article walks through composite indexes, eager loading strategies, and avoiding N+1 queries in Eloquent ORM.",
                'tags' => ['MySQL', 'Database Design', 'Indexing', 'Performance', 'ERP'],
                'seo_title' => 'MySQL Indexing & Query Optimization for ERPs | Jahid Hasan',
                'seo_description' => 'Practical database tuning techniques for high-volume financial accounting systems in MySQL.',
                'status' => 'published',
                'publish_date' => '2026-03-10 09:00:00',
            ],
        ];

        foreach ($blogs as $b) {
            Blog::updateOrCreate(['slug' => $b['slug']], $b);
        }
    }
}
