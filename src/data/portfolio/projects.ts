import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: "fracturevision-ai",
    title: "FractureVision AI",
    summary: "An AI-powered fracture detection system built with explainable deep learning frameworks to assist clinical diagnostics.",
    description: "Built for Healthcare AI, leveraging advanced computer vision architectures for medical imagery analysis.",
    technologies: ["EfficientNet", "PyTorch", "GradCAM", "Streamlit"],
    role: "Lead Developer"
  },
  {
    id: "hospital-pulse-ai",
    title: "Hospital Pulse AI",
    summary: "A predictive healthcare intelligence platform designed to forecast metrics and streamline administrative insights.",
    description: "Healthcare Analytics platform analyzing extensive medical operational datasets.",
    technologies: ["Python", "Machine Learning", "Dashboards"],
    role: "AI Engineer"
  },
  {
    id: "flowx",
    title: "FlowX",
    summary: "A real-time traffic optimization and lane-monitoring system powered by computer vision algorithms.",
    description: "Smart City optimization engine analyzing dense traffic patterns at edge runtimes.",
    technologies: ["YOLO", "OpenCV", "Python"],
    role: "Developer"
  },
  {
    id: "revibe-lab",
    title: "Revibe Lab",
    summary: "An AI-driven innovation platform dedicated to modern e-waste recycling and repurposing solutions.",
    description: "Sustainability project mixing Full Stack Development with AI integrations.",
    technologies: ["Python", "AI", "React"],
    role: "Full Stack Developer"
  },
  {
    id: "techneekx-platform",
    title: "TechNeekX Platform",
    summary: "The official ecosystem and hub platform for the TechNeekX developer community.",
    description: "A highly scalable community portal handling members, hackathons, and operations.",
    technologies: ["Next.js", "React"],
    role: "Founder & Lead Developer"
  }
];
