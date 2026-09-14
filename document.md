# Professional Software Engineer Portfolio & SRS Specification
**System Requirements Specification (SRS) + Content & Architecture Guide**
* **Target Audience:** Recruiters, Engineering Managers, Enterprise Clients, HR & Technical Leads
* **Brand:** Jahid Hasan — Software Engineer & Business Systems Specialist
* **Core Tech Stack:** Laravel 12 (Backend API / Inertia) + React 19 (Frontend) + Inertia.js + Tailwind CSS + MySQL

---

## 1. Executive Summary & Brand Strategy

### 1.1 Portfolio Positioning
* **Role:** Software Engineer
* **Core Value Proposition:** Building scalable web applications, business software (ERP / CRM / HRM / LMS), and business process automation solutions.
* **Strategic Objective:** Transform from a generic "Laravel Developer" profile into a high-impact **"Software Engineer & Business Systems Specialist"**. Demonstrate real-world enterprise problem solving, robust architecture (Controller → Service → Model), and high-ROI systems engineering.
* **The 10–15 Second Recruiter Hook:** A visitor must immediately understand:
  1. **Who?** Jahid Hasan — Software Engineer
  2. **What does he build?** Scalable Web Applications, Business Systems (ERP, CRM, HRM, LMS) & Automations
  3. **Proven Track Record:** Production-ready systems handling live business operations
  4. **Core Technologies:** Laravel 12, React 19, Inertia.js, MySQL, REST APIs, Tailwind CSS
  5. **Call To Action:** Immediate, frictionless engagement via *"Let's Talk"* or *"View Case Studies"*.

### 1.2 Brand Identity & Voice
* **Full Name:** Jahid Hasan
* **Professional Title:** Software Engineer
* **Short Tagline:** *Building modern web applications, business software & automation solutions.*
* **Professional Bio:**
  > "I’m a Software Engineer focused on building reliable, scalable, and user-friendly web applications and business management systems. I work across backend development, frontend interfaces, database architecture, and system automation to transform real-world business requirements into practical software solutions."

---

## 2. Technical Architecture & System Specifications

### 2.1 Technology Stack

| Layer | Technologies & Libraries | Purpose / Role |
| :--- | :--- | :--- |
| **Backend Framework** | Laravel 12 (PHP 8.3+) | Routing, Middleware, Business Service Layer, Eloquent ORM |
| **Frontend Framework** | React 19 + Inertia.js | SPA-like fluidity with server-driven routing and zero REST boilerplate |
| **Styling & Design** | Tailwind CSS + Modern Design Tokens | Dark-mode first, glassmorphism, responsive grid system |
| **UI Components & Icons** | Lucide React, Headless UI / Radix primitives | Accessible, lightweight, high-performance UI elements |
| **Animations** | Framer Motion (subtle entry/exit, reveals) | Micro-interactions without performance overhead |
| **Database** | MySQL 8.0+ | Relational schema, indexed foreign keys, optimized query execution |
| **Role & Permission** | Spatie Laravel Permission (`spatie/laravel-permission`) | Official RBAC with roles, permissions, middleware & guards |
| **Authentication** | Laravel Breeze (React / Inertia stack) | Secure session-based authentication & password management |
| **Form Handling** | Inertia `useForm` / React Hook Form | Real-time validation, dirty state, submission feedback |
| **API & Client Utilities**| Ziggy (named Laravel routes in JS), Axios | Seamless route resolution and asynchronous operations |
| **Notifications & Alerts**| SweetAlert2, React Hot Toast | Toast notifications and confirmation dialogs |
| **API Documentation** | Swagger (OpenAPI 3.0 / L5-Swagger) | Documented endpoints and request/response contracts |

### 2.2 Architectural Pattern: Controller → Service → Model
In strict compliance with modern enterprise Laravel standards:

```
                  ┌───────────────────────┐
                  │    HTTP / Request     │
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │  Form Request (Val.)  │
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │      Controller       │ ──> Only receives request, calls service, returns Inertia/JSON
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │     Service Layer     │ ──> Contains ALL business logic, transactions, try-catch, automation
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │   Eloquent ORM Model  │ ──> Relationships, Scopes, Accessors/Mutators (NO Raw SQL / DB Facade)
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │      MySQL Engine     │
                  └───────────────────────┘
```

1. **Clean Controllers:** Controllers only inject the corresponding Service, delegate execution, and return an Inertia response or API resource.
2. **Dedicated Service Classes:** All business logic, file processing, lead routing, calculations, and external API calls live inside `App\Services\...`.
3. **Dedicated Form Requests:** All input validation happens strictly in `App\Http\Requests\...`. Controllers never perform manual `$request->validate()`.
4. **Eloquent ORM Exclusively:** No `DB::table()`, DB facade, or raw SQL. Eager loading (`with()`), query scopes, and proper relationship definitions prevent N+1 query bottlenecks.
5. **Robust Exception Handling:** Service methods handle exceptions using structured `try-catch` blocks and return standardized response objects or throw domain exceptions.
6. **Role & Permission Management:** Spatie Laravel Permission handles all user authorization, traits, and policies.

---

## 3. Database Schema & Entity Relationships

The system supports both public presentation and an administrative CMS for zero-code content management:

```
[users] 1 ──── <hasMany> ───< [roles / permissions (Spatie)]
   │
   ├─ 1 ── <hasMany> ──< [experiences]
   ├─ 1 ── <hasMany> ──< [educations]
   ├─ 1 ── <hasMany> ──< [certificates]
   ├─ 1 ── <hasMany> ──< [blog_posts]
   └─ 1 ── <hasMany> ──< [projects]
                              │
                              ├─ <belongsTo> ─── [project_categories]
                              ├─ <hasMany> ──── [project_images]
                              └─ <belongsToMany> [technologies] (via project_technologies)
```

### Table Specifications:
1. **`users`**: `id`, `name`, `email`, `password`, `avatar`, `title`, `bio`, `tagline`, `resume_path`, `timestamps`.
2. **`project_categories`**: `id`, `name`, `slug`, `order`, `timestamps`.
3. **`projects`**:
   * `id`, `category_id`, `title`, `slug`, `subtitle`, `overview`, `challenge`, `objective`, `solution`, `architecture_flow`, `featured` (bool), `client`, `duration`, `live_url`, `github_url`, `case_study_enabled` (bool), `sort_order`, `timestamps`.
4. **`project_images`**: `id`, `project_id`, `image_path`, `caption`, `is_thumbnail` (bool), `order`, `timestamps`.
5. **`technologies`**: `id`, `name`, `slug`, `category` (*Frontend, Backend, Database, Tools, Architecture*), `icon_svg`, `proficiency_percent`, `order`, `timestamps`.
6. **`project_technologies`**: `id`, `project_id`, `technology_id`.
7. **`experiences`**: `id`, `company`, `position`, `employment_type`, `location`, `start_date`, `end_date`, `is_current` (bool), `responsibilities` (JSON), `technologies_used` (JSON), `order`, `timestamps`.
8. **`educations`**: `id`, `institute`, `degree`, `department`, `session`, `result`, `order`, `timestamps`.
9. **`services`**: `id`, `title`, `slug`, `icon`, `short_description`, `features` (JSON), `order`, `is_active` (bool), `timestamps`.
10. **`certificates`**: `id`, `title`, `issuer`, `issue_date`, `credential_id`, `credential_url`, `image_path`, `timestamps`.
11. **`testimonials`**: `id`, `client_name`, `client_title`, `company`, `avatar`, `rating` (1-5), `comment`, `is_published` (bool), `order`, `timestamps`.
12. **`blog_posts`**: `id`, `user_id`, `title`, `slug`, `category`, `thumbnail`, `summary`, `content` (Markdown/HTML), `tags` (JSON), `meta_title`, `meta_description`, `status` (*draft, published*), `published_at`, `timestamps`.
13. **`contact_messages`**: `id`, `name`, `email`, `phone`, `project_type`, `budget_range`, `subject`, `message`, `is_read` (bool), `status` (*new, contacted, archived*), `ip_address`, `timestamps`.
14. **`resume_downloads`**: `id`, `ip_address`, `user_agent`, `downloaded_at`.
15. **`site_settings`**: `id`, `key`, `value`, `group` (*general, social, seo, branding*).

---

## 4. Frontend Design System & UI Specifications

### 4.1 Visual Direction
* **Style:** Engineering-Grade, Modern, Premium Minimalist, High Contrast Dark Mode.
* **Color Palette:**
  * Background Primary: Deep Slate/Charcoal `#0B0F17` / `#0E131F`
  * Surface & Card: Elevated Navy/Slate `#161E2E` / `#1A2234` with subtle border `rgba(255, 255, 255, 0.08)`
  * Primary Accent: Electric Cyan/Emerald Gradient (`#06B6D4` → `#10B981`) or Indigo/Violet Glow (`#6366F1` → `#8B5CF6`)
  * Text Primary: `#F9FAFB` (High contrast pure white/off-white)
  * Text Muted: `#94A3B8` (Accessible slate gray)
* **Typography:** Clean, technical sans-serif (Inter or Plus Jakarta Sans) paired with JetBrains Mono for code/technical tags.
* **Cards & Containers:** Smooth rounded borders (`rounded-xl` or `rounded-2xl`), subtle glassmorphic backdrop-blur, hairline borders.
* **Micro-Interactions & Animation Policy:**
  * **Allowed:** Smooth scroll transitions, subtle cards hover elevation (`translate-y-1`), image scale reveals, interactive tech pills, live counter increments.
  * **Prohibited:** Heavy particle nets, excessive neon glows, slow loading screens, distracting 3D meshes that increase bundle weight and distract from code credibility.

### 4.2 Breakpoints & Responsive Behavior
* **Desktop (1920px, 1440px, 1366px):** Full dual-column hero, multi-column project grid, interactive sticky timeline.
* **Tablet (1024px, 768px):** 2-column project cards, collapsible drawer navigation, adapted font hierarchy.
* **Mobile (430px, 390px, 375px):** Stacked hero, single-column full-width cards, accessible touch targets (min 44px), sticky bottom or hamburger header.

---

## 5. Website Information Architecture & Content Copy

### 5.1 Global Navigation
* **Desktop Header (Sticky with backdrop-blur):**
  * Left: `JAHID HASAN` `// Software Engineer`
  * Center Links: `Home`, `About`, `Expertise`, `Projects`, `Experience`, `Services`, `Contact`
  * Right Action: `[ Let's Talk ]` (High-contrast primary CTA)
* **Mobile Navigation:**
  * Hamburger trigger `☰` opening an accessible slide-over sheet with quick social links & resume download.

---

### 5.2 Section-by-Section Homepage Flow

#### Section 01 — Hero Section
* **Badge / Eyebrow:** `● Available for Enterprise & Contract Opportunities`
* **Main Heading:**
  > **Software Engineer Building Digital Solutions for Real-World Businesses.**
* **Subtitle:**
  > I design and develop modern web applications, business management systems, and automation solutions that help organizations simplify operations, improve productivity, and scale efficiently.
* **Call-to-Action Buttons:**
  * Primary CTA: `[ View My Work ]` (Scrolls to Featured Projects)
  * Secondary CTA: `[ Let's Work Together ]` (Directs to Contact Form)
* **Hero Visual:**
  * High-resolution developer portrait or stylized code/architecture visualization.
  * Floating interactive badge cards:
    * `Laravel 12`
    * `React 19`
    * `MySQL Architecture`
    * `Enterprise ERP`
    * `Sales CRM`
    * `Process Automation`

#### Section 02 — Hero Statistics
A live-incrementing metrics bar showcasing credibility:
* **`3+`** Years Experience
* **`20+`** Production Projects & Systems
* **`10+`** Enterprise Business Modules
* **`Full-Cycle`** Architecture to Production Deployment

#### Section 03 — About Section
* **Section Tag:** `ABOUT ME`
* **Heading:**
  > **Turning Ideas Into Reliable Software**
* **Body Copy:**
  > I’m Jahid Hasan, a Software Engineer passionate about building practical software solutions for businesses and organizations.
  >
  > My work focuses on developing scalable web applications, business management systems, and automation platforms. I enjoy working with complex requirements, designing efficient database structures, and turning manual business processes into simple, reliable digital workflows.
  >
  > From backend architecture and database design to frontend interfaces and cloud deployment, I focus on building software that is maintainable, secure, and ready for high-concurrency production use.
* **Core Competency Pillars (Visual Badges):**
  * Backend Development (Laravel, PHP, Service Layer)
  * Database Architecture & Query Optimization (MySQL)
  * Enterprise Business Software (ERP, CRM, HRM, Inventory)
  * Modern Frontend Development (React, Inertia, Tailwind)
  * API Design & System Integrations (REST, Webhooks)
  * Workflow Automation & Notification Pipelines
  * Server Provisioning & Production Deployment (cPanel, Linux, VPS)

#### Section 04 — Expertise & Technical Services
* **Section Tag:** `EXPERTISE`
* **Heading:** **What I Do**
* **Offerings Breakdown:**
  1. **01 — Business Software Solutions**
     * Custom software built around specific operational workflows.
     * *Coverage:* ERP, CRM, HRM, Accounting, Inventory Management, LMS, Multi-tenant Portals.
  2. **02 — Web Application Development**
     * Scalable web apps crafted with modern SPA performance and solid backend integrity.
     * *Coverage:* SaaS Applications, Custom Admin Panels, E-commerce Engines, Corporate Platforms.
  3. **03 — Automation & System Integration**
     * Connecting fragmented tools and eliminating manual human data entry.
     * *Coverage:* Facebook Lead Ads Webhooks, WhatsApp Cloud API, Lead Routing Engines, Automated Notifications, Background Job Queues.

---

### 5.3 Detailed Featured Projects & Real-World Case Studies

The portfolio features six cornerstone systems demonstrating deep business acumen:

#### Project 01: Enterprise ERP Management System
* **Category:** Enterprise Resource Planning & Business Management
* **Overview:** Centralized enterprise system uniting company-wide operations into a unified interface.
* **Core Modules:**
  * Chart of Accounts & Financial Bookkeeping
  * Human Resources & Payroll Generation
  * Multi-Warehouse Inventory & Stock Tracking
  * Employee Lifecycle & Attendance Management
  * Dynamic Financial & Operational Reporting
  * Role & Permission Matrix (Spatie RBAC)
* **Tech Stack:** Laravel, PHP, MySQL, JavaScript, Bootstrap / Tailwind, REST APIs.
* **Engineering Role:** Lead Software Engineer — architecture, database design, service layer implementation, and query tuning.
* **CTA:** `[ View Case Study → ]`

#### Project 02: CRM & Lead Distribution Automation Platform
* **Category:** Sales, Lead Management & Multi-Channel Automation
* **Overview:** A real-time sales pipeline system designed to eliminate manual lead loss and accelerate conversions.
* **Automated Pipeline Flow:**
  ```
  [ Facebook Lead Ad / Webhook ]
                │
                ▼
      [ Ingestion Service ]  <── Verification & De-duplication
                │
                ▼
     [ Lead Distribution Engine ]  <── Round-Robin / Skill-based Assign
                │
                ▼
        [ Sales Executive ]  <── WhatsApp / SMS / Email Alert
                │
                ▼
  [ Call Tracking, Visits, Quotation, Follow-ups ]
                │
                ▼
          [ Conversion ]
  ```
* **Key Features:** Lead assignment rules, sales interaction logs, WhatsApp chat integration, automated reminders, conversion analytics.
* **Tech Stack:** Laravel, MySQL, JavaScript, Webhooks, REST API.

#### Project 03: Online Quiz & Examination SaaS Platform
* **Category:** EdTech & Assessment Engine
* **Overview:** Subscription-driven online exam engine with instant automated grading and certification.
* **User Workflow:**
  ```
  Register ──> Choose Package ──> Payment Gateway ──> Package Activated
      ──> Take Scheduled Exam ──> Automated Grading ──> Dynamic PDF Certificate
  ```
* **Key Features:** Timed question pools, negative marking, instant score computation, payment gateway integration, secure certificate generation.
* **Tech Stack:** Laravel, MySQL, JavaScript, Inertia, Tailwind CSS.

#### Project 04: LMS — Learning Management System
* **Category:** Education & Course Delivery Platform
* **Overview:** Comprehensive digital academy platform for video lessons, progress tracking, and student evaluations.
* **Key Features:** Video streaming access control, lesson completion progress, instructor portals, quizzes, auto-certificates.

#### Project 05: HR Management System (HRM)
* **Category:** Human Resources & Workforce Management
* **Overview:** Streamlined employee administration system from onboarding to payroll.
* **Key Features:** Department hierarchies, biometric attendance integration, leave request workflows, salary slip generation, employee document vault.

#### Project 06: E-Commerce & Order Management Engine
* **Category:** Digital Commerce & Order Fulfillment
* **Overview:** Modern storefront backed by a robust inventory and order management system.
* **Key Features:** Product variant management, cart & checkout, payment gateway integrations, coupon system, invoice generator, real-time inventory adjustments.

---

### 5.4 Case Study Detail Page Specification

Each featured case study follows a standardized, recruiter-friendly narrative structure:
1. **Hero & Metadata:** Title, Client/Company, Role, Duration, Live URL, GitHub Repository.
2. **The Challenge / Problem Statement:** Real-world inefficiencies or business bottlenecks before the solution.
3. **The Objective:** Measurable engineering goals (speed, automation, data integrity).
4. **Architectural Blueprint:**
   * Highlighting the **Controller → Service → Model** pattern.
   * Visual Mermaid diagrams for data ingestion, webhooks, or job queues.
5. **Key Features & Implementation Details:** Concrete technical walkthroughs.
6. **Technical Challenges & How They Were Overcome:** Examples:
   * Race conditions during concurrent lead assignment solved via database row-locking (`lockForUpdate()`).
   * Large reporting exports optimized with lazy collections and chunking to prevent memory exhaustion.
7. **Business Results & Impact:** Reduction in response time, zero lost leads, automated monthly payroll.
8. **Technologies Utilized:** Interactive technology badges.

---

### 5.5 Technologies & Development Philosophy

#### Technology Inventory
* **Backend:** PHP 8.3+, Laravel 12, REST API Design, Queue Workers, Task Scheduling.
* **Frontend:** React 19, JavaScript (ES6+), Inertia.js, Tailwind CSS, HTML5, CSS3.
* **Database & Storage:** MySQL 8, Relational Database Normalization, Indexing Strategy, Query Optimization, Eloquent ORM.
* **DevOps & Tooling:** Git, GitHub, Linux, cPanel, Cloudways, VPS, Postman, Composer, Vite.
* **Architecture & Patterns:** MVC, Service Layer Pattern, Form Requests, Spatie RBAC, Middleware Guards, Single Responsibility Principle.

#### Development Workflow (The 6-Step Philosophy)
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ 01. UNDERSTAND│ ──> │  02. PLAN    │ ──> │  03. BUILD   │
│ Business Req.│     │ Architecture │     │ Clean Code   │
└──────────────┘     └──────────────┘     └──────────────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  04. TEST    │ ──> │ 05. OPTIMIZE │ ──> │  06. DEPLOY  │
│ Unit/Feature │     │ Queries/Load │     │ CI/CD & Prod │
└──────────────┘     └──────────────┘     └──────────────┘
```
* **01 — Understand:** Analyze the business pain point, user journeys, and data models before touching code.
* **02 — Plan:** Design schema, foreign key relationships, route hierarchies, and service contracts.
* **03 — Build:** Write clean, modular, PSR-12 compliant code following the Controller → Service → Model pattern.
* **04 — Test:** Write unit and feature tests (`UserControllerTest`, `RoleControllerTest`) to validate edge cases.
* **05 — Optimize:** Eliminate N+1 queries using eager loading, index foreign keys, and minimize frontend asset footprints.
* **06 — Deploy:** Deploy to production environments, configure SSL, environment secrets, caching, and maintenance routines.

---

### 5.6 Professional Experience & Education

#### Work Experience
* **Position:** Software Engineer
* **Company:** E-Learning & Earning Ltd.
* **Duration:** 2025 — Present
* **Key Responsibilities:**
  * Architect and implement core business software including ERP, CRM, and HRM modules.
  * Build automated lead ingestion pipelines connecting Facebook Lead Webhooks to internal CRM.
  * Design database structures in MySQL with indexing and query optimizations.
  * Implement role and permission access control utilizing Spatie Laravel Permission.
  * Develop REST APIs and integrate third-party services (WhatsApp Cloud API, payment gateways).
  * Manage application deployments, server environments, and database backups.

#### Education
* **Degree:** Bachelor / Diploma in Computer Science & Engineering (or relevant degree)
* **Institution:** Recognized University / Polytechnic Institute
* **Focus:** Software Engineering, Algorithms, Database Management Systems, Web Technologies.

---

### 5.7 Why Work With Me & Client Workflow

#### Value Propositions (Why Choose Me):
1. **Business-First Mindset:** Writing code to solve actual operational challenges rather than just adding features.
2. **Scalable & Maintainable Architecture:** Clean code separation that team members can extend without technical debt.
3. **Optimized Database & Performance:** High-speed response times achieved through proper query structuring and caching.
4. **End-to-End Ownership:** From initial requirement scoping to production deployment and monitoring.

#### Client Project Workflow:
`01. Requirements Gathering` → `02. Architectural Planning` → `03. UI/UX Wireframing` → `04. Agile Development` → `05. Quality Assurance & Testing` → `06. Production Deployment` → `07. Long-Term Maintenance`

---

### 5.8 Contact Section & Lead Capture
* **Heading:** **Let's Build Something Useful**
* **Description:**
  > Have a project, business idea, or software requirement? Let's discuss how I can help turn it into a reliable digital solution.
* **Channels:**
  * Email: Direct link
  * WhatsApp / Phone: Direct chat action
  * LinkedIn & GitHub: Direct profile links
* **Interactive Contact Form:**
  * Name (Required)
  * Email (Required, validated)
  * Phone / WhatsApp Number
  * Project Category: Dropdown (*Web Application, ERP System, CRM Platform, HRM Software, E-Commerce, Automation & Integration, Other*)
  * Budget Range (*<$500, $500–$1,500, $1,500–$5,000, $5,000+*)
  * Message (Required, minimum 20 characters)
* **Backend Logic:** Validated via `ContactMessageRequest`, processed via `ContactMessageService`, persisted to MySQL, and triggered via email notification / alert.

---

### 5.9 Footer & SEO Specifications

#### Footer Structure
* **Brand Column:** Jahid Hasan | Software Engineer — Building modern web applications, business software & automation solutions.
* **Quick Navigation:** Home, About, Projects, Experience, Services, Contact.
* **Social Links:** GitHub, LinkedIn, WhatsApp, Email.
* **Copyright:** `© 2026 Jahid Hasan. All rights reserved.`

#### SEO & Meta Information
* **Page Title:** `Jahid Hasan | Software Engineer | Web & Business Software Specialist`
* **Meta Description:** `Jahid Hasan is a Software Engineer specializing in Laravel, React, MySQL, business software, ERP, CRM, HRM, and web application development.`
* **Keywords:** `Jahid Hasan, Software Engineer, Laravel Developer, React Developer, ERP Developer, CRM Developer, HRM Software, Full Stack Engineer Bangladesh, Business Automation, MySQL Optimization`
* **OpenGraph / Twitter:** Dynamic social preview card with brand banner, photo, and title.

---

## 6. Administrative CMS & Content Management Panel

To ensure all portfolio data remains easily updatable without code modifications, a protected administrative portal is integrated:

### 6.1 Authentication & Security
* Built on Laravel Breeze (React + Inertia).
* Role-based access control with Spatie Permission (Admin role required).
* CSRF protection, rate-limiting on login (`throttle:6,1`), secure password hashing via Bcrypt.

### 6.2 Admin Modules
1. **Dashboard:** Key metrics: Total Projects, Total Case Studies, Skills Listed, Blog Posts, Contact Messages (Unread count), Resume Download Counter.
2. **Project Management (CRUD):**
   * Create/Edit Project, assign Category, upload multi-image galleries, toggle Featured status, rich-text markdown for Case Study problem/solution/architecture.
3. **Technology & Skills Management (CRUD):**
   * Add/Reorder technologies, assign category (*Frontend, Backend, Database, Tools*), proficiency percentage.
4. **Experience & Education Management (CRUD):**
   * Manage employment history, dates, company names, bullet points, and tech tags.
5. **Services Management (CRUD):**
   * Edit service offerings, icons, and descriptions.
6. **Blog / Articles Management (CRUD):**
   * Draft and publish technical insights, code snippets, SEO slug management.
7. **Contact Inquiries:**
   * Inbox for client inquiries, status indicators (*New, Read, Contacted*), quick email/phone actions.
8. **Settings Panel:**
   * Update resume PDF, social media URLs, contact email/phone, meta tags, and hero copy.

---

## 7. Development & Quality Assurance Standards

### 7.1 Laravel Development Rules (Mandatory)
* **Controller → Service → Model:** Controllers contain zero business logic and zero direct database queries.
* **No Repository Pattern:** Direct Service classes encapsulating business logic.
* **Eloquent ORM Exclusively:** Never use `DB::table()` or raw SQL.
* **Form Request Validation:** All validations reside in `App\Http\Requests`.
* **Testing Standards:**
  * Feature and Unit tests covering all primary endpoints and services.
  * Test naming convention strictly matches controllers:
    * `UserController` → `UserControllerTest`
    * `ProjectController` → `ProjectControllerTest`
    * `ContactController` → `ContactControllerTest`
* **Seeders:** Standard naming convention:
  * `UserSeeder`, `RoleSeeder`, `PermissionSeeder`, `RolePermissionSeeder`, `ProjectSeeder`.

### 7.2 Directory Structure
```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Admin/
│   │   │   ├── DashboardController.php
│   │   │   ├── ProjectController.php
│   │   │   ├── ExperienceController.php
│   │   │   └── SettingController.php
│   │   ├── Public/
│   │   │   ├── HomeController.php
│   │   │   ├── ProjectController.php
│   │   │   ├── CaseStudyController.php
│   │   │   └── ContactController.php
│   ├── Requests/
│   │   ├── ContactMessageRequest.php
│   │   ├── ProjectStoreRequest.php
│   │   └── ProjectUpdateRequest.php
│   └── Resources/
│       ├── ProjectResource.php
│       └── CaseStudyResource.php
├── Models/
│   ├── Project.php
│   ├── ProjectCategory.php
│   ├── Technology.php
│   ├── Experience.php
│   ├── ContactMessage.php
│   └── SiteSetting.php
└── Services/
    ├── ProjectService.php
    ├── ContactService.php
    ├── ExperienceService.php
    └── SettingService.php

resources/js/
├── Components/
│   ├── UI/            (Buttons, Badges, Modals, Cards)
│   ├── Layout/        (Navbar, Footer, AdminSidebar)
│   └── Sections/      (Hero, Stats, About, Expertise, Projects, Workflow)
├── Layouts/
│   ├── AppLayout.jsx  (Public layout with Sticky Nav & Footer)
│   └── AdminLayout.jsx(Authenticated CMS layout)
├── Pages/
│   ├── Public/
│   │   ├── Home.jsx
│   │   ├── Projects/
│   │   │   ├── Index.jsx
│   │   │   └── Show.jsx (Detailed Case Study)
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   └── Contact.jsx
│   └── Admin/
│       ├── Dashboard.jsx
│       ├── Projects/
│       └── Messages/
└── app.jsx
```

---

## 8. Summary & Next Steps

This unified document serves as the single source of truth for both technical development and strategic branding. It seamlessly integrates:
1. The **Full Stack Developer SRS** (Architecture, Admin Panel, Database Schema, Security, Folder Structure).
2. The **High-Impact Software Engineer Positioning & Real-World Content** (ERP, CRM, HRM, Quiz, LMS case studies, Facebook webhook workflows, and high-converting copy).

### Recommended Implementation Roadmap:
* **Step 1:** Run database migrations and seeders for Projects, Categories, Technologies, and User Roles.
* **Step 2:** Implement Service classes (`ProjectService`, `ContactService`, `SettingService`) and Form Requests.
* **Step 3:** Build public React 19 + Inertia components utilizing the dark modern design system.
* **Step 4:** Build the interactive Case Study templates with architectural diagrams and workflows.
* **Step 5:** Finalize the Admin CMS for seamless content updates, resume uploads, and message management.