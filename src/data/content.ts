import { profile } from "./profile";

/** Animated counter stats in the hero. */
export const stats = [
  { value: 12, suffix: "+", label: "Projects Built", color: "#00E5FF" },
  { value: 9, suffix: "", label: "Programming Languages", color: "#7B61FF" },
  { value: 14, suffix: "+", label: "Frameworks & Tools", color: "#14F195" },
  { value: 6, suffix: "", label: "AI Models Shipped", color: "#00E5FF" },
  { value: 30, suffix: "+", label: "GitHub Repositories", color: "#7B61FF" },
  { value: 8, suffix: "+", label: "Technologies", color: "#14F195" },
  { value: 5, suffix: "+", label: "Certifications", color: "#00E5FF" },
];

/** Featured real projects — pulled from your GitHub. */
export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: "AI" | "Full Stack" | "Mobile" | "Desktop" | "Research";
  status: "Live" | "In Development" | "Beta";
  stack: string[];
  features: string[];
  description: string;
  accent: string;
  image: string; // picsum seed — swap for real promo stills
  repo: string; // full GitHub URL
};

export const projects: Project[] = [
  {
    id: "telegram-drive",
    index: "01",
    title: "Telegram Drive",
    tagline: "Cloud Storage Powered by Telegram",
    category: "Full Stack",
    status: "Live",
    stack: ["Go", "Telegram API", "REST", "React"],
    features: [
      "Unlimited Cloud Storage",
      "Telegram-backed File System",
      "Upload / Download / Stream",
      "Shareable File Links",
      "Encrypted at rest",
      "Modern Web UI",
    ],
    description:
      "A cloud storage platform that turns Telegram into an infinite drive — upload, organize, stream, and share files of any size, all backed by Telegram's infrastructure.",
    accent: "#00E5FF",
    image: "https://picsum.photos/seed/telegram-drive-nifras/1280/800",
    repo: "https://github.com/nfsprogramming/Telegram-Drive",
  },
  {
    id: "dream-in-parallel",
    index: "02",
    title: "Dream in Parallel",
    tagline: "Distributed Compute Orchestrator",
    category: "AI",
    status: "In Development",
    stack: ["Python", "Go", "Docker", "FastAPI"],
    features: [
      "Parallel Job Scheduling",
      "Distributed Workers",
      "Containerized Tasks",
      "Real-time Monitoring",
      "Auto-scaling",
    ],
    description:
      "An orchestrator for running heavy AI and compute workloads in parallel across distributed workers — schedule, scale, and monitor jobs from a single dashboard.",
    accent: "#7B61FF",
    image: "https://picsum.photos/seed/dream-parallel-nifras/1280/800",
    repo: "https://github.com/nfsprogramming/Dream-in-Parallel",
  },
  {
    id: "studymate-ai",
    index: "03",
    title: "StudyMate AI",
    tagline: "AI Study Assistant",
    category: "AI",
    status: "Beta",
    stack: ["Python", "LangChain", "FAISS", "Sentence Transformers", "React"],
    features: [
      "RAG",
      "AI Tutor",
      "Quiz Generator",
      "PDF Chat",
      "Personalized Learning",
    ],
    description:
      "A RAG-powered study assistant that turns any PDF into an interactive tutor — ask questions, generate quizzes, and follow a personalized learning path.",
    accent: "#14F195",
    image: "https://picsum.photos/seed/studymate-ai-nifras/1280/800",
    repo: "https://github.com/nfsprogramming/StudyMate-AI",
  },
  {
    id: "lumina-vision",
    index: "04",
    title: "Lumina Vision",
    tagline: "Computer Vision Platform",
    category: "AI",
    status: "In Development",
    stack: ["Python", "PyTorch", "OpenCV", "FastAPI"],
    features: [
      "Object Detection",
      "Image Segmentation",
      "Real-time Inference",
      "Model Marketplace",
      "Custom Training Pipelines",
    ],
    description:
      "A computer vision platform for building, deploying, and serving CV models — detection, segmentation, and real-time inference behind a clean API.",
    accent: "#00E5FF",
    image: "https://picsum.photos/seed/lumina-vision-nifras/1280/800",
    repo: "https://github.com/nfsprogramming/Lumina-Vision",
  },
  {
    id: "moodtune",
    index: "05",
    title: "MoodTune",
    tagline: "AI Music for Your Mood",
    category: "AI",
    status: "Beta",
    stack: ["Python", "Transformers", "React", "FastAPI"],
    features: [
      "Mood Detection",
      "Generative Music",
      "Personalized Playlists",
      "Audio Reactive Visuals",
      "Spotify Integration",
    ],
    description:
      "An AI that reads your mood and generates music to match — mood detection, generative audio, and reactive visuals in one experience.",
    accent: "#FF4D8D",
    image: "https://picsum.photos/seed/moodtune-nifras/1280/800",
    repo: "https://github.com/nfsprogramming/MoodTune",
  },
  {
    id: "shaha-rice",
    index: "06",
    title: "Shaha Rice Exports",
    tagline: "Business Portfolio & Order System",
    category: "Full Stack",
    status: "Live",
    stack: ["React", "Node.js", "MongoDB", "Tailwind"],
    features: [
      "Product Catalog",
      "Order Inquiry System",
      "Admin Dashboard",
      "Export Documentation",
      "WhatsApp Integration",
      "SEO Optimized",
    ],
    description:
      "A business portfolio and order-management site for an export company — catalog, inquiries, and an admin dashboard, all in one polished site.",
    accent: "#14F195",
    image: "https://picsum.photos/seed/shaha-rice-nifras/1280/800",
    repo: "https://github.com/nfsprogramming/Shaha-Rice-Export",
  },
  {
    id: "ai-perf-analyzer",
    index: "07",
    title: "AI Smart Performance Analyzer",
    tagline: "ML Prediction & Visualization",
    category: "Research",
    status: "In Development",
    stack: ["Python", "PyTorch", "scikit-learn", "Plotly"],
    features: [
      "Machine Learning",
      "Performance Analytics",
      "Prediction",
      "Visualization",
    ],
    description:
      "An ML performance analyzer that ingests system metrics, predicts failures before they happen, and visualizes the system's future behavior.",
    accent: "#7B61FF",
    image: "https://picsum.photos/seed/ai-perf-nifras/1280/800",
    repo: "https://github.com/nfsprogramming/AI-Smart-Perfomance-Anlayzer",
  },
  {
    id: "vision-ai",
    index: "08",
    title: "Vision AI",
    tagline: "End-to-End AI Vision Toolkit",
    category: "AI",
    status: "In Development",
    stack: ["Python", "PyTorch", "Transformers", "FastAPI"],
    features: [
      "OCR & Document AI",
      "Face & Gesture Recognition",
      "Video Analytics",
      "Edge Deployment",
      "REST + gRPC APIs",
    ],
    description:
      "An end-to-end AI vision toolkit — OCR, face and gesture recognition, and video analytics, packaged for both cloud and edge deployment.",
    accent: "#00E5FF",
    image: "https://picsum.photos/seed/vision-ai-nifras/1280/800",
    repo: "https://github.com/nfsprogramming/Vision-AI",
  },
];

/** Categorized skills. */
export const skillCategories = [
  {
    name: "AI",
    accent: "#00E5FF",
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Transformers",
      "LangChain",
      "RAG",
      "LLMs",
      "Prompt Engineering",
      "NLP",
      "Computer Vision",
      "FAISS",
      "Sentence Transformers",
    ],
  },
  {
    name: "Full Stack",
    accent: "#7B61FF",
    skills: [
      "React",
      "Flutter",
      "Node.js",
      "FastAPI",
      "Go",
      "REST API",
      "Authentication",
      "Supabase",
      "Firebase",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    name: "Cloud",
    accent: "#14F195",
    skills: ["Vercel", "Render", "Railway", "Docker", "GitHub", "Linux"],
  },
  {
    name: "Languages",
    accent: "#00E5FF",
    skills: [
      "Python",
      "Java",
      "C++",
      "C",
      "SQL",
      "JavaScript",
      "TypeScript",
      "Go",
      "Dart",
    ],
  },
];

/** Floating tech-stack icons for the showcase. */
export const techStack = [
  { name: "Python", glyph: "Py" },
  { name: "Flutter", glyph: "Fl" },
  { name: "React", glyph: "Re" },
  { name: "Go", glyph: "Go" },
  { name: "Docker", glyph: "Do" },
  { name: "FastAPI", glyph: "Fa" },
  { name: "MongoDB", glyph: "Mg" },
  { name: "Supabase", glyph: "Su" },
  { name: "Firebase", glyph: "Fb" },
  { name: "TensorFlow", glyph: "TF" },
  { name: "PyTorch", glyph: "Pt" },
  { name: "OpenCV", glyph: "CV" },
  { name: "Git", glyph: "Gt" },
  { name: "Linux", glyph: "Lx" },
];

/** Experience timeline. */
export const experience = [
  {
    year: "2025",
    title: "Building Sattam AI",
    type: "AI Projects",
    description:
      "Leading development of an AI legal assistant for the Indian legal system — RAG over Indian law corpora, document generation, and lawyer connect.",
  },
  {
    year: "2024",
    title: "Domain-Specific LLM Research",
    type: "Research",
    description:
      "Researching fine-tuned, domain-specific LLMs for legal and educational applications — evaluation, retrieval quality, and cost optimization.",
  },
  {
    year: "2024",
    title: "Hackathon Wins & Finalist",
    type: "Hackathons",
    description:
      "Built and shipped multiple AI products under hackathon deadlines — rapid prototyping, presentation, and production-grade engineering under pressure.",
  },
  {
    year: "2023",
    title: "Open Source Contributions",
    type: "Open Source",
    description:
      "Contributing to and maintaining open source tools across the ML, Flutter, and Go ecosystems — libraries used by other developers, not just demos.",
  },
  {
    year: "2023",
    title: "Personal AI Products",
    type: "Personal Projects",
    description:
      "Shipped StudyMate AI, FinSent AI, and PredatorRGB — products spanning RAG, NLP, and Windows-native development.",
  },
  {
    year: "2023",
    title: "AI Engineering Internships",
    type: "Internships",
    description:
      "Applied ML and full stack engineering in industry — productionized models, built APIs, and integrated AI features into real applications.",
  },
];

/** Placeholder certifications — replace with your real Creds. */
export const certifications = [
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera / Stanford Online",
    year: "2024",
    accent: "#00E5FF",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    year: "2024",
    accent: "#7B61FF",
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    year: "2023",
    accent: "#14F195",
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Coursera / Meta",
    year: "2023",
    accent: "#00E5FF",
  },
  {
    title: "Flutter & Dart Cross-Platform",
    issuer: "Udemy",
    year: "2023",
    accent: "#7B61FF",
  },
];

/** Mock GitHub statistics — swap with live data via GitHub REST/GraphQL later. */
export const githubStats = {
  username: "nfsprogramming",
  url: profile.contact.github,
  followers: 120,
  Stars: 280,
  repos: 32,
  contributions: 1240,
  achievements: [
    { label: "Pull Shark", icon: "🏊" },
    { label: "Quickdraw", icon: "⚡" },
    { label: "YOLO", icon: "🪝" },
    { label: "Galaxy Brain", icon: "🧠" },
  ],
  /** ~52 weeks x 7 days contribution graph (random placeholder values 0..4) */
  contributionGraph: Array.from({ length: 52 * 7 }, () => Math.floor(Math.random() * 5)),
  topRepos: [
    { name: "sattam-ai", stars: 64, forks: 12, language: "Python" },
    { name: "studymate-ai", stars: 48, forks: 9, language: "Python" },
    { name: "student-dbms", stars: 22, forks: 5, language: "Dart" },
    { name: "finsent-ai", stars: 18, forks: 3, language: "Python" },
  ],
  languages: [
    { name: "Python", pct: 42, color: "#3572A5" },
    { name: "TypeScript", pct: 18, color: "#3178c6" },
    { name: "Dart", pct: 14, color: "#00B4AB" },
    { name: "Go", pct: 10, color: "#00ADD8" },
    { name: "JavaScript", pct: 8, color: "#f1e05a" },
    { name: "Other", pct: 8, color: "#8b949e" },
  ],
};

/** Current learning goals / focus areas. */
export const currentGoals = [
  "Building Domain Specific LLMs",
  "Developing AI Products",
  "Exploring Agentic AI",
  "Building Production-Scale Applications",
  "Learning Distributed Systems",
  "Building Open Source Tools",
];
