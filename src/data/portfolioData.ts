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
      technologies: ["React", "TypeScript", "Tailwind CSS", "REST APIs", "Mapbox / Leaflet"],
      
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
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "SQL / Database"],
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
  technologies: ["React", "TypeScript", "Tailwind CSS", "WebAR", "3D Product Visualization"],
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
  technologies: ["React", "TypeScript", "Tailwind CSS", "Interactive Web Design", "Motion & Animation"],
  features: [
    "Interactive storytelling designed to guide users through the campaign experience",
    "Motion-driven transitions and visual elements that enhance engagement",
    "Immersive content presentation focused on brand identity and narrative",
    "Responsive interface optimized for a seamless experience across devices"
  ],
  highlights: "Immersive digital campaign blending storytelling, motion, and interactive brand experiences",
  liveUrl: "https://immersive-brand-campaign.vercel.app/",
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