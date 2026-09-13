export interface ProjectMetric {
  label: string;
  value: string;
  context?: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: 'Web Development' | 'Full Stack' | 'UI/UX' | 'Cloud & System';
  role: string;
  systemType?: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  metrics?: ProjectMetric[];
  liveUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  highlights?: string;
  colorAccent?: string;
}

export interface ExperienceItem {
  year: string;
  title: string;
  roleType: string;
  organization: string;
  location: string;
  description: string;
  keyPoints: string[];
}

export interface CertificateItem {
  id: string;
  certNumber: string;
  title: string;
  subtitle: string;
  year: string;
  issuer: string;
  description: string;
  topics: string[];
}

export interface PortfolioData {
  name: string;
  tagline: string;
  titles: string[];
  bio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  resumeDownloadName: string;
  projects: Project[];
  experience: ExperienceItem[];
  technologies: {
    category: string;
    items: string[];
  }[];
  certifications: CertificateItem[];
}

export const portfolioData: PortfolioData = {
name: "Rhazel",

tagline: "Full Stack Developer · Application & Cloud Support Associate",

titles: [
  "Full Stack Developer",
  "Application & Cloud Support Associate",
  "Web Developer"
],

bio: "I’m a Full Stack Developer who loves turning rough ideas and real-world problems into software people can actually use. I enjoy building clean, practical applications while constantly learning, solving problems, and turning ideas into something meaningful.",



location: "Cebu City, Philippines",

email: "russavenido@gmail.com",

phone: "+63 927 352 4231",

github: "https://github.com/russalforque",

linkedin: "https://www.linkedin.com/in/rhazel-alforoque-000643295/",

facebook: "https://www.facebook.com/rhazel.alforque",

instagram: "https://www.instagram.com/ru.uss/",

resumeDownloadName: "Rhazel Avenido Alforque Resume.pdf",



  projects: [
    {
      id: "powerwatch-cebu",
      number: "01",
      title: "PowerWatch Cebu",
      tagline: "Community electricity advisory & outage reporting platform",
      category: "Web Development",
      role: "Frontend & Web Developer",
      systemType: "Distributed Geospatial Web App",
      description: "A community-centered electricity advisory and power outage tracking platform designed for residents across Cebu. Enables real-time incident reports, scheduled maintenance advisories, and neighborhood grid statuses.",
      problem: "Residents and small business owners in Cebu frequently encounter sudden electrical interruptions with delayed advisories, causing disrupted operations and lack of visibility.",
      solution: "Engineered a high-performance web dashboard that maps power grid notifications, aggregates user outage reports, and delivers real-time feeder advisory updates.",
      technologies: [""],      
      features: [
        "Interactive neighborhood power status map",
        "Community outage crowdsourcing & verification",
        "Feeder advisory timeline with scheduled maintenance",
        "High-contrast light interface optimized for low-bandwidth mobile connections"
      ],
      highlights: "Real-time community tracking & localized feeder alerts",
      liveUrl: "https://power-watch-indol.vercel.app/",
      githubUrl: "https://github.com/russalforque/power-watch"
    },
    {
      id: "swiftwash",
      number: "03",
      title: "SwiftWash",
      tagline: "Laundry operations & pickup dispatch management system",
      category: "Web Development",
      role: "Full-Stack Developer",
      systemType: "Real-Time Pipeline Dispatch System",
      description: "A digital management system created for modern commercial laundry service owners to coordinate customer orders, dispatch pickup schedules, track washing stages, and oversee daily business revenue.",
      problem: "Small laundry business owners struggle with ticket misplacement, untracked weight measurements, unclear washing phases, and delayed customer collection notices.",
      solution: "Developed an intuitive single-page operational hub enabling seamless order creation, automated service stage progression (Wash, Dry, Fold, Ready), and customer SMS/pickup scheduling.",
      technologies: [""],      
      metrics: [
        { label: "Stage Tracking", value: "Real-Time State" },
        { label: "Turnaround Time", value: "Same-Day Ready" },
        { label: "Notification", value: "Automated SMS Alert" }
      ],
      features: [
        "Live order pipeline board from pickup intake to customer dispatch",
        "Dynamic weight calculation and customized fabric care pricing",
        "Customer notification trigger when laundry enters 'Ready for Pickup'",
        "Daily store receipts, revenue analytics, and service queue metrics"
      ],
      highlights: "Live production system with end-to-end order lifecycle tracking",
      liveUrl: "https://swiftwash-demo.vercel.app/",
      githubUrl: "https://github.com/russalforque"
    },
    {
  id: "ar-product-experience",
  number: "03",
  title: "AR Product Experience",
  tagline: "Interactive WebAR product visualization for immersive shopping",
  category: "Web Development",
  role: "Frontend & Web Developer",
  systemType: "WebAR Product Visualization Platform",
  description: "An interactive WebAR experience designed to help customers visualize products in their own environment before making a purchase. The platform combines 3D product visualization, spatial interaction, and a minimal interface to create a seamless digital-to-physical shopping journey.",
  problem: "Online shoppers often struggle to understand how a product will look, fit, or feel in their own space. Static product images provide limited context, making it difficult to visualize the real-world experience before buying.",
  solution: "Developed an immersive WebAR experience that allows users to explore products in 3D and preview them within their own environment using their device camera. The experience focuses on intuitive spatial interaction and a streamlined interface that makes product discovery more engaging and informative.",
      technologies: [""],      
  features: [
    "Interactive 3D product visualization for an immersive browsing experience",
    "WebAR functionality that allows customers to preview products in their own environment",
    "Spatial interaction designed to help users understand product scale and placement",
    "Minimal, responsive interface focused on seamless product discovery"
  ],
  highlights: "Immersive WebAR product experience bridging digital browsing and physical visualization",
  liveUrl: "https://web-ar-product-delta.vercel.app/",
  githubUrl: "https://github.com/russalforque"
},
{
  id: "immersive-brand-campaign",
  number: "04",
  title: "Immersive Brand Campaign",
  tagline: "Interactive storytelling and motion-driven brand experience",
  category: "Web Development",
  role: "Frontend & Web Developer",
  systemType: "Interactive Brand Experience",
  description: "A digital campaign concept combining interactive storytelling, motion, and immersive content to create a memorable brand experience. Designed to explore how engaging digital experiences can communicate a brand's identity and connect with audiences.",
  problem: "Traditional campaign pages can feel static and fail to capture attention. Brands need more engaging digital experiences that communicate their message while encouraging users to explore and interact.",
  solution: "Developed an immersive campaign website that combines storytelling, motion, and interactive content into a cohesive digital experience. The project focuses on visual engagement, smooth interactions, and a memorable journey from introduction to discovery.",
      technologies: [""],      
  features: [
    "Interactive storytelling designed to guide users through the campaign experience",
    "Motion-driven transitions and visual elements that enhance engagement",
    "Immersive content presentation focused on brand identity and narrative",
    "Responsive interface optimized for a seamless experience across devices"
  ],
  highlights: "Immersive digital campaign blending storytelling, motion, and interactive brand experiences",
  liveUrl: "https://immersive-brand-campaign.vercel.app/",
  githubUrl: "https://github.com/russalforque"
},

{
  id: "elan-private-resort",
  number: "05",
  title: "Élan Private Resort",
  tagline: "Luxury hospitality website with immersive island storytelling",
  category: "Web Development",
  role: "Frontend & Web Developer",
  systemType: "Luxury Resort Experience Platform",
  description: "A premium digital experience for Élan Private Resort, a secluded private-island sanctuary in Palawan, Philippines. The website combines immersive visual storytelling, luxury accommodation showcases, curated experiences, dining, wellness, and destination information into a sophisticated hospitality platform.",
  problem: "Luxury resorts need more than a traditional informational website to communicate exclusivity and atmosphere. Static layouts can make it difficult for visitors to understand the character of the destination, visualize accommodations, and explore the experiences available before booking.",
  solution: "Developed an immersive resort website centered around visual storytelling and intuitive exploration. The experience presents the resort's private villas, island experiences, dining, wellness offerings, nature, and arrival journey through large-scale imagery, editorial typography, structured content sections, and responsive interactions.",
      technologies: [""],      
  features: [
    "Immersive hero section introducing the private-island resort experience",
    "Interactive resort experience showcase covering beaches, ocean activities, dining, wellness, nature, and sunsets",
    "Luxury villa presentation with detailed accommodation information, capacities, features, and visual galleries",
    "Curated visual archive with categorized resort photography and fullscreen viewing",
    "Fine dining section presenting signature restaurant concepts and tasting experiences",
    "Wellness experience showcase featuring Hilot healing, sound baths, yoga, and botanical treatments",
    "Island excursions covering cruises, diving, sailing, kayaking, and rainforest trekking",
    "Destination and arrival experience section highlighting private seaplane and yacht transfers"
  ],
  highlights: "Immersive luxury hospitality experience combining visual storytelling, accommodation discovery, and destination exploration",
  liveUrl: "https://lan-private-resort.vercel.app/",
  githubUrl: "https://github.com/russalforque"
},

{
  id: "philippines-disaster-ready",
  number: "05",
  title: "Philippines Disaster Ready",
  tagline: "Public-service emergency information and disaster preparedness platform",
  category: "Web Development",
  role: "Frontend & Web Developer",
  systemType: "Disaster Preparedness & Emergency Information Platform",
  description: "A production-quality frontend information platform designed to help communities across the Philippines quickly understand disaster risks, prepare for emergencies, and access reliable safety information. The experience combines editorial storytelling, live hazard data, emergency resources, interactive preparedness tools, and accessibility-focused UX into a mobile-first public-service website.",
  problem: "During emergencies, people need clear and trustworthy information quickly. Traditional information-heavy websites can make it difficult to understand what actions to take before, during, and after a disaster, while disconnected resources can force users to search across multiple sources for critical information.",
  solution: "Developed a mobile-first disaster preparedness platform that organizes emergency information around real user needs. The website provides disaster guides, emergency numbers, active hazard information, interactive preparedness checklists, family planning resources, evacuation guidance, and links to official Philippine agencies while clearly distinguishing live information from educational or demo content.",
       technologies: [""],      

 features: [
  "Mobile-first disaster information and hazard guides",
  "Live weather and earthquake data with API error handling",
  "Emergency numbers with mobile-friendly CALL NOW actions",
  "Interactive Before / During / After disaster guidance",
  "Persistent emergency kit checklist using LocalStorage",
  "Family emergency planning and evacuation guidance",
  "Philippines map with location-based preparedness information",
  "Trusted official sources with live/demo data transparency",
  "Accessible, responsive, and performance-optimized interface"
],
  highlights: "Trust-focused disaster preparedness platform combining real-world API architecture, emergency UX, accessibility, persistent local interactions, and reliable-source transparency",
  liveUrl: "https://philippines-disaster-ready.vercel.app/",
  githubUrl: "https://github.com/russalforque"
},

{
  id: "dev-path-ph",
  number: "06",
  title: "DEV PATH PH",
  tagline: "A practical roadmap for becoming a developer",
  category: "Web Development",
  role: "Frontend & Web Developer",
  systemType: "Developer Learning & Roadmap Platform",
  description: "A production-quality frontend educational platform designed to help aspiring Filipino developers understand what to learn, in what order, and what projects to build. The platform combines structured technology roadmaps, skill dependencies, progress tracking, project recommendations, learning resources, and career guidance into a practical, mobile-first learning experience.",
  problem: "Aspiring developers often struggle to identify which technologies to learn first, how skills depend on one another, and what projects to build at each stage. Scattered tutorials and generic roadmaps can make learning feel overwhelming and disconnected from real-world development.",
  solution: "Developed an interactive developer learning platform that organizes skills into practical career roadmaps. Users can explore technology dependencies, view detailed skill guidance, track their learning progress, discover project ideas, access curated resources, and understand the skills required for different developer careers.",
        technologies: [""],      

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
    "Dark/light-capable technical editorial interface"
  ],
  highlights: "Practical developer education platform combining interactive roadmaps, skill dependency visualization, persistent progress tracking, project-based learning, curated resources, and career planning",
  liveUrl: "https://dev-route-two.vercel.app/",
  githubUrl: "https://github.com/russalforque"
},

{
  id: "designpath-uiux",
  number: "07",
  title: "DesignPath — UI/UX Learning Roadmap",
  tagline: "Your structured path from UI/UX beginner to job-ready designer",
  category: "Web Development",
  role: "Frontend & UX Developer",
  systemType: "Interactive UI/UX Learning & Roadmap Platform",
  description: "A production-quality frontend learning platform designed to guide aspiring UI/UX designers from fundamentals to job-ready skills. The experience combines an interactive learning roadmap, skill dependency mapping, progress tracking, project recommendations, resource discovery, UX principles, and daily design challenges into a structured learning journey.",
  problem: "Aspiring designers often struggle to understand what to learn first, how UX and UI skills connect, and how to turn theory into practical experience. Scattered tutorials and generic checklists provide information but rarely offer a clear, progressive learning path.",
  solution: "Developed an interactive learning platform that organizes UI/UX education into 12 structured phases, connecting skills through prerequisites and practical exercises. Users can explore detailed skill guides, track progress, bookmark resources, discover portfolio projects, practice daily challenges, and follow personalized recommendations for their next skill.",
        technologies: [""],      

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
    "Accessible, responsive interface with polished dark mode and reduced-motion support"
  ],
  highlights: "Interactive UI/UX education platform demonstrating strong information architecture, data-driven React architecture, dependency-based learning flows, persistent client-side state, accessibility-focused UX, responsive design, and practical portfolio development",
  liveUrl: "https://ui-ux-road-map.vercel.app/",
  githubUrl: "https://github.com/russalforque"
},


{
  id: "personal-developer-portfolio",
  number: "08",
  title: "Personal Developer Portfolio",
  tagline: "My first portfolio website built during my academic journey",
  category: "Web Development",
  role: "Student Developer & UI/UX Designer",
  systemType: "Personal Portfolio Website",

  description: "My first personal portfolio website, developed during my academic journey to document my growth as an aspiring developer and showcase the projects, skills, and experiences I gained while studying Information Technology. It represents an early stage of my journey into web development and UI/UX design.",

  problem: "As a student developer, I needed a way to bring together the projects I worked on during my studies and present my skills and development journey in one place. I also wanted to move beyond simply listing projects and create a website that reflected how I was learning and growing as a developer.",

  solution: "Designed and developed my first personal portfolio website to showcase academic projects, development skills, UI/UX work, and my progression as an aspiring software developer. The project gave me an opportunity to apply what I had learned in web development while experimenting with interface design, responsive layouts, and presenting technical work through a personal website.",

  technologies: [
  
  ],

  features: [
    "Personal introduction and developer profile",
    "Project showcase for academic and personal projects",
    "Technical skills and technologies presentation",
    "Responsive website layout for different screen sizes",
    "Personalized visual identity and interface design",
    "Project descriptions highlighting development work",
    "Contact and professional information",
    "Portfolio structure designed around personal storytelling"
  ],

  highlights: "My first developer portfolio built during my academic journey, demonstrating my early experience with web development, responsive design, UI/UX, project presentation, and building a personal digital identity",

  liveUrl: "https://russalforque.github.io/al4k/",
  githubUrl: "https://github.com/russalforque"
}




    
  ],

  experience: [
    {
  year: "2026",
  title: "Application & Cloud Support Associate",
  roleType: "Professional Experience",
  organization: "Accenture",
  location: "Cebu, Philippines",
  description: "Supported application and cloud-related operations while developing foundational knowledge in cloud architecture, DevOps, containerization, and the software development lifecycle.",
  keyPoints: [
    "Completed training in cloud data architecture, Docker, DevOps, and Kubernetes administration",
    "Developed foundational knowledge of cloud architecture, containerization, and modern application deployment practices",
    "Applied SDLC, testing, troubleshooting, and IT service management concepts in an enterprise environment"
  ]
},
    {
  year: "2024",
  title: "Web Developer Intern",
  roleType: "Internship",
  organization: "A Guy I Know Cebu – Inc.",
  location: "Cebu, Philippines",
  description: "Developed and enhanced full-stack web applications, focusing on task management, responsive interfaces, authentication, real-time updates, and database performance.",
  keyPoints: [
    "Developed TaskFlow, a full-stack task management system using Vue.js, Laravel, MySQL, and Firebase Authentication",
    "Implemented real-time task updates, task categorization, secure authentication, and responsive UI features",
    "Optimized database performance and application functionality, improving system speed by approximately 30%"
  ]
},


  ],

  technologies: [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Vue.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Bootstrap"]
    },
    {
      category: "Backend",
      items: ["C#", ".NET", "ASP.NET Core", "ASP.NET MVC", "Entity Framework", "REST APIs", "Node.js"]
    },
    {
      category: "Database",
      items: ["SQL Server", "MySQL", "MongoDB", "Database Design"]
    },
    {
      category: "Cloud / DevOps",
      items: ["Docker", "Kubernetes", "GCP", "Git & GitHub", "CI/CD Workflows", "Linux / CLI"]
    }
  ],

  certifications: [
    {
      id: "cloud-data",
      certNumber: "758152",
      title: "CLOUD DATA ARCHITECTURE",
      subtitle: "Cloud Architecture & Containerization",
      year: "2026",
      issuer: "Technical Cloud Accreditation",
      description: "Advanced training focused on modern cloud data architecture, cloud infrastructure provisioning, scalable storage design, and containerization patterns.",
      topics: ["Cloud Architecture", "Containerization", "Storage Systems", "Infrastructure Reliability"]
    },
    {
      id: "docker-devops",
      certNumber: "759710",
      title: "USING DOCKER FOR DEVOPS",
      subtitle: "Introduction to Docker & Containers",
      year: "2026",
      issuer: "DevOps Professional Series",
      description: "Core certification covering Docker fundamentals, container virtualization, Dockerfile optimization, multi-container orchestration, and containerized development workflows.",
      topics: ["Docker Fundamentals", "Image Optimization", "Container Lifecycle", "DevOps Pipelines"]
    },
    {
      id: "kubernetes-admin",
      certNumber: "761125",
      title: "KUBERNETES ADMINISTRATOR",
      subtitle: "Kubernetes Fundamentals for Administrators",
      year: "2026",
      issuer: "Cloud Native Computing Training",
      description: "Hands-on training covering Kubernetes cluster architecture, pods, services, deployments, ingress controllers, resource constraints, and production cluster troubleshooting.",
      topics: ["Cluster Architecture", "Pod & Service Management", "Orchestration", "Diagnostics"]
    },
    {
      id: "docker-mgmt",
      certNumber: "760177",
      title: "DEVOPS WITH DOCKER",
      subtitle: "Container Management in GCP",
      year: "2026",
      issuer: "Cloud Container Specialization",
      description: "Comprehensive training on container deployment automation, cloud container registries, scaling strategies, and environment configurations in Google Cloud Platform.",
      topics: ["GCP Container Registry", "Automation", "Container Security", "Continuous Integration"]
    }
  ]
};