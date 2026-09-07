import { portfolioData } from '../data/portfolioData';

interface ExperienceEntry {
  company: string;
  role: string;
  employmentType?: string;
  duration?: string;
  location?: string;
  workMode?: string;
  period: string;
  description: string;
  keyPoints?: string[];
  skills?: string[];
}

const defaultExperiences: ExperienceEntry[] = [
  {
    company: 'Accenture',
    role: 'App/Cloud Support Associate',
    employmentType: 'Full-time',
    duration: '3 mos',
    location: 'Cebu City, Philippines',
    workMode: 'On-site',
    period: 'JUN 2026 – AUG 2026',
    description:
      'Completed intensive enterprise training in cloud data architecture, Docker, DevOps, and Kubernetes administration. Gained hands-on foundational knowledge of modern containerized application deployments, system monitoring, and the Software Development Life Cycle (SDLC) alongside IT service management practices.',
    skills: ['Docker', 'Kubernetes', 'Cloud Architecture', 'DevOps', 'ITSM', 'SDLC'],
  },
  {
    company: 'Alorica',
    role: 'Customer Service Representative',
    employmentType: 'Full-time',
    duration: '7 mos',
    location: 'Cebu City, Philippines',
    workMode: 'On-site',
    period: 'AUG 2025 – FEB 2026',
    description:
      'Delivered timely front-line customer support for account, order, and service inquiries. Diagnosed and resolved user concerns under high call volumes while adhering to strict service quality standards and calmly escalating complex multi-tier technical issues.',
    skills: ['Customer Support', 'Incident Triage', 'User Empathy', 'Active Listening', 'Problem Solving'],
  },
  {
    company: 'A Guy I know Cebu – Inc.',
    role: 'Web Developer Intern',
    employmentType: 'Internship',
    duration: '4 mos',
    location: 'Cebu City, Philippines',
    workMode: 'Hybrid',
    period: 'JAN 2024 – APR 2024',
    description:
      'Developed TaskFlow, a full-stack task management application using Vue.js, Laravel, MySQL, and Firebase Authentication. Implemented real-time task updates, custom categorization, and responsive UI components while optimizing relational database queries to improve system response speed by roughly 30%.',
    skills: ['Vue.js', 'Laravel', 'MySQL', 'Firebase Auth', 'REST APIs', 'Database Optimization'],
  },
];

export default function ExperienceTimeline() {
  const experiences: ExperienceEntry[] =
    portfolioData?.experience?.length > 0
      ? portfolioData.experience.map((item: any) => ({
          company: item.organization || item.company || 'Organization',
          role: item.title || item.role || 'Role',
          employmentType: item.roleType || 'Full-time',
          duration: item.duration || '',
          location: item.location || 'Cebu City, Philippines',
          workMode: item.workMode || '',
          period: item.year || item.period || '',
          description: item.description || '',
          keyPoints: item.keyPoints || [],
          skills: item.skills || item.technologies || [],
        }))
      : defaultExperiences;

  const getInitials = (name: string) => {
    const words = name.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <section
      id="experience"
      aria-label="Work Experience History"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full border-t border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950"
    >
      <div className="space-y-10 sm:space-y-12">
        
        {/* HEADER */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 dark:text-white font-mono lowercase">
            experience
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-2xl">
            Practical experience across web engineering, customer service, and cloud support — from building full-stack academic and store systems to production container training.
          </p>
        </div>

        {/* TIMELINE LIST */}
        <div className="relative">
          {experiences.map((exp, idx) => {
            const isLast = idx === experiences.length - 1;
            const initials = getInitials(exp.company);
            const visibleSkills = exp.skills?.slice(0, 3) || [];
            const remainingSkillsCount = (exp.skills?.length || 0) - visibleSkills.length;

            return (
              <div 
                key={idx} 
                className="relative flex items-start gap-4 sm:gap-6 pb-10 sm:pb-12 last:pb-0"
              >
                {/* CONTINUOUS VERTICAL LINE (Mathematically aligned to badge center) */}
                {!isLast && (
                  <div 
                    className="absolute left-5 sm:left-[22px] -translate-x-1/2 top-10 sm:top-11 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 pointer-events-none" 
                    aria-hidden="true" 
                  />
                )}

                {/* LEFT: Monogram Badge */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 shadow-xs z-10 select-none">
                    {initials}
                  </div>
                </div>

                {/* RIGHT: Content Details (Matches Standard Chartered card in reference) */}
                <div className="space-y-3 flex-1 min-w-0 pt-0.5">
                  
                  {/* Company & Employment Type */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white tracking-tight">
                      {exp.company}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {exp.employmentType && <span>{exp.employmentType}</span>}
                      {exp.location && (
                        <>
                          <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
                          <span>{exp.location}</span>
                        </>
                      )}
                      {exp.workMode && (
                        <>
                          <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
                          <span>{exp.workMode}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Role Title & Dates */}
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-semibold text-neutral-950 dark:text-white">
                      {exp.role}
                    </h4>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {exp.period} {exp.duration ? `· ${exp.duration.toUpperCase()}` : ''}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {exp.description}
                  </p>

                  {/* Additional Bullet Points */}
                  {exp.keyPoints && exp.keyPoints.length > 0 && (
                    <ul className="space-y-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 list-disc list-outside pl-4 leading-relaxed pt-0.5">
                      {exp.keyPoints.map((point, pIdx) => (
                        <li key={pIdx}>{point}</li>
                      ))}
                    </ul>
                  )}

                  {/* Skills Badges Strip */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                      {visibleSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 px-2.5 py-1 text-xs font-mono text-neutral-700 dark:text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {remainingSkillsCount > 0 && (
                        <span className="rounded-md border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-1 text-xs font-mono text-neutral-400 dark:text-neutral-500">
                          +{remainingSkillsCount} skills
                        </span>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}