import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Sun, Moon, Mail, ExternalLink, ArrowRight, Code2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppLayout({ children }) {
    const { settings, flash, url, auth } = usePage().props;
    
    // Initialize theme from document or localStorage, default to dark
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark';
        }
        return 'dark';
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Apply theme changes to <html> class and localStorage
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                style: {
                    background: theme === 'dark' ? '#161E2E' : '#ffffff',
                    color: theme === 'dark' ? '#F9FAFB' : '#0F172A',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
                }
            });
        }
        if (flash?.error) {
            toast.error(flash.error, {
                style: {
                    background: theme === 'dark' ? '#161E2E' : '#ffffff',
                    color: theme === 'dark' ? '#F9FAFB' : '#0F172A',
                    border: theme === 'dark' ? '1px solid rgba(239,68,68,0.3)' : '1px solid #FCA5A5',
                }
            });
        }
    }, [flash, theme]);

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        const root = document.documentElement;
        if (nextTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', nextTheme);
    };

    const navigation = [
        { name: 'Home', href: route('home') },
        { name: 'About', href: route('about') },
        { name: 'Expertise', href: route('home') + '#expertise' },
        { name: 'Projects', href: route('projects.index') },
        { name: 'Experience', href: route('home') + '#experience' },
        { name: 'Services', href: route('home') + '#services' },
        { name: 'Contact', href: route('home') + '#contact' },
    ];

    const getSocialIcon = (key) => {
        switch (key) {
            case 'github_url': return (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
            );
            case 'linkedin_url': return (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            );
            case 'twitter_url': return (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
            );
            case 'facebook_url': return (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            );
            default: return null;
        }
    };

    const developerName = settings?.name || 'Jahid Hasan';
    const developerTitle = settings?.designation || 'Software Engineer';

    return (
        <div className="min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-600 dark:selection:text-cyan-300">
            <Toaster position="top-right" reverseOrder={false} />
            
            {/* Header / Sticky Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                    {/* Brand Identity */}
                    <Link href={route('home')} className="flex items-center gap-3 group">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                            <Code2 className="h-5 w-5 text-slate-950" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-lg tracking-wider text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors uppercase">
                                {developerName}
                            </span>
                            <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400/90 tracking-widest uppercase">
                                // {developerTitle}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-7">
                        {navigation.map((item) => {
                            const isCurrent = url === new URL(item.href, window.location.origin).pathname;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative text-sm font-medium transition-colors hover:text-cyan-600 dark:hover:text-cyan-400 ${
                                        isCurrent 
                                            ? 'text-cyan-600 dark:text-cyan-400 font-semibold' 
                                            : 'text-slate-600 dark:text-slate-300'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Utility Buttons & Let's Talk CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer"
                            aria-label="Toggle Theme"
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-4 w-4 text-amber-400" />
                            ) : (
                                <Moon className="h-4 w-4 text-slate-700" />
                            )}
                        </button>
                        
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
                            >
                                CMS Panel
                            </Link>
                        ) : (
                            <Link
                                href={route('home') + '#contact'}
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all"
                            >
                                Let's Talk
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger Menu Button */}
                    <div className="flex items-center space-x-2 lg:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 mr-1 cursor-pointer"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label="Toggle Mobile Menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl overflow-hidden sticky top-18 z-40"
                    >
                        <div className="px-4 py-6 space-y-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-900">
                                <Link
                                    href={route('home') + '#contact'}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full text-center px-4 py-3 text-base font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl shadow-lg shadow-cyan-500/20"
                                >
                                    Let's Talk
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Global Footer */}
            <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/60">
                        {/* Brand Column */}
                        <div className="md:col-span-5 space-y-4">
                            <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md shadow-cyan-500/20">
                                    <Code2 className="h-5 w-5 text-slate-950" />
                                </div>
                                <span className="font-extrabold text-xl tracking-wider text-slate-900 dark:text-white uppercase">
                                    {developerName}
                                </span>
                            </div>
                            <p className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">
                                {developerTitle}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
                                {settings?.tagline || 'Building modern web applications, business software & automation solutions.'}
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                                    Available for Enterprise Projects
                                </span>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="md:col-span-3 space-y-3">
                            <h4 className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                Quick Navigation
                            </h4>
                            <ul className="space-y-2.5 text-sm">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social & Contact Channels */}
                        <div className="md:col-span-4 space-y-4">
                            <h4 className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                Connect & Inquire
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Have an upcoming software project, ERP module, or lead automation requirement?
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {['github_url', 'linkedin_url', 'twitter_url', 'facebook_url'].map((key) => {
                                    const link = settings?.[key];
                                    if (!link) return null;
                                    return (
                                        <a
                                            key={key}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-200 dark:hover:bg-slate-900 transition-all hover:-translate-y-0.5"
                                        >
                                            {getSocialIcon(key)}
                                        </a>
                                    );
                                })}
                                {settings?.email && (
                                    <a
                                        href={`mailto:${settings.email}`}
                                        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-200 dark:hover:bg-slate-900 transition-all hover:-translate-y-0.5"
                                        title="Email Directly"
                                    >
                                        <Mail className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                            {settings?.email && (
                                <p className="text-xs text-slate-500 font-mono">
                                    Direct: <a href={`mailto:${settings.email}`} className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 underline">{settings.email}</a>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                        <p>© 2026 {developerName}. All rights reserved.</p>
                        <div className="flex items-center space-x-6 font-mono text-[11px]">
                            <span>Laravel 12 • React 19 • MySQL</span>
                            <Link href={route('login')} className="text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 transition-colors">
                                Admin CMS <ExternalLink className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
