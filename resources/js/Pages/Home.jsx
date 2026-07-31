import React, { useState, useEffect } from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Cpu, Code2, ArrowRight, Download, Mail, Phone, MapPin, 
    Send, ShieldCheck, ShoppingCart, Wrench, ExternalLink,
    ChevronRight, Star, Atom, Layers, Palette, Terminal, Link2, 
    Database, GitBranch, Box, Binary, Server, Cloud, 
    TerminalSquare, Globe, Briefcase, Award, GraduationCap, Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom inline SVG GitHub icon to bypass missing lucide-react Github export
const GithubIconCustom = (props) => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

// Icon mapping helper for rendering skill icons dynamically
const iconMap = {
    Atom: Atom,
    Code2: Code2,
    Html5: Globe,
    Layers: Layers,
    Palette: Palette,
    Cpu: Cpu,
    Terminal: Terminal,
    Link2: Link2,
    Database: Database,
    GitBranch: GitBranch,
    Github: GithubIconCustom,
    Box: Box,
    Send: Send,
    Binary: Binary,
    Server: Server,
    Cloud: Cloud,
    TerminalSquare: TerminalSquare,
};

// Skill tier helper (maps numeric percentages to professional levels)
const getSkillTier = (percentage) => {
    if (percentage >= 95) return 'Expert';
    if (percentage >= 85) return 'Advanced';
    if (percentage >= 70) return 'Proficient';
    return 'Intermediate';
};

// Custom typing effect hook
function useTypingEffect(words, typingSpeed = 100, deletingSpeed = 50, delayBetween = 1500) {
    const [wordIndex, setWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Reset state if words array contents change to prevent index out of bounds
    const wordsString = JSON.stringify(words);
    useEffect(() => {
        setWordIndex(0);
        setCurrentText('');
        setIsDeleting(false);
    }, [wordsString]);

    useEffect(() => {
        if (!words || words.length === 0) return;
        
        // Clamp and fallback index
        const safeIndex = wordIndex >= words.length ? 0 : wordIndex;
        const currentWord = words[safeIndex] || '';
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
            setWordIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, wordIndex, wordsString]);

    return currentText;
}

export default function Home({ skills, experiences, services, featuredProjects, testimonials, latestBlogs, resume }) {
    const { settings } = usePage().props;
    const [activeCategory, setActiveCategory] = useState('all');

    // Load and memoize typing animation words safely
    const typingWords = React.useMemo(() => {
        let words = ['Laravel Expert', 'React Developer', 'Full Stack Engineer'];
        if (settings?.typing_titles) {
            try {
                if (typeof settings.typing_titles === 'string') {
                    words = JSON.parse(settings.typing_titles);
                } else if (Array.isArray(settings.typing_titles)) {
                    words = settings.typing_titles;
                }
            } catch (e) {
                console.error('Failed to parse typing_titles:', e);
            }
        }
        return words;
    }, [settings?.typing_titles]);

    const typedText = useTypingEffect(typingWords);

    // Contact form using Inertia useForm helper
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website_url: '', // Honeypot spam check
    });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => {
                reset();
            }
        });
    };

    // Group skills by category
    const skillCategories = {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        tools: 'Tools & DevOps',
        deployment: 'Deployment',
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        const cat = skill.category || 'tools';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    const developerName = settings?.name || 'Jahid Hasan';
    const developerDesignation = settings?.designation || 'Full Stack Developer';

    return (
        <AppLayout>
            {/* 1. HERO SECTION */}
            <section className="relative overflow-hidden pt-24 pb-32 md:pt-36 md:pb-44">
                {/* Background grids */}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80"></div>
                
                {/* Glowing gradients */}
                <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-500/20 dark:bg-indigo-600/15 opacity-50 blur-[120px]"></div>
                <div className="absolute top-20 right-1/4 -z-10 h-96 w-96 rounded-full bg-violet-500/20 dark:bg-violet-600/15 opacity-50 blur-[120px]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        {/* Text Col */}
                        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-50/85 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/50 shadow-sm"
                            >
                                <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-450 animate-pulse"></span>
                                Available for Freelance & Full-time Roles
                            </motion.span>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
                                Hi, I am <span className="bg-gradient-to-r from-indigo-600 to-violet-650 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">{developerName}</span>
                                <br />
                                <span className="inline-block mt-3 min-h-[55px] text-slate-800 dark:text-slate-100 font-bold">
                                    I build <span className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-500/30">{typedText}</span>
                                    <span className="animate-pulse font-normal">|</span>
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                {settings?.short_intro || 'Experienced Full Stack developer specializing in enterprise apps.'}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Link
                                    href={route('projects.index')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-500/10 hover:shadow-indigo-600/30 hover:-translate-y-0.5 transition-all duration-300 gap-2 cursor-pointer"
                                >
                                    View Projects <ArrowRight className="h-4.5 w-4.5" />
                                </Link>

                                <a
                                    href={route('resume.download')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-base font-semibold rounded-xl text-slate-700 dark:text-slate-250 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-850 hover:-translate-y-0.5 transition-all duration-300 gap-2 cursor-pointer"
                                >
                                    Download Resume <Download className="h-4.5 w-4.5" />
                                </a>
                            </div>
                        </div>

                        {/* Image Col */}
                        <div className="lg:col-span-5 flex justify-center relative">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-[400px] md:w-[400px] flex items-center justify-center"
                            >
                                {/* Glow behind */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 blur-2xl"></div>
                                {/* Double animated rings */}
                                <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/30 dark:border-indigo-400/20 animate-spin-[20s] duration-1000"></div>
                                <div className="absolute inset-4 rounded-full border border-violet-500/20 dark:border-violet-400/10 animate-spin-reverse-[15s]"></div>
                                {/* Core avatar container */}
                                <div className="relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 rounded-full border-4 border-white dark:border-slate-900 shadow-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 bg-gradient-to-tr from-indigo-50/50 to-violet-50/50 dark:from-slate-900 dark:to-slate-850">
                                    <img 
                                        src="/assets/avatar.png" 
                                        alt={developerName} 
                                        className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Floating Badges */}
                                <motion.div 
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-4 -left-4 p-3 rounded-2xl bg-white/85 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-2"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <Cpu className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Backend</p>
                                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Laravel Expert</p>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-4 -right-4 p-3 rounded-2xl bg-white/85 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-2"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-violet-50 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400">
                                        <Atom className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Frontend</p>
                                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">React Dev</p>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    animate={{ x: [0, 8, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute top-1/2 -right-8 p-2.5 rounded-2xl bg-white/85 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-2"
                                >
                                    <div className="h-7 w-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-450">
                                        <Briefcase className="h-4 w-4" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{settings?.years_of_experience || '5'}+ Yrs Exp</p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT SUMMARY SECTION */}
            <section className="py-24 border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-3 mb-16">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">About Me</span>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Biography & Professional Journey</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Summary details */}
                        <div className="lg:col-span-7 space-y-6">
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                {settings?.biography || 'I am a passionate software developer.'}
                            </p>
                            <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed border-l-2 border-indigo-500/70 pl-4 italic">
                                {settings?.professional_summary || 'Highly driven code specialist.'}
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 shadow-sm flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                                        <Award className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Years of Experience</h5>
                                        <p className="text-xl font-extrabold text-slate-850 dark:text-slate-200 mt-1">{settings?.years_of_experience || '5'}+ Years</p>
                                    </div>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 shadow-sm flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/50 text-violet-650 dark:text-violet-400">
                                        <Briefcase className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Current Position</h5>
                                        <p className="text-sm font-extrabold text-slate-850 dark:text-slate-200 mt-1.5">{settings?.current_position || 'Senior Engineer'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Facts */}
                        <div className="lg:col-span-5">
                            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-7 space-y-6 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-sm shadow-md">
                                <h3 className="font-extrabold text-lg text-slate-850 dark:text-slate-100 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> Quick Specs
                                </h3>
                                <ul className="space-y-4 text-sm">
                                    <li className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800/80">
                                        <span className="text-slate-500 dark:text-slate-350 font-bold">Location:</span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200">{settings?.address || 'Dhaka, Bangladesh'}</span>
                                    </li>
                                    <li className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800/80">
                                        <span className="text-slate-500 dark:text-slate-350 font-bold">Email:</span>
                                        <span className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">{settings?.email || 'jahid@example.com'}</span>
                                    </li>
                                    <li className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800/80">
                                        <span className="text-slate-500 dark:text-slate-350 font-bold">Education:</span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200">B.Sc. in CSE</span>
                                    </li>
                                </ul>
                                <Link
                                    href={route('about')}
                                    className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-755 dark:text-indigo-400 dark:hover:text-indigo-300 gap-1.5 transition-colors"
                                >
                                    Read career story <ChevronRight className="h-4.5 w-4.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SKILLS SECTION */}
            <section className="py-24 border-t border-slate-200 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-950/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-3 mb-16">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Core Expertise</span>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Technical Skills</h2>
                    </div>

                    {/* Skill Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-5 py-2 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer ${
                                activeCategory === 'all'
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                    : 'bg-white dark:bg-slate-900 border-slate-250 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-350 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            All Skills
                        </button>
                        {Object.entries(skillCategories).map(([key, label]) => {
                            const hasSkills = groupedSkills[key] && groupedSkills[key].length > 0;
                            if (!hasSkills) return null;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveCategory(key)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer ${
                                        activeCategory === key
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                            : 'bg-white dark:bg-slate-900 border-slate-250 dark:border-slate-800 text-slate-650 dark:text-slate-300 hover:border-slate-350 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <AnimatePresence mode="popLayout">
                            {(activeCategory === 'all' 
                                ? skills 
                                : skills.filter(skill => skill.category === activeCategory)
                            ).map((skill) => {
                                const IconComponent = iconMap[skill.icon] || Code2;
                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.25 }}
                                        key={skill.id}
                                        className="p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all duration-300 flex flex-col justify-between group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                                <IconComponent className="h-5 w-5" />
                                            </div>
                                            <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400">
                                                {skillCategories[skill.category] || skill.category}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-base text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                                                {skill.name}
                                            </h4>
                                            <div className="flex items-center gap-1.5 mt-2">
                                                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-bold">
                                                    {skill.years_of_experience} Yrs
                                                </span>
                                                <span className="text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">
                                                    {getSkillTier(skill.percentage)}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* 4. SERVICES SECTION */}
            <section className="py-24 border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-3 mb-16">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Offerings</span>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Services Provided</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => {
                            const ServiceIcon = iconMap[service.icon] || Cpu;
                            return (
                                <div 
                                    key={service.id}
                                    className="group p-7 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-400/20 transition-all duration-300"
                                >
                                    <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-650 dark:bg-indigo-950/50 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <ServiceIcon className="h-5.5 w-5.5" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{service.name}</h3>
                                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. FEATURED PROJECTS SECTION */}
            <section className="py-24 border-t border-slate-200 dark:border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
                        <div className="space-y-2 text-center sm:text-left">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Showcase</span>
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Featured Projects</h2>
                        </div>
                        <Link 
                            href={route('projects.index')}
                            className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 gap-1.5 transition-colors"
                        >
                            View all projects <ArrowRight className="h-4.5 w-4.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project) => (
                            <div 
                                key={project.id}
                                className="group flex flex-col rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
                            >
                                <div className="relative aspect-video bg-slate-100 dark:bg-slate-950 overflow-hidden">
                                    {project.thumbnail ? (
                                        <img 
                                            src={project.thumbnail} 
                                            alt={project.name} 
                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">
                                            <span>No Thumbnail Available</span>
                                        </div>
                                    )}
                                    <span className="absolute top-3 left-3 bg-indigo-600/90 text-white text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-lg shadow-md backdrop-blur-sm border border-white/10">
                                        {project.category}
                                    </span>
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div className="space-y-3.5">
                                        <h3 className="font-bold text-lg text-slate-850 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-350 line-clamp-2 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {project.technology_stack?.slice(0, 4).map((tech, idx) => (
                                                <span key={idx} className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300 border border-slate-200/40 dark:border-slate-700/30 px-2 py-0.5 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold">
                                        <Link 
                                            href={route('projects.show', project.slug)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline"
                                        >
                                            View Details
                                        </Link>
                                        <div className="flex space-x-3.5">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                                    GitHub
                                                </a>
                                            )}
                                            {project.live_demo && (
                                                <a href={project.live_demo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. TIMELINE EXPERIENCE */}
            <section className="py-24 border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-3 mb-16">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Milestones</span>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Professional History</h2>
                    </div>

                    <div className="relative border-l border-slate-200 dark:border-slate-800 max-w-3xl mx-auto space-y-12 pl-8">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="relative">
                                {/* Pulsate Dot indicator */}
                                <div className="absolute -left-[42px] top-1.5 h-5 w-5 rounded-full border-4 border-white dark:border-slate-950 bg-indigo-600 dark:bg-indigo-500 shadow-md ring-4 ring-indigo-500/20" />
                                
                                <div className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 shadow-sm hover:shadow-md transition-all space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-lg">
                                            {new Date(exp.start_date).getFullYear()} - {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                        </span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5" /> {exp.location}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-extrabold text-slate-850 dark:text-slate-100">{exp.position}</h3>
                                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{exp.company}</p>
                                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed pt-1">
                                        {exp.responsibilities}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {exp.technologies?.map((tech, idx) => (
                                            <span key={idx} className="text-xs font-bold bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-350 px-2.5 py-0.5 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. TESTIMONIALS */}
            {testimonials.length > 0 && (
                <section className="py-24 border-t border-slate-200 dark:border-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center space-y-3 mb-16">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Reviews</span>
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Client Testimonials</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {testimonials.map((test) => (
                                <div 
                                    key={test.id}
                                    className="p-7 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/30 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-indigo-500/25 transition-all duration-300"
                                >
                                    <div className="absolute top-6 right-6 text-indigo-100 dark:text-indigo-950/20 group-hover:text-indigo-200 dark:group-hover:text-indigo-950/30 transition-colors duration-300 pointer-events-none">
                                        <Quote className="h-16 w-16 transform rotate-180" />
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        <div className="flex text-amber-500 space-x-0.5">
                                            {[...Array(test.rating)].map((_, i) => (
                                                <Star key={i} className="h-4.5 w-4.5 fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-sm sm:text-base text-slate-650 dark:text-slate-300 italic leading-relaxed font-medium">
                                            "{test.feedback}"
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3.5 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 relative z-10">
                                        <div className="h-10 w-10 rounded-full bg-indigo-500 text-white dark:bg-indigo-950 flex items-center justify-center text-indigo-650 dark:text-indigo-400 font-bold text-sm">
                                            {test.client_name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-850 dark:text-slate-200">{test.client_name}</h4>
                                            <p className="text-xs text-slate-500">{test.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8. LATEST BLOGS */}
            {latestBlogs.length > 0 && (
                <section className="py-24 border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
                            <div className="space-y-2 text-center sm:text-left">
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Articles</span>
                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Latest Blogs</h2>
                            </div>
                            <Link 
                                href={route('blogs.index')}
                                className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 gap-1.5 transition-colors"
                            >
                                Read all articles <ArrowRight className="h-4.5 w-4.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {latestBlogs.map((blog) => (
                                <div 
                                    key={blog.id}
                                    className="group flex flex-col rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
                                        <div className="space-y-3">
                                            <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded">
                                                {blog.category}
                                            </span>
                                            <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                                {blog.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-300 line-clamp-3 leading-relaxed">
                                                {blog.content.substring(0, 150)}...
                                            </p>
                                        </div>
                                        <Link 
                                            href={route('blogs.show', blog.slug)}
                                            className="inline-flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline gap-1 pt-4"
                                        >
                                            Read More <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 9. CONTACT CTA SECTION */}
            <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="space-y-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Get in touch</span>
                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Let's craft your next software product.</h2>
                                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                    Have a freelancing contract, position open, or project proposal? Send a message and let's coordinate!
                                </p>
                            </div>

                            <div className="space-y-4 text-sm sm:text-base">
                                {settings?.email && (
                                    <div className="flex items-center space-x-3.5">
                                        <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Email Address</p>
                                            <a href={`mailto:${settings.email}`} className="font-semibold hover:underline text-slate-800 dark:text-slate-200">
                                                {settings.email}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {settings?.phone && (
                                    <div className="flex items-center space-x-3.5">
                                        <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Phone Connection</p>
                                            <a href={`tel:${settings.phone}`} className="font-semibold hover:underline text-slate-800 dark:text-slate-200">
                                                {settings.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center space-x-3.5">
                                    <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Location Base</p>
                                        <p className="font-semibold text-slate-850 dark:text-slate-200">
                                            {settings?.address || 'Dhaka, Bangladesh'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7">
                            <form 
                                onSubmit={handleContactSubmit}
                                className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5"
                            >
                                <h3 className="font-bold text-xl text-slate-900 dark:text-white">Send Contact Message</h3>
                                
                                {/* Honeypot - hidden fields */}
                                <input 
                                    type="text" 
                                    name="website_url" 
                                    value={data.website_url} 
                                    onChange={(e) => setData('website_url', e.target.value)} 
                                    className="hidden" 
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="name" className="text-sm font-semibold text-slate-600 dark:text-slate-300">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-600 text-sm sm:text-base"
                                            placeholder="Enter your name"
                                            required
                                        />
                                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-sm font-semibold text-slate-600 dark:text-slate-300">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-600 text-sm sm:text-base"
                                            placeholder="you@example.com"
                                            required
                                        />
                                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="phone" className="text-sm font-semibold text-slate-600 dark:text-slate-300">Phone (Optional)</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-600 text-sm sm:text-base"
                                            placeholder="+880..."
                                        />
                                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="subject" className="text-sm font-semibold text-slate-600 dark:text-slate-300">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-600 text-sm sm:text-base"
                                            placeholder="What's this about?"
                                            required
                                        />
                                        {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="text-sm font-semibold text-slate-600 dark:text-slate-300">Your Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-600 text-sm sm:text-base"
                                        placeholder="Type your message details here..."
                                        required
                                    />
                                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {processing ? 'Sending...' : 'Send Message'}
                                    <Send className="h-4.5 w-4.5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
