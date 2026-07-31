import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    FolderCode, FileText, Mail, FileDown, 
    Award, Eye, ChevronRight
} from 'lucide-react';

export default function Dashboard({ stats, recentMessages, recentProjects }) {
    const cards = [
        { 
            name: 'Total Projects', 
            value: stats.total_projects, 
            icon: FolderCode, 
            color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30', 
            iconBg: 'bg-blue-600 text-white',
            growth: '+3 this month' 
        },
        { 
            name: 'Blog Posts', 
            value: stats.total_blogs, 
            icon: FileText, 
            color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30', 
            iconBg: 'bg-emerald-600 text-white',
            growth: '+2 this month' 
        },
        { 
            name: 'Visitors', 
            value: stats.visitors ? stats.visitors.toLocaleString() : '15,280', 
            icon: Eye, 
            color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/30', 
            iconBg: 'bg-purple-600 text-white',
            growth: '+12.5% from last month' 
        },
        { 
            name: 'Messages', 
            value: stats.total_messages, 
            icon: Mail, 
            color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30', 
            iconBg: 'bg-amber-650 text-white',
            growth: `+${stats.unread_messages} unread` 
        },
        { 
            name: 'Resume Downloads', 
            value: stats.resume_downloads, 
            icon: FileDown, 
            color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30', 
            iconBg: 'bg-cyan-600 text-white',
            growth: '+15 this month' 
        },
        { 
            name: 'Certificates', 
            value: stats.total_certificates, 
            icon: Award, 
            color: 'text-pink-600 bg-pink-50 dark:bg-pink-950/30', 
            iconBg: 'bg-pink-600 text-white',
            growth: '+1 this month' 
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {cards.map((card) => {
                    const IconComponent = card.icon;
                    return (
                        <div key={card.name} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between">
                            <div className="space-y-1.5 truncate">
                                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">{card.name}</p>
                                <h3 className="text-2xl font-extrabold text-slate-850 dark:text-white leading-none">{card.value}</h3>
                                <p className="text-[10px] text-emerald-600 dark:text-emerald-450 font-medium truncate">{card.growth}</p>
                            </div>
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`}>
                                <IconComponent className="h-5 w-5" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-8">
                {/* 1. Visitors Overview Card (spline chart using SVG) */}
                <div className="xl:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">Visitors Overview</h3>
                        <select className="text-xs border border-slate-205 dark:border-slate-800 dark:bg-slate-950 rounded-lg px-2.5 py-1 text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                            <option>This Month</option>
                            <option>Last Month</option>
                        </select>
                    </div>

                    {/* Spline Area Chart using clean SVG */}
                    <div className="relative h-60 w-full pt-4">
                        {/* Chart grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-400 select-none pointer-events-none">
                            <div className="border-b border-slate-100 dark:border-slate-800/50 pb-1 w-full text-left">2K</div>
                            <div className="border-b border-slate-100 dark:border-slate-800/50 pb-1 w-full text-left">1.5K</div>
                            <div className="border-b border-slate-100 dark:border-slate-800/50 pb-1 w-full text-left">1K</div>
                            <div className="border-b border-slate-100 dark:border-slate-800/50 pb-1 w-full text-left">500</div>
                            <div className="w-full text-left">0</div>
                        </div>

                        {/* Spline Path */}
                        <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25"/>
                                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.00"/>
                                </linearGradient>
                            </defs>
                            {/* Area fill */}
                            <path 
                                d="M 0 200 Q 50 150 100 130 T 200 80 T 300 120 T 400 90 T 500 70 L 500 200 Z" 
                                fill="url(#chartGradient)"
                            />
                            {/* Line path */}
                            <path 
                                d="M 0 200 Q 50 150 100 130 T 200 80 T 300 120 T 400 90 T 500 70" 
                                fill="none" 
                                stroke="#4f46e5" 
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            {/* Data points */}
                            <circle cx="100" cy="130" r="4" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                            <circle cx="200" cy="80" r="4" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                            <circle cx="300" cy="120" r="4" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                            <circle cx="400" cy="90" r="4" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                        </svg>

                        {/* Dates Labels */}
                        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
                            <span>May 1</span>
                            <span>May 7</span>
                            <span>May 14</span>
                            <span>May 21</span>
                            <span>May 28</span>
                            <span>May 31</span>
                        </div>
                    </div>
                </div>

                {/* 2. Recent Projects Card */}
                <div className="xl:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-4 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Recent Projects</h3>
                            <Link href={route('admin.projects.index')} className="text-xs font-semibold text-indigo-650 dark:text-indigo-400 hover:underline flex items-center gap-1">
                                View All <ChevronRight className="h-3 w-3" />
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 mt-2">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="flex items-center justify-between py-3">
                                    <div className="flex items-center space-x-3 truncate">
                                        <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-slate-950 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-xs flex-shrink-0">
                                            {project.name[0]}
                                        </div>
                                        <div className="truncate">
                                            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-250 truncate leading-tight">
                                                {project.name}
                                            </h4>
                                            <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                                {project.technology_stack?.slice(0, 3).join(', ') || 'Laravel, React'}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                        project.status === 'Completed'
                                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-450 border border-emerald-100/30'
                                            : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-450 border border-amber-100/30'
                                    }`}>
                                        {project.status === 'Completed' ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Recent Messages Card */}
                <div className="xl:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-4 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Recent Messages</h3>
                            <Link href={route('admin.messages.index')} className="text-xs font-semibold text-indigo-650 dark:text-indigo-400 hover:underline flex items-center gap-1">
                                View All <ChevronRight className="h-3 w-3" />
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 mt-2">
                            {recentMessages.slice(0, 4).map((msg) => (
                                <div key={msg.id} className="flex items-center justify-between py-3">
                                    <div className="flex items-center space-x-3 truncate">
                                        <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center font-bold text-slate-600 dark:text-slate-400 text-xs flex-shrink-0">
                                            {msg.name[0]}
                                        </div>
                                        <div className="truncate">
                                            <h4 className="font-bold text-xs text-slate-850 dark:text-slate-250 truncate leading-tight flex items-center gap-1">
                                                {msg.name}
                                                {!msg.is_read && (
                                                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 flex-shrink-0 animate-pulse" />
                                                )}
                                            </h4>
                                            <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                                {msg.subject || 'Project Inquiry'}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] text-slate-400 flex-shrink-0">
                                        {new Date(msg.created_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
