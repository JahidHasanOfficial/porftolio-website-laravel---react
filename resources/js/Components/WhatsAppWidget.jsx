import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Mail, CheckCheck, Sparkles, MessageCircle } from 'lucide-react';

export default function WhatsAppWidget({ 
    whatsappNumber = '8801865277323',
    phoneNumber = '+880 1521-719305',
    email = 'jahidhasanofficial23@gmail.com',
    developerName = 'Md. Jahid Hasan',
    designation = 'Software Engineer (Laravel & React)'
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);

    // Show initial subtle tooltip after 3 seconds on page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const quickMessages = [
        '💼 I want to hire you for a project',
        '🚀 Need a Laravel + React Web Application',
        '⚡ Let’s discuss project budget & timeline',
        '👋 Hi Jahid, just wanted to connect!'
    ];

    const handleSendMessage = (textToSend) => {
        const finalMessage = textToSend || message;
        if (!finalMessage.trim()) return;

        // Clean WhatsApp number (remove non-digits, ensure country code)
        const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
        const targetNumber = cleanNumber.startsWith('880') 
            ? cleanNumber 
            : (cleanNumber.startsWith('0') ? '88' + cleanNumber : '880' + cleanNumber);

        const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(finalMessage.trim())}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        setMessage('');
        setIsOpen(false);
    };

    const handleSelectQuickMessage = (quickText) => {
        setMessage(quickText);
        handleSendMessage(quickText);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {/* -------------------------------------------------------------
                POPUP CHAT WINDOW
               ------------------------------------------------------------- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="mb-4 w-[340px] sm:w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white p-4 relative">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-lg border-2 border-white/40 shadow-inner">
                                            JH
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-700 rounded-full"></span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base leading-snug flex items-center gap-1.5">
                                            {developerName}
                                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                                        </h3>
                                        <p className="text-xs text-emerald-100 opacity-90">{designation}</p>
                                        <p className="text-[11px] text-emerald-200 flex items-center gap-1 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                                            Typically replies within 5 mins
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                                    aria-label="Close Chat"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto bg-slate-50 dark:bg-slate-950/80">
                            {/* Message Bubble from Jahid */}
                            <div className="flex flex-col space-y-1">
                                <div className="max-w-[88%] rounded-2xl rounded-tl-none p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm shadow-sm space-y-2">
                                    <p className="font-medium">
                                        Hello there! 👋
                                    </p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        I am Jahid Hasan. Are you looking to build a high-performance web app or have a project to discuss? How can I help you today?
                                    </p>
                                    <div className="flex items-center justify-end space-x-1 text-[10px] text-slate-400 dark:text-slate-500 pt-1">
                                        <span>Just now</span>
                                        <CheckCheck className="w-3.5 h-3.5 text-cyan-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Quick Suggestion Chips */}
                            <div className="space-y-1.5 pt-1">
                                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-emerald-500" />
                                    Quick prompts:
                                </p>
                                <div className="flex flex-col gap-1.5">
                                    {quickMessages.map((quick, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelectQuickMessage(quick)}
                                            className="text-left text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-slate-700 dark:text-slate-300 transition-all hover:translate-x-1 shadow-2xs"
                                        >
                                            {quick}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Alternative Direct Channels */}
                            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
                                <a
                                    href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
                                    className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    <Phone className="w-3 h-3" />
                                    <span>{phoneNumber}</span>
                                </a>
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    <Mail className="w-3 h-3" />
                                    <span>Email Me</span>
                                </a>
                            </div>
                        </div>

                        {/* Input Footer */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2"
                        >
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!message.trim()}
                                className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-500/20 active:scale-95"
                                aria-label="Send to WhatsApp"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* -------------------------------------------------------------
                SUBTLE TOOLTIP (Disappears on click)
               ------------------------------------------------------------- */}
            <AnimatePresence>
                {!isOpen && showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-3 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs shadow-xl flex items-center gap-2 max-w-[260px]"
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                        <span>Need a software solution? <strong>Chat on WhatsApp</strong></span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowTooltip(false);
                            }}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-auto"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* -------------------------------------------------------------
                FLOATING WHATSAPP TRIGGER BUTTON
               ------------------------------------------------------------- */}
            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowTooltip(false);
                }}
                className="relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 flex items-center justify-center transition-all focus:outline-none"
                aria-label="Open WhatsApp Chat"
            >
                {/* Ping animation indicator when closed */}
                {!isOpen && (
                    <>
                        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900"></span>
                        </span>
                    </>
                )}

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6 sm:w-7 sm:h-7" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="whatsapp"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Official WhatsApp SVG Icon */}
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
