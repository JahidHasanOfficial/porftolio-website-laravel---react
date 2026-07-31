import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Background grids */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60"></div>
            
            {/* Glowing gradients */}
            <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-400 dark:bg-indigo-600 opacity-20 blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-violet-400 dark:bg-violet-600 opacity-20 blur-[100px]"></div>

            <div className="w-full sm:max-w-md">
                {/* Logo / Brand Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2.5">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                            JH
                        </div>
                        <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                            Jahid Hasan
                        </span>
                    </Link>
                </div>

                {/* Main Card Container with glassmorphism */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full overflow-hidden bg-white/80 dark:bg-slate-900/60 backdrop-blur-md px-8 py-8 border border-slate-200/50 dark:border-slate-800/80 shadow-2xl rounded-2xl"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
