import React from 'react';
import { router, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Mail, Check, Trash2, Calendar, Phone, MessageSquare } from 'lucide-react';

export default function Index({ messages }) {
    const markAsRead = (id) => {
        router.put(route('admin.messages.update', id));
    };

    const deleteMessage = (id) => {
        if (confirm('Are you sure you want to delete this message permanently?')) {
            router.delete(route('admin.messages.destroy', id));
        }
    };

    return (
        <AdminLayout title="Contact Messages">
            <div className="space-y-6">
                <p className="text-sm text-slate-500">View and manage feedback or project requests sent by public visitors.</p>

                {/* Messages List */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                    {messages.data.length > 0 ? (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {messages.data.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={`p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${
                                        msg.is_read ? 'bg-transparent opacity-80' : 'bg-indigo-50/10 dark:bg-indigo-950/10'
                                    }`}
                                >
                                    <div className="space-y-2 max-w-3xl flex-grow">
                                        <div className="flex items-center space-x-2">
                                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                msg.is_read ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : 'bg-indigo-650/10 text-indigo-650'
                                            }`}>
                                                <Mail className="h-4.5 w-4.5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-slate-805 dark:text-slate-200 flex items-center gap-1.5">
                                                    {msg.name}
                                                    {!msg.is_read && (
                                                        <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                                                    )}
                                                </h4>
                                                <p className="text-xs text-slate-450 dark:text-slate-400">
                                                    {msg.email} {msg.phone && `| ${msg.phone}`}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>Received: {new Date(msg.created_at).toLocaleString()}</span>
                                        </div>

                                        <div className="space-y-1 pt-1">
                                            <p className="text-xs font-bold text-slate-700 dark:text-slate-350">Subject: {msg.subject}</p>
                                            <p className="text-xs text-slate-550 dark:text-slate-400 whitespace-pre-line leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-850">
                                                {msg.message}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 pt-2 md:pt-0">
                                        {!msg.is_read && (
                                            <button
                                                onClick={() => markAsRead(msg.id)}
                                                className="px-3 py-1.5 rounded-lg border border-slate-250 text-indigo-600 hover:bg-slate-100 dark:border-slate-800 dark:text-indigo-400 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                            >
                                                <Check className="h-3.5 w-3.5" /> Mark Read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteMessage(msg.id)}
                                            className="px-3 py-1.5 rounded-lg border border-slate-250 text-red-600 hover:bg-red-50 dark:border-slate-800 dark:text-red-400 dark:hover:bg-red-950/20 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-2">
                            <MessageSquare className="h-8 w-8 text-slate-300" />
                            <p className="text-xs">No contact messages received.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {messages.links.length > 3 && (
                    <div className="flex justify-center pt-4">
                        <nav className="flex space-x-1">
                            {messages.links.map((link, idx) => {
                                return (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : link.url
                                                ? 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                                                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed border border-slate-100 dark:border-slate-900'
                                        }`}
                                    />
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
