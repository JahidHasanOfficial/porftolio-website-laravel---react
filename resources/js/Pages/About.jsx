import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Briefcase, GraduationCap, Award, Download, Calendar, 
    MapPin, Globe, AwardIcon, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About({ experiences, educations, certificates, resume }) {
    const { settings } = usePage().props;

    const developerName = settings?.name || 'Jahid Hasan';
    const developerDesignation = settings?.designation || 'Full Stack Developer';

    return (
        <AppLayout>
            {/* Header banner */}
            <section className="relative bg-slate-100 dark:bg-slate-900/40 py-20 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold tracking-tight"
                    >
                        About Me
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base"
                    >
                        Discover my professional story, educational background, certifications, and technical career details.
                    </motion.p>
                </div>
            </section>

            {/* Career details */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Bio and summary Column */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-extrabold">Professional Bio</h2>
                            <p className="text-base text-slate-700 dark:text-slate-350 leading-relaxed whitespace-pre-line">
                                {settings?.biography || 'Professional developer story.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-extrabold">Career Journey</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {settings?.professional_summary || 'Highly driven code specialist.'}
                            </p>
                        </div>

                        {/* Experience timeline */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-indigo-650 dark:text-indigo-400" /> Work History
                            </h3>
                            <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 space-y-10">
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full border-4 border-slate-50 dark:border-slate-950 bg-indigo-600 dark:bg-indigo-500" />
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                                                {new Date(exp.start_date).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})} - {exp.is_current ? 'Present' : new Date(exp.end_date).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})}
                                            </span>
                                            <h4 className="text-lg font-bold text-slate-850 dark:text-slate-100">{exp.position}</h4>
                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-450">{exp.company} &bull; {exp.location}</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-350 whitespace-pre-line leading-relaxed mt-2">
                                                {exp.responsibilities}
                                            </p>
                                            {exp.achievements && (
                                                <div className="mt-3 p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/30">
                                                    <p className="text-xs font-semibold text-indigo-650 dark:text-indigo-400">Key Achievement:</p>
                                                    <p className="text-xs text-slate-650 dark:text-slate-350 mt-0.5">{exp.achievements}</p>
                                                </div>
                                            )}
                                            <div className="flex flex-wrap gap-1.5 pt-3">
                                                {exp.technologies?.map((tech, idx) => (
                                                    <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-850 text-slate-650 dark:text-slate-400 px-2 py-0.5 rounded font-medium">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education timeline */}
                        <div className="space-y-6 pt-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-indigo-650 dark:text-indigo-400" /> Academic Qualifications
                            </h3>
                            <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 space-y-10">
                                {educations.map((edu) => (
                                    <div key={edu.id} className="relative">
                                        <div className="absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full border-4 border-slate-50 dark:border-slate-950 bg-indigo-600 dark:bg-indigo-500" />
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                                                {edu.session}
                                            </span>
                                            <h4 className="text-lg font-bold text-slate-850 dark:text-slate-100">{edu.degree}</h4>
                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-450">{edu.institute} {edu.department && `(${edu.department})`}</p>
                                            {edu.result && (
                                                <p className="text-xs font-medium text-slate-400 mt-1">Result: {edu.result}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Resume & Certificates Column */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Resume Hub */}
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-850 p-6 space-y-4 bg-white dark:bg-slate-900 shadow-sm">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <FileText className="h-5 w-5 text-indigo-600" /> Resume Profile
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Get my complete professional curriculum vitae detailing project histories, server tooling, and client logs.
                            </p>
                            {resume ? (
                                <div className="space-y-3 pt-2">
                                    <div className="text-[11px] font-medium text-slate-400 flex justify-between">
                                        <span>Format: PDF Document</span>
                                        <span>{resume.download_count} Downloads</span>
                                    </div>
                                    <a
                                        href={route('resume.download')}
                                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-colors gap-2"
                                    >
                                        <Download className="h-4 w-4" /> Download Resume
                                    </a>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400 italic">No resume available for download.</p>
                            )}
                        </div>

                        {/* Certificates */}
                        {certificates.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Award className="h-5 w-5 text-indigo-650 dark:text-indigo-400" /> Certifications
                                </h3>
                                <div className="space-y-4">
                                    {certificates.map((cert) => (
                                        <div 
                                            key={cert.id}
                                            className="p-4 rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 shadow-xs space-y-2.5"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-sm text-slate-850 dark:text-slate-100 leading-tight">
                                                        {cert.name}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 dark:text-slate-450 mt-1">
                                                        Issued by {cert.issuer}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                                                <span>Issued: {new Date(cert.date).toLocaleDateString(undefined, {month: 'long', year: 'numeric'})}</span>
                                                {cert.credential_url && (
                                                    <a 
                                                        href={cert.credential_url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                                                    >
                                                        Verify Credential
                                                    </a>
                                                )}
                                            </div>
                                        </div>
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
