
import {
  Code2,
  Headphones,
  Palette,
  Users,
  Laptop,
  Rocket,
  HeartHandshake,
  GraduationCap,
} from "lucide-react";

// ========================================
// JOB LISTINGS
// ========================================

export const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Development",
    type: "Full-time",
    location: "Dhaka, Bangladesh",
    experience: "1–3 Years",
    salary: "Negotiable",
    icon: Code2,
    featured: true,
    description:
      "Build modern, responsive and high-performance web applications using React and modern frontend technologies.",
    skills: ["React.js", "JavaScript", "Tailwind CSS", "REST API"],
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Development",
    type: "Full-time",
    location: "Dhaka, Bangladesh",
    experience: "2–4 Years",
    salary: "Negotiable",
    icon: Code2,
    featured: false,
    description:
      "Develop scalable backend systems, REST APIs and database-driven applications for our digital products.",
    skills: ["Node.js", "Express.js", "MongoDB", "API"],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    location: "Hybrid",
    experience: "1–2 Years",
    salary: "Negotiable",
    icon: Palette,
    featured: true,
    description:
      "Create user-friendly digital experiences, wireframes and visually engaging interfaces for web and mobile products.",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
  },
  {
    id: 4,
    title: "Technical Support Engineer",
    department: "IT & Support",
    type: "Full-time",
    location: "Dhaka, Bangladesh",
    experience: "Freshers Welcome",
    salary: "Negotiable",
    icon: Headphones,
    featured: false,
    description:
      "Provide technical assistance, troubleshoot software and network issues, and ensure smooth customer operations.",
    skills: ["Networking", "Troubleshooting", "Windows", "Communication"],
  },
  {
    id: 5,
    title: "Junior Software Developer",
    department: "Development",
    type: "Internship",
    location: "On-site",
    experience: "Entry Level",
    salary: "As per policy",
    icon: GraduationCap,
    featured: false,
    description:
      "Learn and contribute to real-world software projects while working alongside our experienced development team.",
    skills: ["HTML", "CSS", "JavaScript", "Problem Solving"],
  },
];

// ========================================
// JOB CATEGORIES
// ========================================

export const categories = [
  "All Positions",
  "Development",
  "Design",
  "IT & Support",
];

// ========================================
// CAREER BENEFITS
// ========================================

export const benefits = [
  {
    icon: Rocket,
    title: "Career Growth",
    description:
      "Build your professional skills through real-world projects and continuous learning.",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description:
      "Work with talented people who value teamwork, ideas and innovation.",
  },
  {
    icon: Laptop,
    title: "Modern Technology",
    description:
      "Explore modern tools, technologies and practical software development workflows.",
  },
  {
    icon: HeartHandshake,
    title: "Supportive Culture",
    description:
      "Grow in an environment where creativity, ownership and collaboration matter.",
  },
];
