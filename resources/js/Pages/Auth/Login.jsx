import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AppLayout>
            <Head title="Log in" />

            <div className="relative min-h-[70vh] flex flex-col items-center justify-center py-16 px-4 bg-slate-50 dark:bg-slate-950/20">
                {/* Glowing decoration gradients */}
                <div className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-indigo-400 dark:bg-indigo-600 opacity-20 blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 -z-10 h-64 w-64 rounded-full bg-violet-400 dark:bg-violet-600 opacity-20 blur-[100px]"></div>

                <div className="w-full sm:max-w-md z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full overflow-hidden bg-white dark:bg-slate-900/40 backdrop-blur-md px-8 py-8 border border-slate-200 dark:border-slate-850 shadow-2xl rounded-2xl"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-extrabold tracking-tight text-slate-850 dark:text-white">
                                Welcome Back
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Sign in to manage your professional developer portfolio
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <InputLabel htmlFor="email" value="Email Address" className="text-slate-700 dark:text-slate-355 font-semibold text-xs" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800/80 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-2.5"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@example.com"
                                />

                                <InputError message={errors.email} className="mt-1.5" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Password" className="text-slate-700 dark:text-slate-355 font-semibold text-xs" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800/80 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-2.5"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />

                                <InputError message={errors.password} className="mt-1.5" />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                        className="rounded border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 dark:bg-slate-950/30"
                                    />
                                    <span className="ms-2 text-xs text-slate-500 dark:text-slate-400">
                                        Remember me
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-sm font-semibold text-white rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-600/20 transition-all gap-1.5 disabled:opacity-50"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </AppLayout>
    );
}
