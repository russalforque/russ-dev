export interface Project {
  id: string;
  /** Two-digit position in the list, also used by the terminal */
  number: string;
  title: string;
  /** One line: what it is and who it is for */
  tagline: string;
  category: 'Full stack' | 'Frontend';
  role: string;
  year?: string;
  /** Shown in full at the top of the work section */
  featured?: boolean;
  /** Names must match the ones in `skills` so the skill filter can count them */
  technologies: string[];
  /** What the project is evidence of. Featured projects only. */
  proves?: string[];
  description: string;
  problem: string;
  solution: string;
  features: string[];
  /** Optional screenshot in public/, e.g. "/assets/projects/swiftwash.jpg" */
  image?: string;
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
      id: "swiftwash",
      number: "01",
      title: "SwiftWash",
      tagline: "Laundry management system for small laundry shops",
      category: "Full stack",
      role: "Full-stack developer",
      featured: true,
      technologies: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "React", "JavaScript", "Bootstrap"],
      proves: [
        "ASP.NET Core 8 Web API split into Domain, Application, Infrastructure and API projects",
        "EF Core on SQL Server behind repositories and a unit of work",
        "JWT sign-in with Admin and Cashier roles, plus audit-trail and exception middleware",
        "React front end with PDF and Excel report export and QR code receipts",
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
      number: "02",
      title: "Sellix POS",
      tagline: "Point of sale for small stores, on Android phones and tablets",
      category: "Full stack",
      role: "Full-stack developer and UI designer",
      year: "2026",
      featured: true,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Capacitor", "SQLite", "C#", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
      proves: [
        "React and TypeScript app packaged for Android with Capacitor, storing data locally in SQLite",
        "ASP.NET Core 8 API with EF Core, SQL Server and JWT sign-in",
        "A C# Windows print agent that polls a job queue and prints ESC/POS receipts",
        "Bluetooth receipt printers and cash drawers, staff roles and shift history",
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
      id: "ojt-timesheet",
      number: "03",
      title: "OJT Timesheet Monitoring System",
      tagline: "Timesheets and attendance for on-the-job training programs",
      category: "Full stack",
      role: "Full-stack developer (thesis project)",
      year: "2025",
      featured: true,
      technologies: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
      proves: [
        "ASP.NET Core MVC application in C# with separate Admin and Trainee areas",
        "SQL Server database through Entity Framework Core",
        "Task assignment, timesheets, attendance tracking and reports",
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
      id: "appointly",
      number: "04",
      title: "Appointly",
      tagline: "Online booking and scheduling for service businesses",
      category: "Full stack",
      role: "Full-stack developer and UI designer",
      year: "2026",
      featured: true,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
      proves: [
        "React 19 and TypeScript app with no application server: the browser talks to Supabase directly",
        "Access rules enforced in Postgres with Row Level Security",
        "Public booking page with open time slots, a shared staff calendar and a customer list",
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
      id: "powerwatch-cebu",
      number: "05",
      title: "PowerWatch Cebu",
      tagline: "Power outage advisories and community reports for Cebu",
      category: "Full stack",
      role: "Web developer",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Leaflet", "Express"],
      description:
        "A community-centered electricity advisory and power outage tracking platform designed for residents across Cebu. Enables real-time incident reports, scheduled maintenance advisories, and neighborhood grid statuses.",
      problem:
        "Residents and small business owners in Cebu frequently encounter sudden electrical interruptions with delayed advisories, causing disrupted operations and lack of visibility.",
      solution:
        "Built a web dashboard that maps power grid notifications, aggregates user outage reports, and delivers real-time feeder advisory updates.",
      features: [
        "Interactive neighborhood power status map",
        "Community outage crowdsourcing & verification",
        "Feeder advisory timeline with scheduled maintenance",
        "High-contrast light interface optimized for low-bandwidth mobile connections",
      ],
      liveUrl: "https://power-watch-indol.vercel.app/",
      githubUrl: "https://github.com/russalforque/power-watch",
    },
    {
      id: "philippines-disaster-ready",
      number: "06",
      title: "Philippines Disaster Ready",
      tagline: "Disaster preparedness guides and emergency information",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      description:
        "A frontend information platform designed to help communities across the Philippines quickly understand disaster risks, prepare for emergencies, and access reliable safety information. The experience combines editorial storytelling, live hazard data, emergency resources, interactive preparedness tools, and accessibility-focused UX into a mobile-first public-service website.",
      problem:
        "During emergencies, people need clear and trustworthy information quickly. Traditional information-heavy websites can make it difficult to understand what actions to take before, during, and after a disaster, while disconnected resources can force users to search across multiple sources for critical information.",
      solution:
        "Developed a mobile-first disaster preparedness platform that organizes emergency information around real user needs. The website provides disaster guides, emergency numbers, active hazard information, interactive preparedness checklists, family planning resources, evacuation guidance, and links to official Philippine agencies while clearly distinguishing live information from educational or demo content.",
      features: [
        "Mobile-first disaster information and hazard guides",
        "Live weather and earthquake data with API error handling",
        "Emergency numbers with mobile-friendly CALL NOW actions",
        "Interactive Before / During / After disaster guidance",
        "Persistent emergency kit checklist using LocalStorage",
        "Family emergency planning and evacuation guidance",
        "Philippines map with location-based preparedness information",
        "Trusted official sources with live/demo data transparency",
        "Accessible, responsive, and performance-optimized interface",
      ],
      liveUrl: "https://philippines-disaster-ready.vercel.app/",
      githubUrl: "https://github.com/russalforque/Philippines-Disaster-Ready",
    },
    {
      id: "dev-path-ph",
      number: "07",
      title: "DEV PATH PH",
      tagline: "A learning roadmap for aspiring Filipino developers",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      description:
        "A frontend educational platform designed to help aspiring Filipino developers understand what to learn, in what order, and what projects to build. The platform combines structured technology roadmaps, skill dependencies, progress tracking, project recommendations, learning resources, and career guidance into a practical, mobile-first learning experience.",
      problem:
        "Aspiring developers often struggle to identify which technologies to learn first, how skills depend on one another, and what projects to build at each stage. Scattered tutorials and generic roadmaps can make learning feel overwhelming and disconnected from real-world development.",
      solution:
        "Developed an interactive developer learning platform that organizes skills into practical career roadmaps. Users can explore technology dependencies, view detailed skill guidance, track their learning progress, discover project ideas, access curated resources, and understand the skills required for different developer careers.",
      features: [
        "Frontend, Backend, Full Stack, and DevOps learning roadmaps",
        "Interactive skill dependency graph with clickable technology nodes",
        "Detailed skill guides covering prerequisites, learning topics, mistakes, and difficulty",
        "Persistent learning progress with Not Started / In Progress / Completed states",
        "Project recommendations mapped to individual roadmap stages",
        "Curated documentation, tutorials, courses, and practice resources",
        "FREE / PAID resource labeling without fabricated links",
        "Career paths covering developer roles, skills, projects, and roadmaps",
        "Mobile-responsive roadmap flows with vertical dependency layouts",
        "Dark/light-capable technical editorial interface",
      ],
      liveUrl: "https://dev-route-two.vercel.app/",
      githubUrl: "https://github.com/russalforque/dev-route",
    },
    {
      id: "designpath-uiux",
      number: "08",
      title: "DesignPath",
      tagline: "A 12-phase learning roadmap for UI/UX design",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      description:
        "A frontend learning platform designed to guide aspiring UI/UX designers from fundamentals to job-ready skills. The experience combines an interactive learning roadmap, skill dependency mapping, progress tracking, project recommendations, resource discovery, UX principles, and daily design challenges into a structured learning journey.",
      problem:
        "Aspiring designers often struggle to understand what to learn first, how UX and UI skills connect, and how to turn theory into practical experience. Scattered tutorials and generic checklists provide information but rarely offer a clear, progressive learning path.",
      solution:
        "Developed an interactive learning platform that organizes UI/UX education into 12 structured phases, connecting skills through prerequisites and practical exercises. Users can explore detailed skill guides, track progress, bookmark resources, discover portfolio projects, practice daily challenges, and follow personalized recommendations for their next skill.",
      features: [
        "12-phase UI/UX roadmap from fundamentals through portfolio development",
        "Interactive skill dependency map with prerequisites and related skills",
        "Detailed skill pages with concepts, exercises, challenges, tools, and resources",
        "Persistent progress tracking for skills and projects using LocalStorage",
        "Global skill search with phase, difficulty, and completion filters",
        "Project library with beginner-to-advanced UX portfolio projects",
        "Searchable resource library with persistent bookmarks and FREE / PAID labels",
        "Personalized Continue Learning recommendations based on progress and prerequisites",
        "UX principles library and daily design challenges",
        "Accessible, responsive interface with polished dark mode and reduced-motion support",
      ],
      liveUrl: "https://ui-ux-road-map.vercel.app/",
      githubUrl: "https://github.com/russalforque/UI-UX-Road-Map",
    },
    {
      id: "ar-product-experience",
      number: "09",
      title: "AR Product Experience",
      tagline: "View a product in 3D and place it in your room with WebAR",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "TypeScript", "Tailwind CSS", "model-viewer"],
      description:
        "An interactive WebAR experience designed to help customers visualize products in their own environment before making a purchase. The platform combines 3D product visualization, spatial interaction, and a minimal interface to create a seamless digital-to-physical shopping journey.",
      problem:
        "Online shoppers often struggle to understand how a product will look, fit, or feel in their own space. Static product images provide limited context, making it difficult to visualize the real-world experience before buying.",
      solution:
        "Developed an immersive WebAR experience that allows users to explore products in 3D and preview them within their own environment using their device camera. The experience focuses on intuitive spatial interaction and a streamlined interface that makes product discovery more engaging and informative.",
      features: [
        "Interactive 3D product visualization for an immersive browsing experience",
        "WebAR functionality that allows customers to preview products in their own environment",
        "Spatial interaction designed to help users understand product scale and placement",
        "Minimal, responsive interface focused on seamless product discovery",
      ],
      liveUrl: "https://web-ar-product-delta.vercel.app/",
      githubUrl: "https://github.com/russalforque/web-ar-product",
    },
    {
      id: "immersive-brand-campaign",
      number: "10",
      title: "Immersive Brand Campaign",
      tagline: "A motion-driven campaign site concept",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
      description:
        "A digital campaign concept combining interactive storytelling, motion, and immersive content to create a memorable brand experience. Designed to explore how engaging digital experiences can communicate a brand's identity and connect with audiences.",
      problem:
        "Traditional campaign pages can feel static and fail to capture attention. Brands need more engaging digital experiences that communicate their message while encouraging users to explore and interact.",
      solution:
        "Developed an immersive campaign website that combines storytelling, motion, and interactive content into a cohesive digital experience. The project focuses on visual engagement, smooth interactions, and a memorable journey from introduction to discovery.",
      features: [
        "Interactive storytelling designed to guide users through the campaign experience",
        "Motion-driven transitions and visual elements that enhance engagement",
        "Immersive content presentation focused on brand identity and narrative",
        "Responsive interface optimized for a seamless experience across devices",
      ],
      liveUrl: "https://immersive-brand-campaign.vercel.app/",
      githubUrl: "https://github.com/russalforque/immersive-brand-campaign",
    },
    {
      id: "elan-private-resort",
      number: "11",
      title: "Élan Private Resort",
      tagline: "A resort website built around large imagery and galleries",
      category: "Frontend",
      role: "Frontend developer",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      description:
        "A premium digital experience for Élan Private Resort, a secluded private-island sanctuary in Palawan, Philippines. The website combines immersive visual storytelling, luxury accommodation showcases, curated experiences, dining, wellness, and destination information into a sophisticated hospitality platform.",
      problem:
        "Luxury resorts need more than a traditional informational website to communicate exclusivity and atmosphere. Static layouts can make it difficult for visitors to understand the character of the destination, visualize accommodations, and explore the experiences available before booking.",
      solution:
        "Developed an immersive resort website centered around visual storytelling and intuitive exploration. The experience presents the resort's private villas, island experiences, dining, wellness offerings, nature, and arrival journey through large-scale imagery, editorial typography, structured content sections, and responsive interactions.",
      features: [
        "Immersive hero section introducing the private-island resort experience",
        "Interactive resort experience showcase covering beaches, ocean activities, dining, wellness, nature, and sunsets",
        "Luxury villa presentation with detailed accommodation information, capacities, features, and visual galleries",
        "Curated visual archive with categorized resort photography and fullscreen viewing",
        "Fine dining section presenting signature restaurant concepts and tasting experiences",
        "Wellness experience showcase featuring Hilot healing, sound baths, yoga, and botanical treatments",
        "Island excursions covering cruises, diving, sailing, kayaking, and rainforest trekking",
        "Destination and arrival experience section highlighting private seaplane and yacht transfers",
      ],
      liveUrl: "https://lan-private-resort.vercel.app/",
      githubUrl: "https://github.com/russalforque/-LAN-PRIVATE-RESORT",
    },
    {
      id: "personal-developer-portfolio",
      number: "12",
      title: "First portfolio site",
      tagline: "The portfolio I built as a student",
      category: "Frontend",
      role: "Student developer",
      technologies: ["Vue.js", "Tailwind CSS", "GSAP"],
      description:
        "My first personal portfolio website, developed during my academic journey to document my growth as an aspiring developer and showcase the projects, skills, and experiences I gained while studying Information Technology. It represents an early stage of my journey into web development and UI/UX design.",
      problem:
        "As a student developer, I needed a way to bring together the projects I worked on during my studies and present my skills and development journey in one place. I also wanted to move beyond simply listing projects and create a website that reflected how I was learning and growing as a developer.",
      solution:
        "Designed and developed my first personal portfolio website to showcase academic projects, development skills, UI/UX work, and my progression as an aspiring software developer. The project gave me an opportunity to apply what I had learned in web development while experimenting with interface design, responsive layouts, and presenting technical work through a personal website.",
      features: [
        "Personal introduction and developer profile",
        "Project showcase for academic and personal projects",
        "Technical skills and technologies presentation",
        "Responsive website layout for different screen sizes",
        "Personalized visual identity and interface design",
        "Project descriptions highlighting development work",
        "Contact and professional information",
        "Portfolio structure designed around personal storytelling",
      ],
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
      items: ["Capacitor", "Git and GitHub", "REST APIs"],
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
