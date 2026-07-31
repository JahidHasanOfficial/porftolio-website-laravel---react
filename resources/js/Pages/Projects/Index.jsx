import React, { useState, useEffect } from 'react';
import { router, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Search, SlidersHorizontal, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ projects, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [sort, setSort] = useState(filters.sort || 'newest');

    // Debounced request to update results on search, category or sort changes
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route('projects.index'),
                { search, category, sort },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search, category, sort]);

    const categories = [
        { label: 'All Projects', value: '' },
        { label: 'ERP Systems', value: 'ERP' },
        { label: 'CRM Portals', value: 'CRM' },
        { label: 'HRM Systems', value: 'HRM' },
        { label: 'POS Systems', value: 'POS' },
        { label: 'Inventory Systems', value: 'Inventory' },
        { label: 'LMS Portals', value: 'LMS' },
        { label: 'E-Commerce', value: 'E-Commerce' },
        { label: 'REST APIs', value: 'API' },
        { label: 'Portfolios', value: 'Portfolio' }
    ];

    const sortOptions = [
        { label: 'Newest First', value: 'newest' },
        { label: 'Oldest First', value: 'oldest' },
        { label: 'Featured First', value: 'featured' },
        { label: 'Alphabetical', value: 'alphabetical' }
    ];

    return (
        <AppLayout>
            {/* Header banner */}
            <section className="bg-slate-100 dark:bg-slate-900/40 py-16 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">Software Projects</h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
                        Explore enterprise ERPs, retail POS managers, LMS courses, API architectures, and client applications.
                    </p>
                </div>
            </section>

            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Search & Filter bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Input */}
                    <div className="relative w-full md:max-w-md">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                            <Search className="h-5 w-5" />
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, technology, or details..."
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650 text-sm shadow-sm transition-all"
                        />
                    </div>

                    {/* Sorting dropdown */}
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                        <SlidersHorizontal className="h-4.5 w-4.5 text-slate-400 flex-shrink-0" />
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full md:w-auto px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-650 text-sm shadow-sm transition-all cursor-pointer"
                        >
                            {sortOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setCategory(cat.value)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                                category === cat.value
                                    ? 'bg-indigo-600 border-indigo-650 text-white shadow-md shadow-indigo-600/20'
                                    : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-850'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {projects.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.data.map((project) => (
                            <div 
                                key={project.id}
                                className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-lg transition-all"
                            >
                                <div className="relative aspect-video bg-slate-100 dark:bg-slate-950 overflow-hidden">
                                    {project.thumbnail ? (
                                        <img 
                                            src={project.thumbnail} 
                                            alt={project.name} 
                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-550"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">
                                            <span>No Image Provided</span>
                                        </div>
                                    )}
                                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md">
                                        {project.category}
                                    </span>
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {project.technology_stack?.map((tech, idx) => (
                                                <span key={idx} className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-450 px-2 py-0.5 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                                        <Link 
                                            href={route('projects.show', project.slug)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5"
                                        >
                                            View Details <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                        <div className="flex space-x-3">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-450 hover:text-slate-900 dark:hover:text-slate-200">
                                                    GitHub
                                                </a>
                                            )}
                                            {project.live_demo && (
                                                <a href={project.live_demo} target="_blank" rel="noopener noreferrer" className="text-slate-450 hover:text-slate-900 dark:hover:text-slate-200">
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-100/50 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">No projects match the filter parameters.</p>
                    </div>
                )}

                {/* Pagination */}
                {projects.links.length > 3 && (
                    <div className="flex justify-center pt-8">
                        <nav className="flex space-x-1">
                            {projects.links.map((link, idx) => {
                                return (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                                            link.active
                                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                                                : link.url
                                                ? 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-850'
                                                : 'text-slate-350 dark:text-slate-650 cursor-not-allowed border border-slate-100 dark:border-slate-900'
                                        }`}
                                    />
                                );
                            })}
                        </nav>
                    </div>
                )}
            </section>
        </AppLayout>
    );
}
