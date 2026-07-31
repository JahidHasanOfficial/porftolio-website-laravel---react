import React, { useState, useEffect } from 'react';
import { router, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';

export default function Index({ blogs, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route('blogs.index'),
                { search, category },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search, category]);

    const categories = [
        { label: 'All Articles', value: '' },
        { label: 'Laravel', value: 'Laravel' },
        { label: 'React', value: 'React' },
        { label: 'PHP', value: 'PHP' },
        { label: 'JavaScript', value: 'JavaScript' },
        { label: 'MySQL', value: 'MySQL' },
        { label: 'Career Tips', value: 'Career' },
        { label: 'Deployment', value: 'Deployment' }
    ];

    return (
        <AppLayout>
            {/* Header banner */}
            <section className="bg-slate-100 dark:bg-slate-900/40 py-16 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">Technical Blog</h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
                        Sharing insights, best practices, backend optimization guides, and full-stack development tutorials.
                    </p>
                </div>
            </section>

            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Search input */}
                <div className="flex justify-center">
                    <div className="relative w-full max-w-lg">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                            <Search className="h-5 w-5" />
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by keywords or title..."
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-650 text-sm shadow-sm transition-all"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setCategory(cat.value)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                                category === cat.value
                                    ? 'bg-indigo-650 border-indigo-700 text-white shadow-md shadow-indigo-600/10'
                                    : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-850'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Blogs list */}
                {blogs.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.data.map((blog) => (
                            <div 
                                key={blog.id}
                                className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-lg transition-all"
                            >
                                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
                                            <span>{blog.category}</span>
                                            <span className="text-slate-400 dark:text-slate-550 font-normal">
                                                {new Date(blog.publish_date).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                                            {blog.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                            {blog.content}
                                        </p>
                                    </div>
                                    <Link 
                                        href={route('blogs.show', blog.slug)}
                                        className="inline-flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline gap-1.5 pt-4"
                                    >
                                        Read Article <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-100/50 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">No articles match the selected category/keyword.</p>
                    </div>
                )}

                {/* Pagination */}
                {blogs.links.length > 3 && (
                    <div className="flex justify-center pt-8">
                        <nav className="flex space-x-1">
                            {blogs.links.map((link, idx) => {
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
