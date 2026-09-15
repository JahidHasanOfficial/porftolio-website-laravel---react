import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
    X, Send, Sparkles, Bot, MessageSquare, Phone, Mail, 
    ArrowRight, ExternalLink, RotateCcw, User, CheckCheck,
    Code2, Layers, Briefcase, HelpCircle, ChevronRight
} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function PortfolioAIChatbot() {
    const { settings } = usePage().props;

    const developerName = settings?.name || 'Md. Jahid Hasan';
    const designation = settings?.designation || 'Software Engineer (Laravel & React)';
    const email = settings?.email || 'jahidhasanofficial23@gmail.com';
    const whatsappNumber = settings?.whatsapp || '8801865277323';
    const phoneNumber = settings?.phone || '+880 1521-719305';
    const location = settings?.address || 'Dhaka, Bangladesh';

    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('ai'); // 'ai' or 'whatsapp'
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showBadge, setShowBadge] = useState(false);

    // Initial greeting message (Bilingual)
    const [messages, setMessages] = useState([
        {
            id: 'init-1',
            sender: 'bot',
            time: 'Just now',
            text: `Hi there! 👋 আমি **${developerName}**-এর AI অ্যাসিস্ট্যান্ট।\n\nI can answer any questions in **English or বাংলা** about Jahid's **live projects, technical skills, services, and hiring availability**.\n\nআপনাকে কীভাবে সাহায্য করতে পারি?`,
            actions: [
                { label: '🚀 Projects (প্রজেক্টসমূহ)', query: 'প্রজেক্টগুলো দেখাও' },
                { label: '⚡ Tech Skills (স্কিলস)', query: 'তোমার স্কিলস কি কি?' },
                { label: '💼 Hire / Contact (হায়ার)', query: 'হায়ার করার নিয়ম কি?' },
                { label: '💬 WhatsApp Chat', actionType: 'whatsapp' }
            ]
        }
    ]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isTyping, isOpen]);

    // Show initial subtle banner after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBadge(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // -------------------------------------------------------------
    // KNOWLEDGE BASE & NLP MATCHING ENGINE
    // -------------------------------------------------------------
    const generateAIResponse = (userQuery) => {
        const q = userQuery.toLowerCase().trim();

        // 1. GREETINGS & SALUTATIONS
        if (/^(hi|hello|hey|salam|assalamu|hola|kemn|kemon|halo|হাই|হ্যালো|সালাম|কেমন)/i.test(q)) {
            return {
                text: `Hello! 👋 Thanks for visiting Md. Jahid Hasan's portfolio.\n\nI am his AI assistant trained on his software development work. You can ask me anything about his **experience, past projects, tech stack**, or discuss **hiring him for a project**!`,
                actions: [
                    { label: '🚀 What projects did he build?', query: 'Show me your projects' },
                    { label: '💼 How to hire him?', query: 'How to hire you?' },
                    { label: '💬 Chat on WhatsApp', actionType: 'whatsapp' }
                ]
            };
        }

        // 2. WHO IS JAHID / ABOUT
        if (q.includes('who is') || q.includes('about jahid') || q.includes('about you') || q.includes('introduce') || q.includes('কার পোর্টফোলিও') || q.includes('কে') || q.includes('সম্পর্কে')) {
            return {
                text: `**${developerName}** is a **Software Engineer** based in ${location} with over **3+ years of professional experience**.\n\nHe specializes in:\n• **Backend:** Robust Laravel, PHP & Clean Service-Layer Architecture\n• **Frontend:** Modern React, Inertia.js & Tailwind CSS\n• **Enterprise Systems:** Custom ERP, Sales CRM, HRM & Workflow Automation pipelines\n• **Databases:** High-performance MySQL design & Query optimization.`,
                actions: [
                    { label: '📂 View Full About Page', href: route('about') },
                    { label: '⚡ Technical Stack', query: 'What are your skills?' },
                    { label: '📞 Contact Details', query: 'How to contact Jahid?' }
                ]
            };
        }

        // 3. PROJECTS & PORTFOLIO
        if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('portfolio') || q.includes('system') || q.includes('প্রজেক্ট') || q.includes('কাজ')) {
            return {
                text: `Here are some of **Jahid's featured production projects**:\n\n1. **Enterprise ERP & Inventory Platform**\n   • Multi-branch inventory, billing, automated invoices & financial ledger.\n   • *Stack:* Laravel 12, React 19, MySQL, Inertia.\n\n2. **Sales CRM & Lead Automation Engine**\n   • Real-time Facebook Lead Ads ingestion webhook, auto-distribution to agents, WhatsApp/Email instant notifications.\n\n3. **Multi-Tenant E-Commerce Portal**\n   • Dynamic stores, payment gateway integrations (SSLCommerz/bKash/Stripe), role-based ACL.\n\n4. **Certificate Verification & HRM System**\n   • Instant QR-based verification, staff payroll & leave attendance.\n\nWould you like to explore all live projects?`,
                actions: [
                    { label: '🌐 Browse All Projects', href: route('projects.index') },
                    { label: '💬 Discuss a Custom Project on WhatsApp', actionType: 'whatsapp' }
                ]
            };
        }

        // 4. SKILLS & TECHNOLOGIES
        if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('laravel') || q.includes('react') || q.includes('php') || q.includes('mysql') || q.includes('javascript') || q.includes('স্কিল') || q.includes('প্রযুক্তি')) {
            return {
                text: `Here is **Jahid's core technical stack**:\n\n💻 **Backend:**\n• PHP 8.2 / 8.3 & Laravel (Controller → Service → Model architecture)\n• RESTful API Design, Sanctum, Webhooks, Queue Workers\n• Spatie Role & Permission management\n\n⚛️ **Frontend:**\n• React.js, Inertia.js, JavaScript (ES6+)\n• Tailwind CSS, Bootstrap 5, Framer Motion\n\n🗄️ **Database & DevOps:**\n• MySQL (Indexing, Normalization, Query Optimization), Redis\n• Git, GitHub Actions (CI/CD), Linux, cPanel Deployment`,
                actions: [
                    { label: '🚀 See Projects built with this stack', query: 'Show me your projects' },
                    { label: '💼 Hire for a Laravel/React Project', actionType: 'whatsapp' }
                ]
            };
        }

        // 5. EXPERIENCE & CAREER
        if (q.includes('experience') || q.includes('years') || q.includes('company') || q.includes('career') || q.includes('history') || q.includes('অভিজ্ঞতা') || q.includes('কবে থেকে')) {
            return {
                text: `Jahid Hasan brings **3+ years of hands-on software engineering experience**.\n\nHe has engineered enterprise web apps, lead automation pipelines, ERP modules, and high-conversion client platforms.\n\nHis primary focus is writing **clean, scalable, PSR-12 compliant code** with zero technical debt using the **Controller → Service → Model** design pattern.`,
                actions: [
                    { label: '📄 Read Full Career History', href: route('about') },
                    { label: '📥 Download Jahid’s Resume', href: route('resume.download') }
                ]
            };
        }

        // 6. SERVICES OFFERED
        if (q.includes('service') || q.includes('offer') || q.includes('can you build') || q.includes('develop') || q.includes('website') || q.includes('সার্ভিস') || q.includes('বানাতে পারবে')) {
            return {
                text: `Here are the professional software services Jahid offers:\n\n✨ **1. Custom Web Applications** (Laravel + React)\n✨ **2. Enterprise ERP, CRM & HRM Systems**\n✨ **3. Lead Automation & Third-Party API Integrations**\n✨ **4. Database Architecture & Speed Optimization**\n✨ **5. Bug Fixing, Code Refactoring & Security Hardening**\n✨ **6. CI/CD Deployment & Cloud Hosting Setup**`,
                actions: [
                    { label: '💬 Request a Quote on WhatsApp', actionType: 'whatsapp' },
                    { label: '📧 Send Email Inquiry', actionType: 'email' }
                ]
            };
        }

        // 7. HIRING, BUDGET, PRICING & TIMELINE
        if (q.includes('hire') || q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('rate') || q.includes('timeline') || q.includes('freelance') || q.includes('available') || q.includes('হায়ার') || q.includes('খরচ') || q.includes('টাকা') || q.includes('বাজেট')) {
            return {
                text: `Jahid is currently **Available for Hire** (Full-Time, Contract, or Milestone Project Basis)!\n\n💰 **Pricing & Timeline:**\nEvery project is unique based on scope, features, and deadlines. Jahid offers competitive, milestone-based pricing with transparent delivery milestones.\n\nLet’s discuss your project requirement directly on WhatsApp for a fast quote!`,
                actions: [
                    { label: '💬 Chat on WhatsApp (Fastest)', actionType: 'whatsapp' },
                    { label: '📞 Call Directly: ' + phoneNumber, actionType: 'call' },
                    { label: '📧 Email: ' + email, actionType: 'email' }
                ]
            };
        }

        // 8. CONTACT INFO & DIRECT DETAILS
        if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('number') || q.includes('whatsapp') || q.includes('address') || q.includes('location') || q.includes('ইমেইল') || q.includes('ফোন') || q.includes('যোগাযোগ')) {
            return {
                text: `You can reach **Md. Jahid Hasan** directly via:\n\n💬 **WhatsApp:** \`+880 1865-277323\`\n📞 **Phone:** \`${phoneNumber}\`\n📧 **Email:** \`${email}\`\n📍 **Location:** ${location}\n\nFeel free to send a message anytime!`,
                actions: [
                    { label: '💬 Open WhatsApp Chat', actionType: 'whatsapp' },
                    { label: '📧 Send Email', actionType: 'email' },
                    { label: '📞 Call Now', actionType: 'call' }
                ]
            };
        }

        // 9. RESUME / CV
        if (q.includes('resume') || q.includes('cv') || q.includes('সিভি') || q.includes('রেজুমে')) {
            return {
                text: `You can download Jahid Hasan's latest updated **Software Engineer Resume (PDF)** directly:`,
                actions: [
                    { label: '📥 Download Official Resume', href: route('resume.download') },
                    { label: '📄 View Career Profile', href: route('about') }
                ]
            };
        }

        // 10. DEFAULT INTELLIGENT FALLBACK
        return {
            text: `I understand you are asking about *"**${userQuery}**"*. \n\nAs Jahid's AI assistant, I can help you with:\n• **Projects & Architecture Details**\n• **Skills, Stack & Frameworks**\n• **Work Experience & Credentials**\n• **Project Inquiries & Direct Hiring**\n\nWould you like to connect directly with Jahid on WhatsApp to discuss your exact requirement?`,
            actions: [
                { label: '🚀 Explore Projects', query: 'Show me your projects' },
                { label: '💬 Connect on WhatsApp', actionType: 'whatsapp' },
                { label: '📞 Contact Info', query: 'How to contact Jahid?' }
            ]
        };
    };

    // Handle form submit with real-time live database lookup
    const handleSend = async (textInput) => {
        const queryText = textInput || input;
        if (!queryText.trim()) return;

        const userMsg = {
            id: 'user-' + Date.now(),
            sender: 'user',
            time: 'Just now',
            text: queryText.trim()
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Live query to Laravel backend connected directly to database
            const response = await axios.post('/api/ai-chat', { message: queryText.trim() });
            
            if (response.data && response.data.text) {
                const botMsg = {
                    id: 'bot-' + Date.now(),
                    sender: 'bot',
                    time: 'Just now',
                    text: response.data.text,
                    actions: response.data.actions || []
                };
                setMessages((prev) => [...prev, botMsg]);
                setIsTyping(false);
                return;
            }
        } catch (err) {
            console.warn('AI Chat API fallback to client knowledge engine:', err);
        }

        // Fallback to local intelligent knowledge base if offline
        setTimeout(() => {
            const aiResult = generateAIResponse(queryText);
            const botMsg = {
                id: 'bot-' + Date.now(),
                sender: 'bot',
                time: 'Just now',
                text: aiResult.text,
                actions: aiResult.actions || []
            };

            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 300);
    };

    const handleActionClick = (action) => {
        if (action.actionType === 'whatsapp') {
            openWhatsApp();
        } else if (action.actionType === 'email') {
            window.location.href = `mailto:${email}?subject=Project Inquiry for Jahid Hasan`;
        } else if (action.actionType === 'call') {
            window.location.href = `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;
        } else if (action.query) {
            handleSend(action.query);
        }
    };

    const openWhatsApp = (customText) => {
        const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
        const targetNumber = cleanNumber.startsWith('880') 
            ? cleanNumber 
            : (cleanNumber.startsWith('0') ? '88' + cleanNumber : '880' + cleanNumber);
        
        const text = customText || 'Hi Jahid, I was browsing your portfolio and would like to discuss a project with you!';
        window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    };

    const resetChat = () => {
        setMessages([
            {
                id: 'init-1',
                sender: 'bot',
                time: 'Just now',
                text: `Chat reset. 👋 How can I help you today? Ask me anything about Jahid's projects, skills, experience, or services!`,
                actions: [
                    { label: '🚀 Top Projects', query: 'Show me your projects' },
                    { label: '⚡ Tech Skills', query: 'What are your skills?' },
                    { label: '💼 Contact / Hire', query: 'How can I hire Jahid?' }
                ]
            }
        ]);
    };

    // Format simple bold text into JSX
    const renderFormattedText = (text) => {
        return text.split('\n').map((line, lineIdx) => {
            const parts = line.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
            return (
                <span key={lineIdx} className="block min-h-[1.1rem]">
                    {parts.map((part, partIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={partIdx} className="font-bold text-slate-950 dark:text-white">{part.slice(2, -2)}</strong>;
                        }
                        if (part.startsWith('*') && part.endsWith('*')) {
                            return <em key={partIdx} className="italic text-cyan-600 dark:text-cyan-400">{part.slice(1, -1)}</em>;
                        }
                        if (part.startsWith('`') && part.endsWith('`')) {
                            return <code key={partIdx} className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px] text-cyan-600 dark:text-cyan-400">{part.slice(1, -1)}</code>;
                        }
                        return part;
                    })}
                </span>
            );
        });
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
                        className="mb-4 w-[360px] sm:w-[410px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 backdrop-blur-xl flex flex-col h-[560px] max-h-[80vh]"
                    >
                        {/* Header with Mode Switch */}
                        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-white/10 text-white p-3.5 relative shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md border border-white/20">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm leading-snug flex items-center gap-1.5 text-white">
                                            Jahid's AI Assistant
                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                                                <Sparkles className="w-2.5 h-2.5" /> AI
                                            </span>
                                        </h3>
                                        <p className="text-[11px] text-slate-300">
                                            Ask about projects, skills & hiring
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <button
                                        onClick={resetChat}
                                        title="Reset conversation"
                                        className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                                        aria-label="Close Chatbot"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Direct Action Bar */}
                            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                                <span className="text-slate-400">Prefer direct chat?</span>
                                <button
                                    onClick={() => openWhatsApp()}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all shadow-sm shadow-emerald-500/30 active:scale-95"
                                >
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                    </svg>
                                    WhatsApp Jahid
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages Body */}
                        <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto bg-slate-50 dark:bg-slate-950/80">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`max-w-[88%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                                            msg.sender === 'user'
                                                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                                                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            {renderFormattedText(msg.text)}
                                        </div>

                                        {/* Action buttons embedded in message */}
                                        {msg.actions && msg.actions.length > 0 && (
                                            <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap gap-1.5">
                                                {msg.actions.map((act, aIdx) => {
                                                    if (act.href) {
                                                        return (
                                                            <Link
                                                                key={aIdx}
                                                                href={act.href}
                                                                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60 hover:bg-cyan-100 transition-colors font-medium"
                                                            >
                                                                {act.label} <ArrowRight className="w-3 h-3" />
                                                            </Link>
                                                        );
                                                    }
                                                    return (
                                                        <button
                                                            key={aIdx}
                                                            onClick={() => handleActionClick(act)}
                                                            className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border transition-all font-medium ${
                                                                act.actionType === 'whatsapp'
                                                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-transparent'
                                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-cyan-500/50'
                                                            }`}
                                                        >
                                                            {act.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'}`}>
                                            <span>{msg.time}</span>
                                            {msg.sender === 'user' && <CheckCheck className="w-3 h-3" />}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 p-2">
                                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                        <Bot className="w-3.5 h-3.5 text-cyan-500" />
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                    <span className="text-[11px]">Thinking...</span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Prompt Chips */}
                        <div className="p-2 bg-slate-100/70 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                            {[
                                { text: '🚀 Top Projects', q: 'Show me your projects' },
                                { text: '⚡ Skills', q: 'What are your skills?' },
                                { text: '💼 Hire Jahid', q: 'How can I hire Jahid?' },
                                { text: '📞 Contact', q: 'How to contact Jahid?' }
                            ].map((chip, cIdx) => (
                                <button
                                    key={cIdx}
                                    onClick={() => handleSend(chip.q)}
                                    className="whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-2xs"
                                >
                                    {chip.text}
                                </button>
                            ))}
                        </div>

                        {/* Input Footer */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2 shrink-0"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything (e.g. projects, skills, hire)..."
                                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/20 active:scale-95"
                                aria-label="Send message"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* -------------------------------------------------------------
                SUBTLE TOOLTIP ON PAGE LOAD
               ------------------------------------------------------------- */}
            <AnimatePresence>
                {!isOpen && showBadge && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-3 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs shadow-xl flex items-center gap-2 max-w-[280px] backdrop-blur-md cursor-pointer hover:border-cyan-500/50 transition-all"
                        onClick={() => {
                            setIsOpen(true);
                            setShowBadge(false);
                        }}
                    >
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></div>
                        <div className="flex-1">
                            <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-cyan-500" /> Have questions?
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                Ask my AI about projects, skills & hiring!
                            </p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowBadge(false);
                            }}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* -------------------------------------------------------------
                FLOATING DUAL-ACTION TRIGGER BUTTON
               ------------------------------------------------------------- */}
            <div className="flex items-center space-x-2">
                {/* Secondary Direct WhatsApp Quick Launch Pill */}
                {!isOpen && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openWhatsApp()}
                        className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white dark:hover:text-white text-xs font-semibold shadow-lg backdrop-blur-md transition-all group"
                        title="Chat directly on WhatsApp"
                    >
                        <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        <span>WhatsApp</span>
                    </motion.button>
                )}

                {/* Primary AI Trigger Floating Button */}
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setShowBadge(false);
                    }}
                    className="relative p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-xl shadow-cyan-600/30 hover:shadow-cyan-600/50 flex items-center justify-center transition-all focus:outline-none"
                    aria-label="Open AI Assistant"
                >
                    {/* Pulsing indicator */}
                    {!isOpen && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-400 border-2 border-white dark:border-slate-900"></span>
                        </span>
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
                                key="bot"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-center"
                            >
                                <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
}
