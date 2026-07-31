import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';

export default function Show({ blog, relatedBlogs }) {
    const { settings } = usePage().props;

    const formattedDate = new Date(blog.publish_date || blog.created_at).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const developerName = settings?.name || 'Jahid Hasan';

    return (
        <AppLayout>
            <Head>
                <title>{blog.seo_title || `${blog.title} - ${developerName}`}</title>
                {blog.seo_description && <meta name="description" content={blog.seo_description} />}
                {blog.seo_keywords && <meta name="keywords" content={blog.seo_keywords} />}
                {/* Open Graph / Social */}
                <meta property="og:title" content={blog.seo_title || blog.title} />
                <meta property="og:description" content={blog.seo_description || 'Technical blog post'} />
                <meta property="og:type" content="article" />
                <meta name="twitter:title" content={blog.seo_title || blog.title} />
                <meta name="twitter:description" content={blog.seo_description || 'Technical blog post'} />
            </Head>

            {/* Banner Header */}
            <section className="bg-slate-100 dark:bg-slate-900/40 py-12 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
                    <Link 
                        href={route('blogs.index')}
                        className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-indigo-650 dark:hover:text-indigo-400 gap-1"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to blog list
                    </Link>
                    <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-650 dark:text-indigo-400">
                            {blog.category}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                            {blog.title}
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2 border-t border-slate-200/30 dark:border-slate-800/30">
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Published {formattedDate}</span>
                        <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> By {developerName}</span>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main content */}
                    <div className="lg:col-span-8 space-y-8">
                        {blog.thumbnail && (
                            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                <img src={blog.thumbnail} alt={blog.title} className="h-full w-full object-cover" />
                            </div>
                        )}
                        <article className="prose dark:prose-invert prose-indigo max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                            {blog.content}
                        </article>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="pt-6 border-t border-slate-250/30 dark:border-slate-800/30 space-y-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tags</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {blog.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-lg">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Related Blogs Column */}
                    <div className="lg:col-span-4 space-y-6">
                        {relatedBlogs.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2 border-b border-slate-200/50 dark:border-slate-800/50 pb-2">
                                    <BookOpen className="h-5 w-5 text-indigo-650 dark:text-indigo-400" /> Related Posts
                                </h3>
                                <div className="space-y-4">
                                    {relatedBlogs.map((rel) => (
                                        <Link 
                                            key={rel.id} 
                                            href={route('blogs.show', rel.slug)}
                                            className="block p-4 rounded-xl border border-slate-250 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors space-y-2"
                                        >
                                            <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-455">
                                                {rel.category}
                                            </span>
                                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug">
                                                {rel.title}
                                            </h4>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
