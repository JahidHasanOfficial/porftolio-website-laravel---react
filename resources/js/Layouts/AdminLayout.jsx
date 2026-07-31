import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { 
    LayoutDashboard, FolderCode, Wrench, Briefcase, GraduationCap, 
    Cpu, Award, MessageSquare, FileText, Mail, Settings, FileDown, 
    LogOut, Menu, X, Sun, Moon, User, Bell, ChevronDown
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children, title }) {
    const { auth, flash, settings } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

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

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
        { name: 'Projects', href: route('admin.projects.index'), icon: FolderCode },
        { name: 'Skills', href: route('admin.skills.index'), icon: Wrench },
        { name: 'Experience', href: route('admin.experiences.index'), icon: Briefcase },
        { name: 'Education', href: route('admin.education.index'), icon: GraduationCap },
        { name: 'Services', href: route('admin.services.index'), icon: Cpu },
        { name: 'Certificates', href: route('admin.certificates.index'), icon: Award },
        { name: 'Blogs', href: route('admin.blogs.index'), icon: FileText },
        { name: 'Testimonials', href: route('admin.testimonials.index'), icon: MessageSquare },
        { name: 'Messages', href: route('admin.messages.index'), icon: Mail, badge: auth?.unread_messages_count },
        { name: 'Settings', href: route('admin.settings.index'), icon: Settings },
        { name: 'Profile', href: route('profile.edit'), icon: User },
    ];

    const currentUrl = usePage().url;
    const developerName = settings?.name || 'Jahid Hasan';

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans flex transition-colors duration-300">
            <Toaster position="top-right" reverseOrder={false} />

            {/* Sidebar Desktop */}
            <aside 
                className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-[#1a2336] bg-[#0b0f19] text-slate-400 transition-transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
            >
                <div className="h-full flex flex-col justify-between py-5 px-4">
                    <div className="space-y-6">
                        {/* Branding */}
                        <div className="flex items-center justify-between px-2">
                            <Link href={route('dashboard')} className="flex items-center space-x-2.5">
                                <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                                    JH
                                </div>
                                <div className="text-left">
                                    <h4 className="font-extrabold text-sm text-white tracking-tight leading-none">{developerName}</h4>
                                    <p className="text-[10px] text-slate-500 mt-1 leading-none">Admin Panel</p>
                                </div>
                            </Link>
                            <button 
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-1 text-slate-400 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="space-y-1.5 overflow-y-auto max-h-[70vh] pr-1">
                            {navigation.map((item) => {
                                const IconComponent = item.icon;
                                const isActive = currentUrl.startsWith(new URL(item.href, window.location.origin).pathname);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                            isActive
                                                ? 'bg-indigo-650 text-white shadow-lg shadow-indigo-600/10'
                                                : 'text-slate-400 hover:bg-[#161d2d] hover:text-white'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <IconComponent className="h-4.5 w-4.5 flex-shrink-0" />
                                            <span>{item.name}</span>
                                        </div>
                                        {item.badge > 0 && (
                                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                            
                            {/* Logout Action inside List */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-950/20 hover:text-red-400 transition-all w-full text-left"
                            >
                                <LogOut className="h-4.5 w-4.5 flex-shrink-0" />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </div>

                    {/* Bottom Utility links */}
                    <div className="pt-4 border-t border-[#1a2336]">
                        <Link
                            href={route('home')}
                            className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-indigo-400 transition-colors w-full"
                        >
                            <Sun className="h-4 w-4" />
                            <span>View Public Site</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Layout Wrapper */}
            <div className={`flex-1 flex flex-col ${sidebarOpen ? 'lg:pl-64' : 'pl-0'} transition-all duration-300`}>
                {/* Topbar */}
                <header className="sticky top-0 z-30 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-850"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <h2 className="hidden sm:block text-lg font-bold tracking-tight text-slate-850 dark:text-slate-200">
                            {title || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-605 dark:text-slate-300 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
                        </button>

                        {/* Notifications Bell */}
                        <div className="relative">
                            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                                <Bell className="h-4.5 w-4.5" />
                                {auth?.unread_messages_count > 0 && (
                                    <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border border-white dark:border-slate-900 animate-pulse" />
                                )}
                            </button>
                        </div>

                        {/* User Profile dropdown info */}
                        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
                            <img 
                                src="/assets/avatar.png" 
                                alt="Admin Avatar" 
                                className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-800 shadow-sm" 
                            />
                            <div className="hidden md:block text-left">
                                <h5 className="text-sm font-bold text-slate-850 dark:text-slate-200 leading-none">
                                    {auth?.user?.name || 'Jahid Hasan'}
                                </h5>
                                <p className="text-[10px] text-slate-400 mt-1 leading-none font-medium">
                                    Administrator
                                </p>
                            </div>
                            <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
                        </div>
                    </div>
                </header>

                {/* Dashboard Main Content */}
                <main className="flex-grow p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
