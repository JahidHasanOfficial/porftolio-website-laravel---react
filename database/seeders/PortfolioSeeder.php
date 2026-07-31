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
        // 1. Settings
        $settings = [
            'name' => 'Jahid Hasan',
            'designation' => 'Full Stack Developer',
            'typing_titles' => json_encode(['Laravel Expert', 'React Developer', 'ERP & POS Builder', 'REST API Specialist']),
            'short_intro' => 'I craft high-performance, secure, and premium web applications using Laravel, React, and MySQL. Specialized in building enterprise-grade ERPs, CRMs, and custom SaaS platforms.',
            'biography' => 'I am a dedicated Full Stack Web Developer with over 5 years of professional experience. I specialize in designing robust backend architectures and highly interactive, smooth frontend interfaces.',
            'professional_summary' => 'Highly analytical and detail-oriented Software Engineer with a proven track record of designing, developing, and deploying enterprise web solutions. Expertise lies in PHP (Laravel), JavaScript (React, Node.js), and database optimization.',
            'years_of_experience' => '5',
            'current_position' => 'Senior Software Engineer',
            'career_objective' => 'To leverage my skills in full-stack engineering to build scalable, high-impact software solutions for clients worldwide, while continuously learning and pushing technical boundaries.',
            'phone' => '+8801700000000',
            'email' => 'jahid@example.com',
            'address' => 'Dhaka, Bangladesh',
            'github_url' => 'https://github.com/JahidHasanOfficial',
            'linkedin_url' => 'https://linkedin.com/in/JahidHasanOfficial',
            'twitter_url' => 'https://twitter.com/JahidHasan',
            'facebook_url' => 'https://facebook.com/JahidHasan',
            'meta_title' => 'Jahid Hasan | Senior Full Stack Developer Portfolio',
            'meta_description' => 'Explore the professional portfolio of Jahid Hasan, a Senior Full Stack Developer specializing in Laravel, React, Inertia.js, and MySQL.',
            'meta_keywords' => 'Laravel, React, Inertia, Tailwind CSS, MySQL, ERP Developer, Bangladesh Software Engineer',
            'logo' => null,
            'favicon' => null,
            'theme' => 'dark',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        // 2. Skills
        $skills = [
            ['name' => 'React', 'icon' => 'Atom', 'category' => 'frontend', 'percentage' => 95, 'years_of_experience' => 4],
            ['name' => 'JavaScript', 'icon' => 'Code2', 'category' => 'frontend', 'percentage' => 92, 'years_of_experience' => 5],
            ['name' => 'HTML5', 'icon' => 'Html5', 'category' => 'frontend', 'percentage' => 98, 'years_of_experience' => 6],
            ['name' => 'CSS3', 'icon' => 'Layers', 'category' => 'frontend', 'percentage' => 90, 'years_of_experience' => 6],
            ['name' => 'Tailwind CSS', 'icon' => 'Palette', 'category' => 'frontend', 'percentage' => 96, 'years_of_experience' => 4],
            
            ['name' => 'Laravel', 'icon' => 'Cpu', 'category' => 'backend', 'percentage' => 97, 'years_of_experience' => 5],
            ['name' => 'PHP', 'icon' => 'Terminal', 'category' => 'backend', 'percentage' => 94, 'years_of_experience' => 5],
            ['name' => 'REST API', 'icon' => 'Link2', 'category' => 'backend', 'percentage' => 95, 'years_of_experience' => 5],

            ['name' => 'MySQL', 'icon' => 'Database', 'category' => 'database', 'percentage' => 88, 'years_of_experience' => 5],

            ['name' => 'Git', 'icon' => 'GitBranch', 'category' => 'tools', 'percentage' => 92, 'years_of_experience' => 5],
            ['name' => 'GitHub', 'icon' => 'Github', 'category' => 'tools', 'percentage' => 94, 'years_of_experience' => 5],
            ['name' => 'Composer', 'icon' => 'Box', 'category' => 'tools', 'percentage' => 90, 'years_of_experience' => 5],
            ['name' => 'Postman', 'icon' => 'Send', 'category' => 'tools', 'percentage' => 95, 'years_of_experience' => 5],
            ['name' => 'VS Code', 'icon' => 'Binary', 'category' => 'tools', 'percentage' => 96, 'years_of_experience' => 6],

            ['name' => 'cPanel', 'icon' => 'Server', 'category' => 'deployment', 'percentage' => 90, 'years_of_experience' => 5],
            ['name' => 'VPS Hosting', 'icon' => 'Cloud', 'category' => 'deployment', 'percentage' => 85, 'years_of_experience' => 3],
            ['name' => 'Linux CLI', 'icon' => 'TerminalSquare', 'category' => 'deployment', 'percentage' => 80, 'years_of_experience' => 3],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(['name' => $skill['name']], $skill);
        }

        // 3. Experiences
        $experiences = [
            [
                'company' => 'Nexus Software Solutions',
                'position' => 'Senior Software Engineer',
                'location' => 'Dhaka, Bangladesh',
                'start_date' => '2024-01-01',
                'end_date' => null,
                'is_current' => true,
                'responsibilities' => "Led the development of a complex multi-tenant ERP system for manufacturing companies.\nArchitected scalable database queries reducing response time by 45%.\nMentored junior developers on Laravel best practices and Inertia.js React patterns.",
                'technologies' => ['Laravel', 'React', 'MySQL', 'Inertia.js', 'Redis'],
                'achievements' => 'Successfully launched ERP platform used by 12 client companies and optimized query performance by 40%.',
            ],
            [
                'company' => 'ByteCraft Tech',
                'position' => 'Full Stack Developer',
                'location' => 'Sylhet, Bangladesh',
                'start_date' => '2021-06-01',
                'end_date' => '2023-12-31',
                'is_current' => false,
                'responsibilities' => "Developed various client projects including CRM, POS, and LMS portals.\nImplemented multi-gateway payment integrations (SSLCommerz, Stripe, PayPal).\nConfigured CI/CD deployment pipelines on VPS servers.",
                'technologies' => ['Laravel', 'Vue.js', 'MySQL', 'Tailwind CSS', 'Stripe'],
                'achievements' => 'Built a high-performance inventory system which handled 100k+ transactions daily.',
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
                'institute' => 'Dhaka International University',
                'degree' => 'B.Sc. in Computer Science & Engineering',
                'department' => 'CSE',
                'session' => '2017 - 2021',
                'result' => '3.82 out of 4.00',
            ],
        ];

        foreach ($educations as $edu) {
            Education::updateOrCreate(
                ['institute' => $edu['institute'], 'degree' => $edu['degree']],
                $edu
            );
        }

        // 5. Services
        $services = [
            ['name' => 'Laravel Development', 'icon' => 'Cpu', 'description' => 'Custom enterprise-level web applications built with highly secure, maintainable MVC architecture, modular structures, and fast load times.'],
            ['name' => 'React Development', 'icon' => 'Atom', 'description' => 'Stunning, fluid, single-page application frontends built using React 19, Framer Motion, and Tailwind CSS for modern user experiences.'],
            ['name' => 'REST API Development', 'icon' => 'Link2', 'description' => 'Fast, optimized JSON REST APIs following OpenAPI standards with secure token-based authentication, request validation, and documentation.'],
            ['name' => 'ERP & CRM Systems', 'icon' => 'ShieldCheck', 'description' => 'Tailored business automation software to manage enterprise workflows, employee pipelines, and customer relation data.'],
            ['name' => 'POS & Inventory Systems', 'icon' => 'ShoppingCart', 'description' => 'Fast, real-time POS systems with low-latency barcode scanning, multi-branch inventory tracking, and sales analytics.'],
            ['name' => 'Website Maintenance', 'icon' => 'Wrench', 'description' => 'Regular security patch updates, performance audits, bug-fixing, database indexing, and general optimizations for web operations.'],
        ];

        foreach ($services as $srv) {
            Service::updateOrCreate(['name' => $srv['name']], $srv);
        }

        // 6. Certificates
        $certificates = [
            [
                'name' => 'Advanced Laravel & Microservices',
                'issuer' => 'Udemy Academy',
                'date' => '2023-08-15',
                'image' => null,
                'credential_url' => 'https://udemy.com/verify/advanced-laravel',
            ],
            [
                'name' => 'Full-Stack React Developer',
                'issuer' => 'Meta (Coursera)',
                'date' => '2022-11-20',
                'image' => null,
                'credential_url' => 'https://coursera.org/verify/meta-react',
            ],
        ];

        foreach ($certificates as $cert) {
            Certificate::updateOrCreate(['name' => $cert['name']], $cert);
        }

        // 7. Projects
        $projects = [
            [
                'name' => 'Apex Multi-Tenant ERP',
                'slug' => 'apex-multi-tenant-erp',
                'category' => 'ERP',
                'status' => 'Completed',
                'client' => 'Apex Manufacturing Group',
                'duration' => '6 Months',
                'description' => 'A comprehensive multi-tenant SaaS ERP software designed for managing supply chain, HR, finance, and manufacturing queues.',
                'overview' => 'Apex ERP is a cloud-based solution that connects different departments in a manufacturing company, syncs warehouse inventory in real time, and automates employee payroll calculations.',
                'problem' => 'The client was using disjointed Excel files and legacy desktop programs, leading to stock discrepancies, late shipping, and manual errors in salary generation.',
                'solution' => 'We built a unified web portal in Laravel and React with Inertia.js, utilizing database multi-tenancy (separate schemas) and real-time socket connections for inventory updates.',
                'features' => ['Multi-tenant database isolation', 'Automated ledger entries and financial reports', 'Dynamic HRM payroll generator with allowance modules', 'Real-time inventory warning alerts'],
                'technology_stack' => ['Laravel', 'React', 'MySQL', 'Inertia.js', 'Tailwind CSS', 'Redis'],
                'live_demo' => 'https://erp.jahidhasan.dev',
                'github' => 'https://github.com/JahidHasanOfficial/apex-erp',
                'challenges' => 'Enforcing separate tenant database connections dynamically based on domain headers while keeping migrations unified.',
                'solutions' => 'Developed custom Laravel database middleware to swap the DB connection dynamically at runtime, coupled with custom migration paths.',
                'thumbnail' => null,
                'is_featured' => true,
            ],
            [
                'name' => 'Nova POS & Inventory System',
                'slug' => 'nova-pos-inventory-system',
                'category' => 'POS',
                'status' => 'Completed',
                'client' => 'SuperShop Chain',
                'duration' => '4 Months',
                'description' => 'Fast and optimized Point of Sale and inventory manager with offline transaction capability, barcode scanning, and multi-register support.',
                'overview' => 'Nova POS helps retail businesses manage multiple physical registers, synchronize inventory quantities across outlets, and print invoices instantly.',
                'problem' => 'Slow checkout lines due to slow server responses, and frequent stockouts because store managers did not have unified stock reports.',
                'solution' => 'Built a high-performance checkout screen in React that communicates via optimized API endpoints. Used browser IndexedDB caching for product lists to handle spotty internet.',
                'features' => ['Rapid barcode scanning and order addition', 'Receipt printing integration', 'Multi-warehouse stock transfers', 'Sales analytics chart dashboard'],
                'technology_stack' => ['Laravel', 'React', 'MySQL', 'Axios', 'Tailwind CSS'],
                'live_demo' => 'https://pos.jahidhasan.dev',
                'github' => 'https://github.com/JahidHasanOfficial/nova-pos',
                'challenges' => 'Syncing offline sales to the central server when the internet connection is unstable without creating duplicate invoice numbers.',
                'solutions' => 'Implemented an offline queue in the browser local storage, combined with a UUID-based transaction hashing algorithm to prevent duplications.',
                'thumbnail' => null,
                'is_featured' => true,
            ],
            [
                'name' => 'Lumina Learning Management System',
                'slug' => 'lumina-lms',
                'category' => 'LMS',
                'status' => 'Completed',
                'client' => 'EduSpark Academy',
                'duration' => '3 Months',
                'description' => 'A interactive learning platform for online course creation, video rendering, quiz management, and certificate generation.',
                'overview' => 'Lumina LMS allows instructors to design curriculum structures, host video chapters, schedule online tests, and award automatically generated PDF certificates to students.',
                'problem' => 'The academy struggled to prevent students from sharing courses, and video playback was slow for users with low bandwidth.',
                'solution' => 'Configured video storage security via AWS CloudFront signed URLs, and implemented dynamic video transcoding using FFmpeg.',
                'features' => ['AWS CloudFront video streaming', 'Dynamic certificate designer and generator', 'Interactive forum discussion boards', 'Instructor sales payout dashboard'],
                'technology_stack' => ['Laravel', 'React', 'MySQL', 'AWS S3', 'Framer Motion'],
                'live_demo' => 'https://lms.jahidhasan.dev',
                'github' => 'https://github.com/JahidHasanOfficial/lumina-lms',
                'challenges' => 'Ensuring secure and fast video streaming without direct access to file paths, preventing unauthorized downloads.',
                'solutions' => 'Implemented AWS S3 private storage coupled with Laravel controller-based temporary URL signing and CloudFront cookies.',
                'thumbnail' => null,
                'is_featured' => false,
            ],
        ];

        foreach ($projects as $projectData) {
            $proj = Project::updateOrCreate(['slug' => $projectData['slug']], $projectData);
            
            // Seed a mock screenshot
            ProjectScreenshot::updateOrCreate(
                ['project_id' => $proj->id],
                ['image_path' => '/assets/placeholder-screenshot.png']
            );
        }

        // 8. Testimonials
        $testimonials = [
            [
                'client_name' => 'Sarah Connor',
                'company' => 'Apex Manufacturing CEO',
                'image' => null,
                'rating' => 5,
                'feedback' => 'Jahid is an exceptional developer. He transformed our complex manufacturing workflow into a highly intuitive web application. His architectural decisions in the ERP system were brilliant.',
            ],
            [
                'client_name' => 'Robert Davis',
                'company' => 'Nova Retail Ltd Manager',
                'image' => null,
                'rating' => 5,
                'feedback' => 'The POS system built by Jahid runs incredibly fast. Our cashiers love the smooth barcode search and offline checkout capacity. Extremely professional and skilled programmer.',
            ],
        ];

        foreach ($testimonials as $test) {
            Testimonial::updateOrCreate(['client_name' => $test['client_name']], $test);
        }

        // 9. Blogs
        $blogs = [
            [
                'title' => 'Eager Loading in Laravel: Preventing the N+1 Query Problem',
                'slug' => 'eager-loading-laravel-preventing-n-plus-1-queries',
                'thumbnail' => null,
                'content' => 'Database performance is key to a fast web application. In Laravel Eloquent, relationships are lazy-loaded by default, which can cause severe query overheads when rendering lists. This article walks through eager loading (`with`) and lazy eager loading (`load`) to optimize your SQL load times.',
                'category' => 'Laravel',
                'tags' => ['Eloquent', 'Database', 'Performance'],
                'seo_title' => 'Optimize Laravel DB: Eager Loading and N+1 Fixes',
                'seo_description' => 'Learn how to resolve the N+1 query problem using Laravel eager loading and speed up database calls.',
                'seo_keywords' => 'Laravel eager loading, N+1 query, Eloquent optimization',
                'status' => 'published',
                'publish_date' => now(),
            ],
            [
                'title' => 'Building Secure REST APIs in PHP 8.3',
                'slug' => 'building-secure-rest-apis-php-8-3',
                'thumbnail' => null,
                'content' => 'Security should never be an afterthought. When building RESTful APIs in Laravel or pure PHP, authentication, rate limiting, and response formatting are vital components. We discuss Sanctum token authentication, throttling, and request encryption.',
                'category' => 'PHP',
                'tags' => ['API', 'Security', 'Laravel Sanctum'],
                'seo_title' => 'Secure REST API Development PHP 8.3 Guide',
                'seo_description' => 'A comprehensive walkthrough on locking down PHP REST APIs, sanitizing inputs, and using token auth.',
                'seo_keywords' => 'PHP REST API, API security, Sanctum token authentication',
                'status' => 'published',
                'publish_date' => now()->subDays(5),
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::updateOrCreate(['slug' => $blog['slug']], $blog);
        }

        // 10. Resume
        Resume::updateOrCreate(
            ['id' => 1],
            [
                'file_path' => '/assets/resume.pdf',
                'download_count' => 125,
            ]
        );
    }
}
