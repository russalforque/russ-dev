/** One layer of a system, listed from the user interface down to storage. */
export interface Layer {
  name: string;
  detail: string;
}

/** A design decision, with a link to the code or document that backs it up. */
export interface Decision {
  title: string;
  detail: string;
  /** Short path shown as the link text, e.g. "src/db/SerializedDatabase.ts" */
  codeLabel?: string;
  codeHref?: string;
}

export interface Project {
  /** Also the anchor on the page: /#studex */
  id: string;
  title: string;
  /** One line: what it is and who it is for */
  tagline: string;
  category: 'Full stack' | 'Mobile' | 'Frontend';
  role: string;
  year?: string;
  /** Featured projects get a full write-up under "Selected work" */
  featured?: boolean;
  /** Names must match the ones in `technologies` (the skills list) for the skill filter to count them */
  technologies: string[];
  /** Anything a reviewer should know before opening the links, e.g. a demo running on mock data */
  caveat?: string;
  architecture?: Layer[];
  decisions?: Decision[];
  description?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  /** Optional screenshot in public/, e.g. "/assets/projects/swiftwash.jpg" */
  image?: string;
  /** An installable build */
  download?: { href: string; label: string; meta: string };
  /** Extra links such as a product website */
  links?: { label: string; href: string }[];
  liveUrl?: string;
  githubUrl?: string;
  /** Shown in place of a source link when the code is not public */
  sourceNote?: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  organization: string;
  location: string;
  keyPoints: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  school: string;
  location: string;
  notes: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface CertificateItem {
  id: string;
  certNumber: string;
  title: string;
  provider: string;
  completed: string;
  duration: string;
  image: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  lookingFor: string;
  workSetup: string;
  location: string;
  timezone: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeDownloadName: string;
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  /** Skills used in the projects and roles on this page */
  technologies: SkillGroup[];
  /** Covered in training or coursework, not yet used on a shipped project */
  familiar: string[];
  certifications: CertificateItem[];
}

export const portfolioData: PortfolioData = {
  name: "Rhazel Alforque",
  role: "Full-stack developer",
  lookingFor: "Junior .NET or full-stack developer role",
  workSetup: "Remote or hybrid",
  location: "Cebu City, Philippines",
  timezone: "UTC+8",
  email: "russavenido@gmail.com",
  phone: "+63 927 352 4231",
  github: "https://github.com/russalforque",
  linkedin: "https://www.linkedin.com/in/rhazel-alforoque-000643295/",
  resumeDownloadName: "Rhazel Alforque Resume.pdf",

  projects: [
    {
      id: "studex",
      title: "Studex",
      tagline: "Offline-first planner and budget app for students, shipped on Android",
      category: "Mobile",
      role: "Developer",
      year: "2026",
      featured: true,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Capacitor", "SQLite", "Vitest", "Cloudflare Workers"],
      architecture: [
        { name: "pages / features", detail: "Screens and form sheets. No SQL at this level." },
        { name: "hooks", detail: "TanStack Query reads and writes, with the cache invalidated by area." },
        { name: "repositories", detail: "The only code that writes SQL." },
        { name: "domain / validation", detail: "Pure business logic and zod schemas. Unit tested." },
        { name: "db", detail: "Driver interface, one serialized connection, five migrations. Native SQLite on the phone, sql.js in tests." },
      ],
      decisions: [
        {
          title: "The tests run the real SQL",
          detail:
            "Repositories take a database interface, so the same code runs on native SQLite in the app and on sql.js in the test suite. There are 19 test files across domain logic, repositories and licensing.",
          codeLabel: "src/repositories",
          codeHref: "https://github.com/russalforque/studex/tree/HEAD/src/repositories",
        },
        {
          title: "One connection, one statement at a time",
          detail:
            "A queue in front of the single SQLite connection means async code can never interleave two transactions or read a half-finished one.",
          codeLabel: "src/db/SerializedDatabase.ts",
          codeHref: "https://github.com/russalforque/studex/blob/HEAD/src/db/SerializedDatabase.ts",
        },
        {
          title: "Money is stored as integers",
          detail:
            "Amounts are kept in hundredths. Balances, budget totals and safe-to-spend are computed on read and never stored, so they cannot drift out of sync.",
          codeLabel: "docs/ARCHITECTURE.md",
          codeHref: "https://github.com/russalforque/studex/blob/HEAD/docs/ARCHITECTURE.md",
        },
        {
          title: "Licensing never touches student data",
          detail:
            "A Cloudflare Worker with D1 issues an Ed25519-signed entitlement once. The app verifies it offline on every launch after that, before the student database is opened.",
          codeLabel: "docs/LICENSING.md",
          codeHref: "https://github.com/russalforque/studex/blob/HEAD/docs/LICENSING.md",
        },
      ],
      description:
        "Classes, tasks, exams, allowance, expenses and savings in one app. Everything is stored on the phone in SQLite, with no account and no internet needed. One React and TypeScript codebase runs on Android through Capacitor.",
      features: [
        "Class schedule, subjects, tasks and exams",
        "Allowance, expenses, budget and savings goals",
        "Study files: import, camera scanner and offline viewer",
        "Reminders, search and a weekly summary",
        "Backup, restore and CSV export",
        "Grades with targets, attendance and notes",
      ],
      download: {
        href: "https://github.com/russalforque/studex-releases/releases/download/v0.3.0/studex-0.3.0.apk",
        label: "Download the APK",
        meta: "Version 0.3.0, 18 MB, Android 7.0 or later",
      },
      links: [
        { label: "Website", href: "https://studex.russalforque.workers.dev" },
        { label: "Install guide", href: "https://studex.russalforque.workers.dev/install.html" },
      ],
      githubUrl: "https://github.com/russalforque/studex",
    },
    {
      id: "swiftwash",
      title: "SwiftWash",
      tagline: "Laundry management system for small laundry shops",
      category: "Full stack",
      role: "Full-stack developer",
      featured: true,
      technologies: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "React", "JavaScript", "Bootstrap"],
      caveat:
        "The live demo runs on mock data with no back end. The API and database schema are in the repository.",
      architecture: [
        { name: "React app", detail: "Vite single-page app for the counter: orders, payments, reports, customer tracking page." },
        { name: "Laundry.API", detail: "Controllers, JWT bearer sign-in, exception and audit middleware, Swagger." },
        { name: "Laundry.Application", detail: "DTOs, service and repository interfaces, FluentValidation validators, AutoMapper profile." },
        { name: "Laundry.Infrastructure", detail: "EF Core context and migrations, repositories, service implementations, password hashing." },
        { name: "Laundry.Domain", detail: "Entities and enums. References nothing else." },
        { name: "SQL Server", detail: "Schema created by EF Core migrations." },
      ],
      decisions: [
        {
          title: "Dependencies point inward",
          detail:
            "Domain references no other project. Application defines the interfaces, Infrastructure implements them, and the API project wires the two together.",
          codeLabel: "backend/",
          codeHref: "https://github.com/russalforque/swiftwash-demo/tree/HEAD/backend",
        },
        {
          title: "Roles are enforced on the endpoint",
          detail:
            "Order writes need the Admin or Cashier role and user management is Admin only, declared with authorize attributes on the controllers.",
          codeLabel: "Controllers/OrdersController.cs",
          codeHref: "https://github.com/russalforque/swiftwash-demo/blob/HEAD/backend/Laundry.API/Controllers/OrdersController.cs",
        },
        {
          title: "Every write is logged, every error has one shape",
          detail:
            "One middleware records the user, path and address of each POST, PUT, PATCH and DELETE. Another maps exceptions to status codes so controllers stay free of try/catch.",
          codeLabel: "Laundry.API/Middleware",
          codeHref: "https://github.com/russalforque/swiftwash-demo/tree/HEAD/backend/Laundry.API/Middleware",
        },
      ],
      description:
        "A laundry management system for small laundry shops: a React front end on an ASP.NET Core 8 Web API with SQL Server. Staff take orders, track each load from drop-off to pickup, record payments and print receipts. Owners see daily and monthly sales.",
      problem:
        "Small laundry shops track orders on paper tickets. Tickets get lost, weights and prices are worked out by hand, and nobody can quickly tell a customer where their laundry is.",
      solution:
        "One system for the whole counter. An order takes a customer, a service and a weight, and prices itself. It then moves through Received, Washing, Drying, Ready for pickup and Claimed. Payments are recorded as cash or GCash, receipts carry a QR code, and customers can check their order on a tracking page.",
      features: [
        "Dashboard with daily and monthly sales, active orders and ready orders",
        "Customer records with search and transaction history",
        "Orders priced automatically from service and weight, with receipt numbers",
        "Order tracking: Received, Washing, Drying, Ready for pickup, Claimed",
        "Cash and GCash payments with payment history",
        "Daily, weekly and monthly reports with PDF and Excel export",
        "Inventory for detergent, conditioner, packaging and supplies",
        "User accounts with Admin and Cashier roles",
        "Customer tracking page and QR code receipts",
      ],
      liveUrl: "https://swiftwash-demo.vercel.app/",
      githubUrl: "https://github.com/russalforque/swiftwash-demo",
    },
    {
      id: "sellix-pos",
      title: "Sellix POS",
      tagline: "Point of sale for small stores, on Android phones and tablets",
      category: "Full stack",
      role: "Full-stack developer and UI designer",
      year: "2026",
      featured: true,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Capacitor", "SQLite", "C#", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
      architecture: [
        { name: "Android app", detail: "React and TypeScript in Capacitor. Sales, stock and reports use a SQLite database on the device." },
        { name: "Bluetooth", detail: "ESC/POS receipts to a thermal printer and a cash drawer kick, straight from the phone or tablet." },
        { name: "Sellix.Api", detail: "ASP.NET Core 8 with EF Core, Identity and JWT on SQL Server. Holds the print-job queue." },
        { name: "Sellix.PrintAgent", detail: "A C# program on the counter PC that polls the queue and writes raw ESC/POS to the Windows spooler." },
      ],
      decisions: [
        {
          title: "The cloud never reaches into the store",
          detail:
            "The API turns a receipt into ESC/POS bytes and queues it. The agent on the counter PC pulls jobs and prints, so the store network needs no inbound connection.",
          codeLabel: "Sellix.PrintAgent/Program.cs",
          codeHref: "https://github.com/russalforque/point-of-sale-system/blob/HEAD/Sellix.PrintAgent/Program.cs",
        },
        {
          title: "A sale is one transaction",
          detail:
            "Stock is checked and reduced, an inventory ledger row is written and the payment is validated inside a single database transaction. Any failure rolls all of it back.",
          codeLabel: "Services/SalesService.cs",
          codeHref: "https://github.com/russalforque/point-of-sale-system/blob/HEAD/backend/Sellix.Api/Services/SalesService.cs",
        },
        {
          title: "The counter works with the internet down",
          detail:
            "The app keeps its data in SQLite on the device, and a backup and restore feature writes the store records to a portable file.",
          codeLabel: "src/database",
          codeHref: "https://github.com/russalforque/point-of-sale-system/tree/HEAD/src/database",
        },
      ],
      description:
        "Sellix POS is a full-featured point-of-sale application built for Android phones and tablets. It brings sales, inventory, products, suppliers, customers, staff management, and reporting into one offline-ready app, and connects to Bluetooth receipt printers and cash drawers so it can run a real store counter. The same repository holds an ASP.NET Core 8 API on SQL Server and a C# Windows print agent for ESC/POS receipt printing.",
      problem:
        "Small retail stores often rely on handwritten records or expensive POS hardware to track sales and stock. Manual tracking leads to inventory errors, unrecorded sales, and little visibility into cashier activity, while dedicated POS systems are often too costly or complicated for small businesses.",
      solution:
        "Developed an affordable POS app that turns an ordinary phone or tablet into a complete store system. It handles checkout, stock levels, and sales reports, secures access with role-based staff accounts and shift tracking, prints receipts through Bluetooth printers, and stores data locally with SQLite so the store keeps running without an internet connection. A backup and restore feature protects store records if a device is lost.",
      features: [
        "Sales and checkout with cart management",
        "Dashboard overview and sales reports",
        "Inventory tracking with product and category management",
        "Supplier and customer record management",
        "Role-based user accounts for admins and staff",
        "Shift tracking and shift history for cashier accountability",
        "Bluetooth receipt printer and cash drawer integration",
        "Customizable receipts with live preview",
        "Data backup and restore to a portable file",
        "Touch-friendly responsive layout for phones and tablets",
      ],
      githubUrl: "https://github.com/russalforque/point-of-sale-system",
    },
    {
      id: "appointly",
      title: "Appointly",
      tagline: "Online booking and scheduling for service businesses",
      category: "Full stack",
      role: "Full-stack developer and UI designer",
      year: "2026",
      featured: true,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
      architecture: [
        { name: "React app", detail: "React 19 and TypeScript single-page app on Vercel. It talks to Supabase directly; there is no application server." },
        { name: "Postgres functions", detail: "Public callers go through functions such as get_available_slots. They never read bookings or customers directly." },
        { name: "Row Level Security", detail: "Every access rule lives in the database, in 29 plain SQL migrations." },
        { name: "Supabase Auth and Storage", detail: "Sign-in, plus private payment proofs served through short-lived signed URLs." },
      ],
      decisions: [
        {
          title: "The database refuses a double booking",
          detail:
            "An exclusion constraint on staff member and time range makes two overlapping bookings impossible, whatever the client sends.",
          codeLabel: "migrations/0001_schema.sql",
          codeHref: "https://github.com/russalforque/appointly/blob/HEAD/supabase/migrations/0001_schema.sql",
        },
        {
          title: "Availability is computed in SQL",
          detail:
            "One function works out open slots from business hours, blocked dates, staff shifts, days off, buffers, minimum notice and the booking window.",
          codeLabel: "migrations/0003_booking_engine.sql",
          codeHref: "https://github.com/russalforque/appointly/blob/HEAD/supabase/migrations/0003_booking_engine.sql",
        },
        {
          title: "The browser holds no secret that matters",
          detail:
            "Only the public key ships to the client. What a request may read or change is decided by Row Level Security, not by holding a key.",
          codeLabel: "migrations/0002_rls.sql",
          codeHref: "https://github.com/russalforque/appointly/blob/HEAD/supabase/migrations/0002_rls.sql",
        },
      ],
      description:
        "Appointly is a web-based booking and scheduling platform that gives service businesses an online booking page, a shared calendar, and a customer list in one place. It was built to replace manual scheduling through calls, chats, and notebooks with a simple system customers and staff can both use.",
      problem:
        "Many small service businesses still take appointments through phone calls, text messages, and social media chats, then track them by hand. This leads to double bookings, missed appointments, scattered customer information, and time wasted going back and forth with customers just to find an open slot.",
      solution:
        "Designed and developed a booking platform where customers can view available time slots and book appointments online on their own, while the business manages every appointment from a shared calendar. Customer details are automatically kept in one list, giving the business an organized view of its schedule and clients without manual record-keeping.",
      features: [
        "Public online booking page for customers",
        "Real-time display of available time slots",
        "Shared calendar for managing appointments across staff",
        "Centralized customer list and records",
        "Appointment tracking and management",
        "Responsive design for desktop and mobile browsers",
        "Clean, business-friendly interface design",
        "Cloud deployment for anytime online access",
      ],
      liveUrl: "https://appointly-blond.vercel.app/",
      githubUrl: "https://github.com/russalforque/appointly",
    },
    {
      id: "ojt-timesheet",
      title: "OJT Timesheet Monitoring System",
      tagline: "Timesheets and attendance for on-the-job training programs",
      category: "Full stack",
      role: "Full-stack developer (thesis project)",
      year: "2025",
      featured: true,
      technologies: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
      architecture: [
        { name: "ASP.NET Core MVC", detail: "Controllers and Razor views in C#, with separate Admin and Trainee areas." },
        { name: "Entity Framework Core", detail: "Data access for tasks, timesheets and attendance." },
        { name: "SQL Server", detail: "One database for every record." },
      ],
      decisions: [
        {
          title: "Two roles, two workspaces",
          detail:
            "Administrators assign tasks and review reports. Trainees log timesheets and attendance. Each role sees only its own screens.",
        },
        {
          title: "One source of truth for hours",
          detail:
            "Timesheets, attendance and reports all read from the same SQL Server tables, in place of separate paper logs and spreadsheets.",
        },
      ],
      description:
        "A role-based OJT Timesheet Monitoring System built as my thesis project with C# and ASP.NET Core MVC. It gives administrators and trainees separate workspaces for assigning tasks, logging timesheets, tracking attendance, and generating reports.",
      problem:
        "Monitoring on-the-job training hours is often done with paper logs and spreadsheets, which makes it hard to assign work, verify attendance, and produce accurate reports for each trainee.",
      solution:
        "Developed a web application with separate Admin and Trainee roles that centralizes task assignment, timesheet management, attendance tracking, and reporting. SQL Server and Entity Framework Core keep all records in one place for accurate attendance monitoring.",
      features: [
        "Separate Admin and Trainee roles and functionality",
        "Task assignment from administrators to trainees",
        "Timesheet management and logging",
        "Attendance tracking",
        "Reporting to streamline OJT monitoring",
        "Centralized data management with SQL Server and Entity Framework Core",
      ],
      sourceNote: "Private repository",
    },
    {
      id: "powerwatch-cebu",
      title: "PowerWatch Cebu",
      tagline: "Power outage advisories and community reports for Cebu",
      category: "Full stack",
      role: "Web developer",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Leaflet", "Express"],
      liveUrl: "https://power-watch-indol.vercel.app/",
      githubUrl: "https://github.com/russalforque/power-watch",
    },
    {
      id: "philippines-disaster-ready",
      title: "Philippines Disaster Ready",
      tagline: "Disaster preparedness guides and emergency information",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://philippines-disaster-ready.vercel.app/",
      githubUrl: "https://github.com/russalforque/Philippines-Disaster-Ready",
    },
    {
      id: "dev-path-ph",
      title: "DEV PATH PH",
      tagline: "A learning roadmap for aspiring Filipino developers",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://dev-route-two.vercel.app/",
      githubUrl: "https://github.com/russalforque/dev-route",
    },
    {
      id: "designpath-uiux",
      title: "DesignPath",
      tagline: "A 12-phase learning roadmap for UI/UX design",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://ui-ux-road-map.vercel.app/",
      githubUrl: "https://github.com/russalforque/UI-UX-Road-Map",
    },
    {
      id: "ar-product-experience",
      title: "AR Product Experience",
      tagline: "View a product in 3D and place it in your room with WebAR",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "TypeScript", "Tailwind CSS", "model-viewer"],
      liveUrl: "https://web-ar-product-delta.vercel.app/",
      githubUrl: "https://github.com/russalforque/web-ar-product",
    },
    {
      id: "immersive-brand-campaign",
      title: "Immersive Brand Campaign",
      tagline: "A motion-driven campaign site concept",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://immersive-brand-campaign.vercel.app/",
      githubUrl: "https://github.com/russalforque/immersive-brand-campaign",
    },
    {
      id: "elan-private-resort",
      title: "Élan Private Resort",
      tagline: "A resort website built around large imagery and galleries",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://lan-private-resort.vercel.app/",
      githubUrl: "https://github.com/russalforque/-LAN-PRIVATE-RESORT",
    },
    {
      id: "personal-developer-portfolio",
      title: "First portfolio site",
      tagline: "The portfolio I built as a student",
      category: "Frontend",
      role: "Student developer",
      technologies: ["Vue.js", "Tailwind CSS", "GSAP"],
      liveUrl: "https://russalforque.github.io/al4k/",
      githubUrl: "https://github.com/russalforque/al4k",
    },
  ],

  experience: [
    {
      period: "Jun 2026 to Aug 2026",
      title: "Application and Cloud Support Associate",
      organization: "Accenture",
      location: "Cebu City",
      keyPoints: [
        "Completed training in cloud data architecture, Docker, DevOps and Kubernetes administration",
        "Built a working knowledge of cloud architecture, containers and how modern applications are deployed",
        "Applied SDLC, testing, troubleshooting and IT service management practices in an enterprise environment",
      ],
    },
    {
      period: "Jan 2024 to Apr 2024",
      title: "Web Developer Intern",
      organization: "A Guy I Know Cebu, Inc.",
      location: "Cebu City",
      keyPoints: [
        "Built TaskFlow, a full-stack task management system, with Vue.js, Laravel, MySQL and Firebase Authentication",
        "Implemented real-time task updates, task categories, secure sign-in and a responsive interface",
        "Tuned database queries and application code, improving system speed by about 30%",
      ],
    },
  ],

  education: [
    {
      period: "2025",
      degree: "BS Information Technology, major in Application Development",
      school: "Asian College of Technology",
      location: "Cebu City",
      notes: [
        "Coursework: data structures and algorithms, software engineering, operating systems, database systems, web and mobile development",
        "Thesis: OJT Timesheet Monitoring System in C# and ASP.NET Core MVC",
      ],
    },
  ],

  technologies: [
    {
      category: "Back end",
      items: ["C#", "ASP.NET Core", "Entity Framework Core", "Node.js", "Express", "Laravel"],
    },
    {
      category: "Front end",
      items: ["React", "TypeScript", "JavaScript", "Vue.js", "Tailwind CSS", "Bootstrap", "HTML and CSS"],
    },
    {
      category: "Databases",
      items: ["SQL Server", "MySQL", "SQLite", "PostgreSQL", "Supabase"],
    },
    {
      category: "Mobile and tools",
      items: ["Capacitor", "Vitest", "Cloudflare Workers", "Git and GitHub", "REST APIs"],
    },
  ],

  familiar: ["Docker", "Kubernetes", "AWS", "GCP", "CI/CD", "Python", "MongoDB"],

  certifications: [
    {
      id: "kubernetes-fundamentals",
      certNumber: "761125",
      title: "Kubernetes Administrator: Kubernetes Fundamentals for Administrators",
      provider: "Percipio",
      completed: "Jul 23, 2026",
      duration: "1 hr 28 min",
      image: "/assets/certificates/kubernetes-fundamentals.jpg",
    },
    {
      id: "using-docker-for-devops",
      certNumber: "759710",
      title: "Using Docker for DevOps: Introduction to Docker",
      provider: "Percipio",
      completed: "Jul 23, 2026",
      duration: "1 hr 7 min",
      image: "/assets/certificates/using-docker-for-devops.jpg",
    },
    {
      id: "devops-with-docker",
      certNumber: "760177",
      title: "DevOps with Docker: Container Management",
      provider: "Percipio",
      completed: "Jul 23, 2026",
      duration: "52 min",
      image: "/assets/certificates/devops-with-docker.jpg",
    },
    {
      id: "cloud-data-architecture",
      certNumber: "758152",
      title: "Cloud Data Architecture: Cloud Architecture & Containerization",
      provider: "Percipio",
      completed: "Jul 23, 2026",
      duration: "44 min",
      image: "/assets/certificates/cloud-data-architecture.jpg",
    },
  ],
};
