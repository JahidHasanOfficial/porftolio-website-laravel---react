import React, { useState, useEffect } from 'react';
usePage;
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Sun, Moon, Mail, ExternalLink } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppLayout({ children }) {
    const { settings, flash, url, auth } = usePage().props;
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                style: {
                    background: theme === 'dark' ? '#1e293b' : '#ffffff',
                    color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                }
            });
        }
        if (flash?.error) {
            toast.error(flash.error, {
                style: {
                    background: theme === 'dark' ? '#1e293b' : '#ffffff',
                    color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                }
            });
        }
    }, [flash, theme]);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const navigation = [
        { name: 'Home', href: route('home') },
        { name: 'About', href: route('about') },
        { name: 'Projects', href: route('projects.index') },
        { name: 'Blog', href: route('blogs.index') },
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
    const developerDesignation = settings?.designation || 'Full Stack Developer';

    return (
        <div className="min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans">
            <Toaster position="top-right" reverseOrder={false} />
            
            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo/Branding */}
                    <Link href={route('home')} className="flex items-center space-x-2">
                        {settings?.logo ? (
                            <img src={settings.logo} alt="Logo" className="h-8 w-8 object-contain rounded-lg" />
                        ) : (
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                                {developerName.split(' ').map(n => n[0]).join('')}
                            </div>
                        )}
                        <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                            {developerName}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => {
                            const isActive = url === new URL(item.href, window.location.origin).pathname;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                                        isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'
                                    }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeNav"
                                            className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right utility buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-750 dark:bg-violet-550 dark:hover:bg-violet-650 rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('about') + '#contact'}
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all"
                                >
                                    Hire Me
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center space-x-2 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 mr-1"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
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
                        className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navigation.map((item) => {
                                const isActive = url === new URL(item.href, window.location.origin).pathname;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                            isActive 
                                                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' 
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full text-center px-4 py-2.5 text-base font-semibold text-white bg-indigo-600 rounded-md shadow-md"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="space-y-2 pt-2">
                                    <Link
                                        href={route('login')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full text-center px-4 py-2.5 text-base font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 rounded-md"
                                    >
                                        Admin Login
                                    </Link>
                                    <Link
                                        href={route('about') + '#contact'}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full text-center px-4 py-2.5 text-base font-medium text-white bg-indigo-600 rounded-md shadow-md"
                                    >
                                        Hire Me
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={url}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Branding */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                {developerName}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                            {settings?.short_intro || 'High-performance and secure software architectures crafted with modern stacks.'}
                        </p>
                    </div>

                    {/* Middle Column: Quick Links */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            {settings?.email && (
                                <li>
                                    <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400">
                                        <Mail className="h-4 w-4" /> {settings.email}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Right Column: Social Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Social Channels</h4>
                        <div className="flex space-x-4">
                            {['github_url', 'linkedin_url', 'twitter_url', 'facebook_url'].map((key) => {
                                const url = settings?.[key];
                                if (!url) return null;
                                return (
                                    <a
                                        key={key}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-600 hover:border-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:border-indigo-400 transition-all hover:-translate-y-1"
                                    >
                                        {getSocialIcon(key)}
                                    </a>
                                );
                            })}
                        </div>
                        <div className="pt-2">
                            {settings?.email && (
                                <p className="text-xs text-slate-400 dark:text-slate-500">
                                    Available for freelance & full-time opportunities.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 dark:text-slate-500 gap-4">
                    <p>&copy; {new Date().getFullYear()} {developerName}. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href={route('login')} className="hover:underline flex items-center gap-1">
                            Admin Login <ExternalLink className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
