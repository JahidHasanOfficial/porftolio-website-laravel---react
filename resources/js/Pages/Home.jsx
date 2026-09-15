import React, { useState, useEffect, useMemo } from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Cpu, Code2, ArrowRight, Download, Mail, Phone, MapPin, 
    Send, ShieldCheck, ShoppingCart, Wrench, ExternalLink,
    ChevronRight, Star, Atom, Layers, Palette, Terminal, Link2, 
    Database, GitBranch, Box, Binary, Server, Cloud, 
    TerminalSquare, Globe, Briefcase, Award, CheckCircle2, 
    Zap, Workflow, Users, FileText, ArrowUpRight, BarChart3, 
    Clock, Sparkles, Check, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom GitHub Icon SVG
const GithubIcon = (props) => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

// Dynamic Typing Effect Hook
function useTypingEffect(words, typingSpeed = 90, deletingSpeed = 45, delayBetween = 1800) {
    const [wordIndex, setWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!words || words.length === 0) return;
        const currentWord = words[wordIndex % words.length] || '';
        let timer;

        if (isDeleting) {
            timer = setTimeout(() => {
                setCurrentText(prev => prev.slice(0, -1));
            }, deletingSpeed);
        } else {
            timer = setTimeout(() => {
                setCurrentText(prev => currentWord.slice(0, prev.length + 1));
            }, typingSpeed);
        }

        if (!isDeleting && currentText === currentWord) {
            timer = setTimeout(() => setIsDeleting(true), delayBetween);
        } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setWordIndex(prev => (prev + 1) % words.length);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, wordIndex, words]);

    return currentText;
}

export default function Home({ skills, experiences, services, featuredProjects, testimonials, latestBlogs, resume }) {
    const { settings } = usePage().props;
    const [selectedProjectCategory, setSelectedProjectCategory] = useState('all');

    // Memoize typing animation terms
    const typingWords = useMemo(() => {
        if (settings?.typing_titles) {
            try {
                const parsed = typeof settings.typing_titles === 'string' ? JSON.parse(settings.typing_titles) : settings.typing_titles;
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            } catch (e) {
                console.error('Typing titles parse error', e);
            }
        }
        return [
            'Software Engineer3',
            'Enterprise ERP Builder',
            'Sales CRM & Automation Specialist',
            'Laravel & React Specialist',
            'Database & System Architect'
        ];
    }, [settings?.typing_titles]);

    const typedTitle = useTypingEffect(typingWords);

    // Contact Form with Inertia
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        project_type: 'Enterprise ERP',
        budget: '$1,500 - $5,000',
        subject: '',
        message: '',
        website_url: '', // honeypot
    });

    const submitContact = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    // Filter projects for display
    const filteredProjects = useMemo(() => {
        if (!featuredProjects) return [];
        if (selectedProjectCategory === 'all') return featuredProjects;
        return featuredProjects.filter(p => p.category?.toLowerCase() === selectedProjectCategory.toLowerCase());
    }, [featuredProjects, selectedProjectCategory]);

    return (
        <AppLayout>
            {/* =========================================================================
                SECTION 01: HERO SECTION
               ========================================================================= */}
            <section className="relative pt-12 sm:pt-16 md:pt-20 lg:pt-28 pb-16 md:pb-24 lg:pb-32 overflow-hidden">
                {/* Ambient glow backgrounds */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-emerald-500/15 blur-[130px] -z-10 pointer-events-none rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        {/* Left Column: Positioning & Call to Actions */}
                        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                            {/* Live Status Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-md">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                                <span className="h-2 w-2 rounded-full bg-emerald-500 -ml-3"></span>
                                <span className="text-cyan-600 dark:text-cyan-400 font-mono font-semibold">Available for Hiresss</span>
                                <span className="text-slate-300 dark:text-slate-600">|</span>
                                <span>Software Engineer & Business Systems</span>
                            </div>

                            {/* Main Hero Heading */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.12]">
                                Software Engineer Building <br className="hidden sm:inline" />
                                <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 dark:from-cyan-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
                                    Digital Solutions
                                </span> <br className="hidden sm:inline" />
                                for Real-World Businesses.
                            </h1>

                            {/* Animated Sub-Heading Role */}
                            <div className="h-8 flex items-center justify-center lg:justify-start gap-2 font-mono text-lg text-slate-600 dark:text-slate-400">
                                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{'>'}</span>
                                <span className="text-slate-900 dark:text-slate-200 font-medium">{typedTitle}</span>
                                <span className="inline-block w-2 h-5 bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span>
                            </div>

                            {/* Professional Description */}
                            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                {settings?.hero_description || 'I design and develop modern web applications, business management systems and automation solutions that help organizations simplify operations, improve productivity and scale efficiently.'}
                            </p>

                            {/* Primary Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                                <a
                                    href="#featured-projects"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all cursor-pointer"
                                >
                                    View My Work
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                                <a
                                    href="#contact"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl shadow-xs transition-all cursor-pointer"
                                >
                                    Let's Work Together
                                </a>
                            </div>

                            {/* Trust badges */}
                            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-mono text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                                    <span>Controller-Service-Model</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                                    <span>Spatie RBAC Protected</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                                    <span>Zero Raw SQL • Eloquent Only</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Interactive Technology Display */}
                        <div className="lg:col-span-5 relative flex justify-center items-center">
                            <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl backdrop-blur-xl">
                                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4 mb-5">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
                                        <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                                        <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500">production_architecture.php</span>
                                </div>

                                {/* Code Snippet Simulation */}
                                <div className="space-y-2 font-mono text-xs text-slate-800 dark:text-slate-300 leading-relaxed bg-slate-100 dark:bg-slate-950/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800/60">
                                    <p className="text-slate-400 dark:text-slate-500">// Enterprise Service Architecture</p>
                                    <p>
                                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">class</span> <span className="text-emerald-600 dark:text-emerald-400 font-semibold">LeadDistributionService</span>
                                    </p>
                                    <p className="pl-4">
                                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">public function</span> <span className="text-amber-600 dark:text-amber-300">processWebhook</span>(<span className="text-indigo-600 dark:text-indigo-300">$payload</span>)
                                    </p>
                                    <p className="pl-8 text-slate-600 dark:text-slate-400">
                                        $lead = $this-{'>'}<span className="text-indigo-600 dark:text-indigo-400">ingest</span>($payload);<br />
                                        $agent = $this-{'>'}<span className="text-indigo-600 dark:text-indigo-400">routeRoundRobin</span>($lead);<br />
                                        $this-{'>'}<span className="text-indigo-600 dark:text-indigo-400">notifyWhatsApp</span>($agent, $lead);<br />
                                        <span className="text-rose-600 dark:text-rose-400 font-bold">return</span> $lead;
                                    </p>
                                </div>

                                {/* Technology Pill Badges */}
                                <div className="mt-5 grid grid-cols-2 gap-2.5 pt-2">
                                    {[
                                        { label: 'Laravel 12', color: 'border-rose-500/30 text-rose-600 dark:text-rose-300 bg-rose-500/10' },
                                        { label: 'React 19 & Inertia', color: 'border-cyan-500/30 text-cyan-600 dark:text-cyan-300 bg-cyan-500/10' },
                                        { label: 'MySQL Architecture', color: 'border-amber-500/30 text-amber-600 dark:text-amber-300 bg-amber-500/10' },
                                        { label: 'Enterprise ERP', color: 'border-indigo-500/30 text-indigo-600 dark:text-indigo-300 bg-indigo-500/10' },
                                        { label: 'Sales CRM & Webhooks', color: 'border-emerald-500/30 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10' },
                                        { label: 'Workflow Automation', color: 'border-violet-500/30 text-violet-600 dark:text-violet-300 bg-violet-500/10' },
                                    ].map((badge, idx) => (
                                        <div
                                            key={idx}
                                            className={`px-3 py-2 rounded-xl text-xs font-mono font-medium border flex items-center justify-between ${badge.color}`}
                                        >
                                            <span>{badge.label}</span>
                                            <Check className="h-3 w-3 opacity-70" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 02: HERO STATISTICS
               ========================================================================= */}
            <section className="py-10 border-y border-slate-200 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-900/40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
                        <div className="pt-4 md:pt-0">
                            <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-300 bg-clip-text text-transparent">
                                3+
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                                Years Experience
                            </p>
                        </div>
                        <div className="pt-4 md:pt-0">
                            <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                                20+
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                                Projects & Systems
                            </p>
                        </div>
                        <div className="pt-4 md:pt-0">
                            <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-300 bg-clip-text text-transparent">
                                10+
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                                Business Modules
                            </p>
                        </div>
                        <div className="pt-4 md:pt-0">
                            <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight bg-gradient-to-r from-amber-600 to-rose-600 dark:from-amber-400 dark:to-rose-300 bg-clip-text text-transparent">
                                Full-Cycle
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                                Dev & Deployment
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 03: ABOUT SECTION
               ========================================================================= */}
            <section id="about" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                                ABOUT JAHID HASAN
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                                Turning Ideas Into <br />
                                <span className="text-cyan-600 dark:text-cyan-400">Reliable Software</span>
                            </h2>

                            <p className="text-slate-800 dark:text-slate-300 text-base leading-relaxed">
                                I’m Jahid Hasan, a Software Engineer passionate about building practical software solutions for businesses and organizations.
                            </p>

                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                My work focuses on developing scalable web applications, business management systems and automation platforms. I enjoy working with complex requirements, designing efficient database structures and turning business processes into simple, reliable digital workflows.
                            </p>

                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                From backend architecture and database design to frontend interfaces and deployment, I focus on building software that is maintainable, secure and ready for real-world production use.
                            </p>

                            {/* Resume & Career CTAs */}
                            <div className="pt-2 flex flex-wrap items-center gap-4">
                                <a
                                    href={route('resume.download')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 transition-all"
                                >
                                    <Download className="h-4 w-4" />
                                    Download Resume
                                </a>
                                <Link
                                    href={route('about')}
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                >
                                    Full Career Journey <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Key Areas */}
                        <div className="lg:col-span-5">
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                                <h3 className="text-sm font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-3">
                                    Core Competency Pillars
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { title: 'Backend Development', desc: 'Controller-Service-Model, Form Requests, PHP 8.3 & Laravel 12', icon: Terminal },
                                        { title: 'Database Architecture', desc: 'MySQL design, indexing, foreign keys & query optimization', icon: Database },
                                        { title: 'Business Software', desc: 'Custom ERP, CRM, HRM, Inventory & Accounting platforms', icon: Briefcase },
                                        { title: 'Frontend Interfaces', desc: 'React 19, Inertia.js, Tailwind CSS & seamless SPAs', icon: Atom },
                                        { title: 'API & Integration', desc: 'REST APIs, Facebook Lead Webhooks, WhatsApp Cloud API', icon: Link2 },
                                        { title: 'System Automation', desc: 'Automated lead distribution, scheduled cron jobs & alerts', icon: Workflow },
                                        { title: 'Server & Deployment', desc: 'Linux CLI, cPanel, Cloudways, VPS & Git CI/CD pipelines', icon: Server },
                                    ].map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shrink-0">
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 04: EXPERTISE SECTION
               ========================================================================= */}
            <section id="expertise" className="py-24 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                            WHAT I DO
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                            Specialized Engineering Capabilities
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base">
                            Structured around three core disciplines designed to solve operational business challenges and drive revenue growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 01 Business Software */}
                        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-sm dark:shadow-lg group">
                            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
                                01
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                Business Software
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                                Custom software solutions designed around specific business workflows and operational requirements.
                            </p>
                            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-5">
                                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Systems Engineered:</span>
                                <div className="flex flex-wrap gap-2">
                                    {['ERP', 'CRM', 'HRM', 'Accounting', 'Inventory', 'LMS', 'Management Portals'].map((tag, i) => (
                                        <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 02 Web Application Development */}
                        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-sm dark:shadow-lg group">
                            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
                                02
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                Web Applications
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                                Modern and responsive web applications built with clean architecture, fast page loads, and scalable technologies.
                            </p>
                            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-5">
                                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Platforms Built:</span>
                                <div className="flex flex-wrap gap-2">
                                    {['SaaS Applications', 'Admin Panels', 'Customer Portals', 'E-commerce Platforms', 'Corporate Web Apps'].map((tag, i) => (
                                        <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 03 Automation & Integration */}
                        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-sm dark:shadow-lg group">
                            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
                                03
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                Automation & Integration
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                                Connecting systems and automating repetitive business processes to reduce human error and speed up response times.
                            </p>
                            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-5">
                                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Integrations:</span>
                                <div className="flex flex-wrap gap-2">
                                    {['Facebook Lead Ads', 'WhatsApp Cloud API', 'Lead Distribution', 'Automated Alerts', 'Payment Gateways'].map((tag, i) => (
                                        <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 05: FEATURED PROJECTS (Selected Work)
               ========================================================================= */}
            <section id="featured-projects" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                                SELECTED WORK
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                                Featured Systems & Applications
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
                                A selection of production systems and applications I've engineered to solve real-world business and operational challenges.
                            </p>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap gap-2">
                            {['all', 'ERP', 'CRM', 'LMS', 'HRM', 'E-Commerce'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedProjectCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                                        selectedProjectCategory === cat
                                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="flex flex-col rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 overflow-hidden shadow-sm dark:shadow-lg transition-all hover:-translate-y-1.5 group"
                            >
                                {/* Project Card Visual */}
                                <div className="relative h-52 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 overflow-hidden">
                                    {project.thumbnail ? (
                                        <>
                                            <img 
                                                src={project.thumbnail} 
                                                alt={project.name}
                                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center p-6 relative">
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-slate-950 via-slate-100/40 dark:via-slate-950/40 to-transparent z-10 pointer-events-none" />
                                            <div className="z-20 text-center space-y-2">
                                                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shadow-xs">
                                                    <Code2 className="h-6 w-6" />
                                                </div>
                                                <div className="text-xs font-mono font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-widest">
                                                    {project.category}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Category Status Pill */}
                                    <div className="absolute top-3 left-3 z-20">
                                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm">
                                            {project.status || 'Production'}
                                        </span>
                                    </div>

                                    {/* Category Badge on Top Right */}
                                    <div className="absolute top-3 right-3 z-20">
                                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-cyan-500/90 text-slate-950 shadow-sm backdrop-blur-md">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Project Card Body */}
                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">
                                            {project.description || project.overview}
                                        </p>
                                    </div>

                                    {/* Tech Stack Pills */}
                                    <div className="space-y-3 pt-2">
                                        <div className="flex flex-wrap gap-1.5">
                                            {Array.isArray(project.technology_stack) && project.technology_stack.slice(0, 4).map((tech, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50">
                                                    {tech}
                                                </span>
                                            ))}
                                            {Array.isArray(project.technology_stack) && project.technology_stack.length > 4 && (
                                                <span className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500">
                                                    +{project.technology_stack.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        {/* Case Study Action Button */}
                                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                            <Link
                                                href={route('projects.show', project.slug)}
                                                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
                                            >
                                                View Case Study →
                                            </Link>
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                                    title="GitHub Repository"
                                                >
                                                    <GithubIcon className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href={route('projects.index')}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white shadow-xs transition-colors"
                        >
                            Browse All Architecture & Case Studies
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 06: SYSTEM ARCHITECTURE BLUEPRINT
               ========================================================================= */}
            <section className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-5 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                                SYSTEM ARCHITECTURE
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                                How I Structure Enterprise Systems
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                Every business platform I develop follows strict architectural boundaries. Controllers never execute business logic or database queries; instead, requests flow through Form Request validation into dedicated Service classes and Eloquent models.
                            </p>
                            <div className="pt-2 space-y-2.5 text-xs font-mono text-slate-700 dark:text-slate-300">
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Atomic database transactions prevent race conditions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Asynchronous queue workers handle burst webhooks</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Composite database indexing guarantees fast reporting</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Workflow Diagram */}
                        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 shadow-lg dark:shadow-2xl font-mono text-xs">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                                <span>Multi-Channel Lead Automation Pipeline</span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">LIVE FLOW</span>
                            </div>

                            <div className="space-y-3 text-slate-700 dark:text-slate-300">
                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <span>01. Facebook Lead Ad Trigger / API Webhook</span>
                                    </div>
                                    <span className="text-slate-400 dark:text-slate-500 font-sans text-[11px]">Instant Payload</span>
                                </div>

                                <div className="text-center text-cyan-600 dark:text-cyan-400">↓</div>

                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                                        <span>02. Lead Ingestion Service (Verification & De-duplication)</span>
                                    </div>
                                    <span className="text-slate-400 dark:text-slate-500 font-sans text-[11px]">Sub-second</span>
                                </div>

                                <div className="text-center text-cyan-600 dark:text-cyan-400">↓</div>

                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                        <span>03. Intelligent Lead Distribution Engine (Round-Robin)</span>
                                    </div>
                                    <span className="text-slate-400 dark:text-slate-500 font-sans text-[11px]">Automated</span>
                                </div>

                                <div className="text-center text-cyan-600 dark:text-cyan-400">↓</div>

                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                        <span>04. Salesperson Notification (WhatsApp / SMS / Portal)</span>
                                    </div>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-sans text-[11px]">{'<'}60s Response</span>
                                </div>

                                <div className="text-center text-cyan-600 dark:text-cyan-400">↓</div>

                                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-gradient-to-r dark:from-emerald-950/40 dark:to-cyan-950/40 border border-emerald-500/30 flex items-center justify-between text-emerald-800 dark:text-emerald-300 font-semibold">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span>05. Call Log, Quotation & Deal Conversion</span>
                                    </div>
                                    <span>High Conversion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 07: TECHNOLOGIES I WORK WITH
               ========================================================================= */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                            TECH STACK
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                            Technologies I Work With
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base">
                            Curated, modern, and production-tested technologies chosen for reliability, security, and performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Backend */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-semibold uppercase tracking-wider">
                                <Terminal className="h-4 w-4" />
                                <span>Backend</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['PHP 8.3+', 'Laravel 12', 'REST APIs', 'Queue Workers', 'Task Scheduler', 'Authentication'].map((t, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Frontend */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-sm font-semibold uppercase tracking-wider">
                                <Atom className="h-4 w-4" />
                                <span>Frontend</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['React 19', 'Inertia.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'Bootstrap', 'Framer Motion'].map((t, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Database */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-sm font-semibold uppercase tracking-wider">
                                <Database className="h-4 w-4" />
                                <span>Database</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['MySQL 8.0+', 'Database Normalization', 'Indexing Strategy', 'Query Optimization', 'Eloquent ORM'].map((t, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tools & Standards */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold uppercase tracking-wider">
                                <Server className="h-4 w-4" />
                                <span>Tools & Standards</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Git & GitHub', 'Linux CLI', 'cPanel / VPS', 'Cloudways', 'Spatie RBAC', 'Postman'].map((t, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 08: DEVELOPMENT PHILOSOPHY
               ========================================================================= */}
            <section className="py-24 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                            DEVELOPMENT PHILOSOPHY
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                            How I Build Software
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base">
                            A structured, disciplined engineering methodology to ensure applications are scalable, maintainable, and bug-free.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                        {[
                            { num: '01', title: 'Understand', desc: 'Deeply understand the business problem, target users, and operational workflow before writing code.' },
                            { num: '02', title: 'Plan', desc: 'Design normalized database tables, foreign keys, service boundaries, and feature flows.' },
                            { num: '03', title: 'Build', desc: 'Develop using Controller-Service-Model architecture with clean, maintainable, and scalable standards.' },
                            { num: '04', title: 'Test', desc: 'Write automated feature and unit tests to validate validation, transactions, and edge cases.' },
                            { num: '05', title: 'Optimize', desc: 'Eliminate N+1 queries, add composite indexes, and optimize response times for smooth UX.' },
                            { num: '06', title: 'Deploy', desc: 'Deploy to production VPS or hosting with SSL, queue workers, backups, and monitoring.' },
                        ].map((step, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 shadow-xs transition-colors">
                                <div>
                                    <span className="text-2xl font-mono font-black text-cyan-600 dark:text-cyan-400/80 block mb-2">{step.num}</span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 09: PROFESSIONAL EXPERIENCE
               ========================================================================= */}
            <section id="experience" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl space-y-4 mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                            CAREER TIMELINE
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                            Professional Experience
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base">
                            Hands-on software engineering delivering high-stakes business systems in active corporate environments.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {experiences && experiences.map((exp, idx) => (
                            <div
                                key={exp.id || idx}
                                className="p-8 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm dark:shadow-lg"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{exp.position}</h3>
                                            {exp.is_current && (
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                                                    Present
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-cyan-600 dark:text-cyan-400 font-mono text-sm mt-1">{exp.company} • {exp.location}</p>
                                    </div>
                                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                        {exp.start_date} — {exp.end_date || 'Present'}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">Core Responsibilities & Deliverables:</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                                        {typeof exp.responsibilities === 'string'
                                            ? exp.responsibilities.split('\n').filter(Boolean).map((r, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-cyan-600 dark:text-cyan-400 mt-1">▹</span>
                                                    <span>{r}</span>
                                                </li>
                                            ))
                                            : null}
                                    </ul>

                                    {exp.achievements && (
                                        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Key Achievement: </span>
                                            {exp.achievements}
                                        </div>
                                    )}

                                    {Array.isArray(exp.technologies) && (
                                        <div className="pt-2 flex flex-wrap gap-2">
                                            {exp.technologies.map((t, i) => (
                                                <span key={i} className="px-2.5 py-1 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 10: SERVICES
               ========================================================================= */}
            <section id="services" className="py-24 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                            SERVICES FOR BUSINESSES
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                            Software Solutions for Growing Businesses
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base">
                            Transforming complex requirements into scalable, reliable digital workflows for startups and enterprises.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services && services.map((srv, idx) => (
                            <div
                                key={srv.id || idx}
                                className="p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-sm dark:shadow-lg group"
                            >
                                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Code2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                    {srv.name}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    {srv.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 11: CLIENT WORKFLOW
               ========================================================================= */}
            <section className="py-20 border-t border-slate-200 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block mb-2">ENGAGEMENT PROCESS</span>
                        <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">From Idea to Production</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center font-mono">
                        {[
                            { step: '01', title: 'Requirement' },
                            { step: '02', title: 'Planning' },
                            { step: '03', title: 'UI/UX' },
                            { step: '04', title: 'Development' },
                            { step: '05', title: 'Testing' },
                            { step: '06', title: 'Deployment' },
                            { step: '07', title: 'Support' },
                        ].map((s, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-xs">
                                <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm block mb-1">{s.step}</span>
                                <span className="text-xs text-slate-800 dark:text-slate-200 font-semibold">{s.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 12: WHY WORK WITH ME
               ========================================================================= */}
            <section className="py-24 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                            WHY CHOOSE ME
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                            Business-First Engineering Standards
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base">
                            Why clients, engineering managers, and teams trust my software development approach.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { title: 'Business-Focused', desc: 'I focus on solving the actual operational business problem, not just writing syntax.' },
                            { title: 'Scalable Architecture', desc: 'Systems are structured to remain maintainable, clean, and extensible as your company grows.' },
                            { title: 'Clean Development', desc: 'Strict Controller-Service-Model architecture with Form Requests and PSR-12 standard compliance.' },
                            { title: 'Performance First', desc: 'Database indexes, eager loading, and asset minification are engineered from day one.' },
                            { title: 'Long-Term Support', desc: 'Software doesn’t end at deployment. I provide reliable maintenance and feature evolution.' },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                                    <Check className="h-4 w-4" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 13: TESTIMONIALS
               ========================================================================= */}
            {testimonials && testimonials.length > 0 && (
                <section className="py-24 border-t border-slate-200 dark:border-slate-800/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">ENDORSEMENTS</span>
                            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">What Colleagues & Clients Say</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {testimonials.map((t, idx) => (
                                <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                                    <div className="flex gap-1 text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 text-sm italic leading-relaxed">
                                        "{t.feedback}"
                                    </p>
                                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                                        <p className="font-bold text-slate-900 dark:text-white">{t.client_name}</p>
                                        <p className="text-slate-500 dark:text-slate-400">{t.company}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* =========================================================================
                SECTION 14: GITHUB REPOSITORIES
               ========================================================================= */}
            <section className="py-16 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                        <div className="space-y-2 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                                <GithubIcon className="h-4 w-4" />
                                <span>OPEN SOURCE & CODE REPOSITORIES</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Explore My Work on GitHub</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
                                Check out live codebase examples, Laravel packages, and full-stack software architecture implementations on my GitHub profile.
                            </p>
                        </div>
                        <a
                            href={settings?.github_url || 'https://github.com/JahidHasanOfficial'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all shrink-0 cursor-pointer"
                        >
                            Visit GitHub Profile
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                SECTION 15: CONTACT SECTION
               ========================================================================= */}
            <section id="contact" className="py-24 border-t border-slate-200 dark:border-slate-800/80 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                                GET IN TOUCH
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                                Let's Build Something Useful
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                Have a project, business idea or software requirement? Let's discuss how I can help turn it into a reliable digital solution.
                            </p>

                            <div className="space-y-4 pt-4">
                                {settings?.email && (
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">Email Directly</p>
                                            <a href={`mailto:${settings.email}`} className="text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium">
                                                {settings.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {settings?.phone && (
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">Phone / WhatsApp</p>
                                            <span className="text-slate-900 dark:text-white font-medium">{settings.phone}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">Location</p>
                                        <span className="text-slate-900 dark:text-white font-medium">{settings?.address || 'Dhaka, Bangladesh'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Project Inquiry Form */}
                        <div className="lg:col-span-7">
                            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Send Project Inquiry</h3>

                                {recentlySuccessful && (
                                    <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                                        <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
                                    </div>
                                )}

                                <form onSubmit={submitContact} className="space-y-4">
                                    {/* Honeypot field */}
                                    <input
                                        type="text"
                                        name="website_url"
                                        value={data.website_url}
                                        onChange={(e) => setData('website_url', e.target.value)}
                                        className="hidden"
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1">Your Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g. John Doe"
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                                            />
                                            {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1">Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="john@company.com"
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                                            />
                                            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1">Phone / WhatsApp</label>
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="+880 1..."
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1">Project Type</label>
                                            <select
                                                value={data.project_type}
                                                onChange={(e) => setData('project_type', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                                            >
                                                <option value="Enterprise ERP">Enterprise ERP</option>
                                                <option value="Sales CRM">Sales CRM</option>
                                                <option value="HRM System">HRM System</option>
                                                <option value="Web Application">Web Application</option>
                                                <option value="E-commerce Platform">E-commerce Platform</option>
                                                <option value="Automation & Webhooks">Automation & Webhooks</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1">Estimated Budget</label>
                                            <select
                                                value={data.budget}
                                                onChange={(e) => setData('budget', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                                            >
                                                <option value="< $500">&lt; $500</option>
                                                <option value="$500 - $1,500">$500 - $1,500</option>
                                                <option value="$1,500 - $5,000">$1,500 - $5,000</option>
                                                <option value="$5,000+">$5,000+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1">Project Details & Requirements *</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Describe your operational workflow, core features needed, or timeline requirements..."
                                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                                        />
                                        {errors.message && <p className="text-rose-500 text-xs mt-1">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 disabled:opacity-60 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
                                    >
                                        {processing ? 'Sending...' : 'Send Message'}
                                        <Send className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
