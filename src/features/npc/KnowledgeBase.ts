/**
 * @file src/features/npc/KnowledgeBase.ts
 * @description Keyword-based deterministic knowledge graph mapping to portfolio content.
 */

export const PORTFOLIO_KNOWLEDGE = {
  projects: {
    text: "Sarthak has engineered several critical systems, most notably an Autonomous Coding Agent using LangChain and a highly concurrent CacheManager that reduced network latency by 60%.",
    keywords: ["project", "projects", "work", "build", "code"]
  },
  skills: {
    text: "His primary expertise lies in Distributed Systems and UI Engineering. He relies heavily on TypeScript, React, Three.js for frontend, and Python/Node for backend systems.",
    keywords: ["skill", "skills", "tech", "technology", "stack", "good at"]
  },
  achievements: {
    text: "He's a Knight on LeetCode (top 5% globally), a Specialist on Codeforces, and holds an AWS Solutions Architect certification.",
    keywords: ["achievement", "achievements", "award", "win", "rank", "contest"]
  },
  education: {
    text: "Sarthak is currently pursuing his B.Tech in Computer Science at the Indian Institute of Information Technology, Nagpur, specializing in AI.",
    keywords: ["education", "school", "degree", "university", "college", "study"]
  },
  career: {
    text: "He is actively looking for Software Engineering roles where he can push the boundaries of distributed architectures and interactive web experiences.",
    keywords: ["career", "goal", "goals", "job", "hire", "looking"]
  },
  default: {
    text: "I'm not quite sure about that specific detail, but I can show you his Projects, Skills, or Resume!",
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
