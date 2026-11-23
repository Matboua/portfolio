import type { Project } from "../types";
import gsnaImage from "../assets/gsna-project.webp";
import akauntingImage from "../assets/akaunting-project.webp";
import skoolutionImage from "../assets/skoolution-project.webp";
import carvoyImage from "../assets/carvoy-project.webp";

export const projects: Project[] = [
  {
    id: "gsna",
    github: "https://github.com/Matboua/pentestai",
    title: "Penetration Testing Automation Tool",
    description: "Built a Python tool to automate parts of security assessments during my cybersecurity internship at GSNA Solutions.",
    image: gsnaImage,
    tags: ["Python", "Cybersecurity", "Automation"],
    type: "Internship Project",
    gradientFrom: "from-violet-600/90",
    gradientTo: "to-indigo-600/90",
  },
  {
    id: "akaunting",
    github: "https://github.com/aymennnb/devsecops_for_akaunting",
    image: akauntingImage,
    title: "Akaunting DevSecOps Pipeline",
    description: "Automated the deployment of Akaunting DevSecOps Pipeline in a team project using Terraform and GitHub Actions.",
    tags: ["DevSecOps", "CI/CD", "AWS", "Terraform", "GitHub Actions"],
    type: "Cloud Infrastructure",
    gradientFrom: "from-orange-500/90",
    gradientTo: "to-yellow-500/90",
  },
  {
    id: "skoolution",
    github: "https://github.com/Matboua/skoolution",
    image: skoolutionImage,
    title: "Skoolution Platform",
    description: "Helped develop a full-stack platform during my internship at Skoolution sarl.",
    tags: ["React", "Next.js", "Laravel"],
    type: "Web Application",
    gradientFrom: "from-emerald-500/90",
    gradientTo: "to-teal-500/90",
  },
  {
    id: "carvoy",
    link: "https://carvoy.ma",
    image: carvoyImage,
    title: "Carvoy Car Website",
    description: "Built and deployed the company website for Carvoy Car sarl as a freelance web developer.",
    tags: ["WordPress"],
    type: "Company Website",
    gradientFrom: "from-blue-500/90",
    gradientTo: "to-cyan-500/90",
  },
];
