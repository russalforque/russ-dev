import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  ExternalLink, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  User, 
  Code,
  HelpCircle,
  MessageSquareHeart,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../utils/sound';

interface AboutSectionProps {
  onOpenResumeModal: () => void;
}

interface Chapter {
  id: string;
  stepNumber: string;
  period: string;
  tabLabel: string;
  headline: string;
  story: string;
  keyPoints: string[];
  toolsUsed: string[];
}




export default function AboutSection({ onOpenResumeModal }: AboutSectionProps) {
  


  return (
    <section 
      id="about" 
      aria-label="About Rhazel Alforque"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full border-t border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950"
    >
      <div className="space-y-10 sm:space-y-12">
        
        {/* HEADER (Matching experience & tech stack style) */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 dark:text-white font-mono lowercase">
              about
            </h2>
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
              [background &amp; principles]
            </span>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-2xl">
            A brief background on my journey as an entry-level developer in Cebu City, what I value in software, and what drives me to build.
          </p>
        </div>

        {/* OVERVIEW & QUICK FACTS */}
        <div className="space-y-6">
          <div className="space-y-3.5 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
            <p>
              I graduated with a Bachelor of Science in Information Technology from Asian College of Technology in Cebu. Throughout my studies, internships, and customer service experience, I discovered that I really enjoy two things: designing screens that are easy for anyone to click through, and writing the underlying logic (like C# and databases) that keeps everything working reliably.
            </p>
            <p>
I recently completed cloud support training at Accenture, where I gained hands-on knowledge of Docker and Kubernetes. I am now looking for an opportunity to grow with a supportive company as a <strong className="font-semibold text-neutral-950 dark:text-white">Junior .NET Developer</strong> or <strong className="font-semibold text-neutral-950 dark:text-white">Full Stack Developer</strong>.            </p>
          </div>

          {/* Quick Facts with Row & Column Line Separators */}
<div className="border-y border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800 text-xs sm:text-sm">
  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800">
    <div className="py-2.5 sm:pr-4 flex items-center gap-2.5 text-neutral-700 dark:text-neutral-300">
      <MapPin className="h-4 w-4 text-neutral-900 dark:text-white shrink-0" />
      <span><strong>Location:</strong> Cebu City, Philippines</span>
    </div>
    <div className="py-2.5 sm:pl-4 flex items-center gap-2.5 text-neutral-700 dark:text-neutral-300">
      <GraduationCap className="h-4 w-4 text-neutral-900 dark:text-white shrink-0" />
      <span><strong>Education:</strong> BSIT (Asian Coll. of Tech)</span>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800">
    <div className="py-2.5 sm:pr-4 flex items-center gap-2.5 text-neutral-700 dark:text-neutral-300">
      <Code className="h-4 w-4 text-neutral-900 dark:text-white shrink-0" />
      <span><strong>Core Tools:</strong> C#, ASP.NET, React, SQL Server</span>
    </div>
    <div className="py-2.5 sm:pl-4 flex items-center gap-2.5 text-neutral-700 dark:text-neutral-300">
      <User className="h-4 w-4 text-neutral-900 dark:text-white shrink-0" />
      <span><strong>Looking for:</strong> Junior .NET / Full-Stack Roles</span>
    </div>
  </div>
</div>
        </div>

        

      </div>
    </section>
  );
}