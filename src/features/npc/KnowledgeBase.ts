/**
 * @file src/features/npc/KnowledgeBase.ts
 * @description Keyword-based deterministic knowledge graph mapping to portfolio content.
 */

export const PORTFOLIO_KNOWLEDGE = {
  projects: {
    text: "Sarthak has engineered several critical systems, most notably EcoSphere AI, Revibe Hub, LexNode AI (a RAG engine), and TTM-AI. He specializes in Agentic AI and Full-Stack Development.",
    keywords: ["project", "projects", "work", "build", "code"]
  },
  skills: {
    text: "His primary expertise lies in Generative AI, Machine Learning, and UI Engineering. He heavily uses Python, TypeScript, React, and LangChain for building robust Agentic AI applications.",
    keywords: ["skill", "skills", "tech", "technology", "stack", "good at"]
  },
  achievements: {
    text: "He is the Founder of TechNeekX, the winner of HackBio IIT Mandi, and has participated in over 70 hackathons!",
    keywords: ["achievement", "achievements", "award", "win", "rank", "contest", "hackathon"]
  },
  education: {
    text: "Sarthak is currently pursuing his B.Tech in Computer Science Engineering (Artificial Intelligence) at Babu Banarasi Das University.",
    keywords: ["education", "school", "degree", "university", "college", "study"]
  },
  career: {
    text: "He is actively looking for roles where he can push the boundaries of Generative AI, Agentic AI, and interactive full-stack architectures.",
    keywords: ["career", "goal", "goals", "job", "hire", "looking", "internship"]
  },
  default: {
    text: "I'm not quite sure about that specific detail, but I can guide you to his Projects, Skills Lab, or Resume Center!",
    keywords: []
  }
};

export class KnowledgeBase {
  /**
   * Simple heuristic matcher mapping natural language to portfolio facts.
   */
  static query(input: string): string {
    const normalizedInput = input.toLowerCase();

    for (const [key, entry] of Object.entries(PORTFOLIO_KNOWLEDGE)) {
      if (key === 'default') continue;
      
      for (const keyword of entry.keywords) {
        if (normalizedInput.includes(keyword)) {
          return entry.text;
        }
      }
    }

    return PORTFOLIO_KNOWLEDGE.default.text;
  }
}
