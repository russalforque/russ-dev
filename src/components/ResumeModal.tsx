import { useEffect } from 'react';
import { 
  X, 
  Printer, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Award, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { soundManager } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resumeData = {
  name: 'Rhazel Alforque',
  title: 'Full Stack Developer (Entry-Level)',
  targetRole: 'Junior .NET Developer',
  email: 'russavenido@gmail.com',
  phone: '+63 927 352 4231',
  location: '196 Tabada St, Cebu City, 6000 Cebu',
  portfolioUrl: 'https://russalforque.github.io/al4k',
  portfolioDisplay: 'russalforque.github.io/al4k',
  
  summary: `Entry-level Full Stack Developer with a BSIT and hands-on experience building web applications using C#, ASP.NET Core MVC, .NET Web API, React, and SQL Server. Skilled in frontend and backend development, REST APIs, authentication, and database integration. Completed Accenture training in cloud architecture, Docker, DevOps, and Kubernetes. Seeking a Junior .NET Developer role to contribute to full-stack development and reliable software solutions.`,

  skills: {
    languages: ['C#', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    frameworks: ['ASP.NET Core MVC', '.NET Web API', 'Entity Framework Core', 'React', 'Vue.js', 'Laravel', 'Tailwind CSS'],
    databases: ['SQL Server', 'MySQL'],
    cloudDevOps: ['Docker', 'Kubernetes', 'Cloud Architecture Fundamentals'],
    mobile: ['Capacitor'],
    tools: ['Visual Studio', 'Git', 'GitHub'],
    coreSkills: ['CRUD', 'REST APIs', 'Authentication', 'Debugging', 'Responsive Design'],
  },

  experience: [
    {
      company: 'Accenture',
      role: 'App/Cloud Support Associate',
      period: '06/2026 – 08/2026',
      points: [
        'Completed Accenture training in cloud data architecture, Docker, DevOps, and Kubernetes administration, gaining foundational knowledge of cloud architecture, containerization, container management, and modern application deployment practices.',
        'Gained foundational knowledge of the Software Development Life Cycle (SDLC), including software development processes, testing, troubleshooting, and IT service management concepts.',
      ],
    },
    {
      company: 'Alorica',
      role: 'Customer Service Representative',
      period: '08/2025 – 02/2026',
      points: [
        'Provided customer support for account, order, and service-related inquiries, delivering timely resolutions and escalating complex issues when necessary.',
        'Maintained high customer satisfaction by effectively managing high call volumes, troubleshooting user concerns, and adhering to service quality standards.',
      ],
    },
    {
      company: 'A Guy I know Cebu – Inc.',
      role: 'Web Developer Intern',
      period: '01/2024 – 04/2024',
      points: [
        'Developed TaskFlow, a full-stack task management system using Vue.js, Laravel, MySQL, and Firebase Authentication, enabling secure user access and efficient task management.',
        'Implemented real-time task updates, task categorization, and responsive UI features, while optimizing database performance to improve system speed by approximately 30%.',
      ],
    },
  ],

  education: {
    degree: 'Bachelor of Science In Information Technology',
    institution: 'Asian College of Technology',
    period: '08/2021 – 06/2025',
  },

  certifications: [
    {
      title: 'Cloud Data Architecture: Cloud Architecture & Containerization',
      date: 'July 2026',
    },
    {
      title: 'Using Docker for DevOps: Introduction to Docker',
      date: 'July 2026',
    },
    {
      title: 'DevOps with Docker: Container Management',
      date: 'July 2026',
    },
    {
      title: 'Kubernetes Administrator: Kubernetes Fundamentals for Administrators',
      date: 'July 2026',
    },
  ],

  projects: [
    {
      title: 'OJT Timesheet Monitoring System (Thesis Project)',
      stack: 'ASP.NET Core MVC | C# | SQL Server | Entity Framework Core | Bootstrap',
      points: [
        'Developed a role-based OJT Timesheet Monitoring System using C# and ASP.NET Core MVC, with separate Admin and Trainee functionality for task assignment, timesheet management, attendance tracking, and reporting.',
        'Integrated SQL Server and Entity Framework Core to support centralized data management and accurate attendance monitoring.',
      ],
    },
    {
      title: 'SwiftWash — Laundry Management System & POS',
      stack: 'React | TypeScript | Tailwind CSS | Capacitor | .NET Web API | SQL Server',
      points: [
        'Developed a laundry & POS management system using React, TypeScript, and Tailwind CSS, with a .NET Web API backend and SQL Server database.',
        'Implemented features for managing sales transactions, customer orders, laundry services, inventory, customer records, and reporting, with Capacitor integration for cross-platform application development.',
      ],
    },
  ],
};

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playTick(800);
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrintOrDownload = () => {
    soundManager.playSuccess();
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150 print:p-0 print:bg-white selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950"
      onClick={() => {
        soundManager.playTick(800);
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      {/* Minimalist Document Card */}
      <div
        id="resume-modal-card"
        className="relative w-full max-w-3xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-8 md:p-10 shadow-2xl transition-all my-6 max-h-[92vh] overflow-y-auto text-neutral-900 dark:text-neutral-100 print:shadow-none print:border-none print:p-0 print:max-h-none print:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimal Close Button */}
        <button
          id="resume-modal-close-btn"
          type="button"
          onClick={() => {
            soundManager.playTick(800);
            onClose();
          }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-1.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer print:hidden"
          aria-label="Close resume preview"
        >
          <X className="h-4 w-4" />
        </button>

        {/* HEADER / IDENTITY */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 space-y-2 pr-8 print:pr-0">
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300">
              Curriculum Vitae
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
              Target: {resumeData.targetRole}
            </span>
          </div>

          <div>
            <h2 id="resume-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white uppercase">
              {resumeData.name}
            </h2>
            <p className="text-xs sm:text-sm font-mono font-medium text-neutral-600 dark:text-neutral-400">
              {resumeData.title}
            </p>
          </div>

          {/* Contact Strip */}
          <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <span className="inline-flex items-center gap-1">
              <Mail className="h-3 w-3 text-neutral-900 dark:text-white" />
              <a href={`mailto:${resumeData.email}`} className="hover:underline text-neutral-900 dark:text-neutral-200">
                {resumeData.email}
              </a>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline select-none">|</span>
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3 w-3 text-neutral-900 dark:text-white" />
              <span>{resumeData.phone}</span>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline select-none">|</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-neutral-900 dark:text-white" />
              <span>{resumeData.location}</span>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline select-none">|</span>
            <span className="inline-flex items-center gap-1">
              <Globe className="h-3 w-3 text-neutral-900 dark:text-white" />
              <a 
                href={resumeData.portfolioUrl} 
                target="_blank" 
                rel="noreferrer"
                className="underline hover:text-neutral-950 dark:hover:text-white font-medium"
              >
                {resumeData.portfolioDisplay}
              </a>
            </span>
          </div>
        </div>

        {/* RESUME BODY */}
        <div className="py-6 space-y-6 text-xs sm:text-sm">
          
          {/* 01. SUMMARY */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-950 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1">
              01 // Professional Summary
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              {resumeData.summary}
            </p>
          </section>

          {/* 02. TECHNICAL SKILLS */}
          <section className="space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-950 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1">
              02 // Technical Skills
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                <span className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400 block mb-0.5">
                  Languages:
                </span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  {resumeData.skills.languages.join(', ')}
                </span>
              </div>

              <div className="p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                <span className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400 block mb-0.5">
                  Frameworks &amp; Libraries:
                </span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  {resumeData.skills.frameworks.join(', ')}
                </span>
              </div>

              <div className="p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                <span className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400 block mb-0.5">
                  Databases:
                </span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  {resumeData.skills.databases.join(', ')}
                </span>
              </div>

              <div className="p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                <span className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400 block mb-0.5">
                  Cloud &amp; DevOps:
                </span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  {resumeData.skills.cloudDevOps.join(', ')}
                </span>
              </div>

              <div className="p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                <span className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400 block mb-0.5">
                  Tools &amp; Mobile:
                </span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  {resumeData.skills.tools.join(', ')} · Mobile: {resumeData.skills.mobile.join(', ')}
                </span>
              </div>

              <div className="p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                <span className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400 block mb-0.5">
                  Core Skills:
                </span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  {resumeData.skills.coreSkills.join(', ')}
                </span>
              </div>
            </div>
          </section>

          {/* 03. WORK EXPERIENCE */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-950 dark:text-white flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              <Briefcase className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
              <span>03 // Work Experience</span>
            </h3>

            <div className="space-y-4">
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-neutral-900 dark:border-neutral-100 pl-3.5 space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <div className="flex items-center gap-1.5 font-bold text-neutral-950 dark:text-white text-xs sm:text-sm">
                      <span>{exp.company}</span>
                      <span className="text-neutral-400 font-normal">/</span>
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                        {exp.role}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-300 list-disc list-outside pl-4 leading-relaxed font-normal">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 04. PROJECTS */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-950 dark:text-white flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              <FolderGit2 className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
              <span>04 // Project Experience</span>
            </h3>

            <div className="space-y-3">
              {resumeData.projects.map((proj, pIdx) => (
                <div key={pIdx} className="p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 space-y-1">
                  <h4 className="font-bold text-neutral-950 dark:text-white text-xs sm:text-sm">
                    {proj.title}
                  </h4>
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                    {proj.stack}
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-300 list-disc list-outside pl-4 leading-relaxed font-normal pt-1">
                    {proj.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 05. EDUCATION & CERTIFICATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            
            {/* Education */}
            <section className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-950 dark:text-white flex items-center gap-1.5 border-b border-neutral-200 dark:border-neutral-800 pb-1">
                <GraduationCap className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
                <span>05 // Education</span>
              </h3>

              <div className="p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 space-y-1">
                <div className="font-bold text-xs sm:text-sm text-neutral-950 dark:text-white">
                  {resumeData.education.degree}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  {resumeData.education.institution}
                </div>
                <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                  {resumeData.education.period}
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-950 dark:text-white flex items-center gap-1.5 border-b border-neutral-200 dark:border-neutral-800 pb-1">
                <Award className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
                <span>06 // Certifications (July 2026)</span>
              </h3>

              <ul className="space-y-1.5 font-mono text-xs">
                {resumeData.certifications.map((cert, cIdx) => (
                  <li 
                    key={cIdx} 
                    className="p-2 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-[11px] block leading-tight">
                        {cert.title}
                      </span>
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block">
                        Completed: {cert.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

          </div>

        </div>

        {/* MODAL FOOTER CONTROLS (Hidden on Print) */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintOrDownload}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <a
              href={resumeData.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playTick(1000)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <span>Live Portfolio</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playTick(800);
              onClose();
            }}
            className="text-xs font-mono uppercase text-neutral-500 hover:text-neutral-950 dark:hover:text-white px-2 py-1.5 transition-colors cursor-pointer"
          >
            [Close Esc]
          </button>
        </div>

      </div>
    </div>
  );
}