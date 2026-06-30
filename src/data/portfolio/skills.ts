import type { SkillCategory } from '../types';

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "Python", level: "expert" },
      { name: "JavaScript", level: "proficient" },
      { name: "Java", level: "proficient" },
      { name: "C++", level: "proficient" },
      { name: "C", level: "proficient" },
      { name: "SQL", level: "proficient" }
    ]
  },
  {
    category: "AI & Machine Learning",
    items: [
      { name: "PyTorch", level: "expert" },
      { name: "TensorFlow", level: "proficient" },
      { name: "Scikit-learn", level: "expert" },
      { name: "YOLO", level: "expert" },
      { name: "OpenCV", level: "expert" },
      { name: "NLP", level: "proficient" },
      { name: "LangChain", level: "proficient" },
      { name: "RAG", level: "proficient" }
    ]
  },
  {
    category: "Backend Development",
    items: [
      { name: "FastAPI", level: "expert" },
      { name: "Flask", level: "proficient" },
      { name: "Django", level: "proficient" },
      { name: "Node.js", level: "proficient" },
      { name: "REST APIs", level: "expert" }
    ]
  },
  {
    category: "Frontend & Cloud",
    items: [
      { name: "React", level: "proficient" },
      { name: "Next.js", level: "proficient" },
      { name: "TailwindCSS", level: "expert" },
      { name: "Docker", level: "proficient" },
      { name: "AWS", level: "beginner" },
      { name: "GCP", level: "beginner" }
    ]
  }
];
