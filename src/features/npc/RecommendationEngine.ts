/**
 * @file src/features/npc/RecommendationEngine.ts
 * @description Context-aware recommendation generator for the NPC Guide.
 */

export class RecommendationEngine {
  /**
   * Generates a tailored recommendation string based on visitor persona.
   */
  static generate(persona: string): string {
    const normalized = persona.toLowerCase();

    if (normalized.includes('recruiter') || normalized.includes('hiring')) {
      return "Based on your focus, I highly recommend visiting the **Resume Center** and the **Skills Lab** to see his quantified tech stack and live metrics.";
    }

    if (normalized.includes('engineer') || normalized.includes('developer') || normalized.includes('code')) {
      return "You should definitely check out the **Projects District**. It pulls live GitHub data, including his Open Source contributions and active tech stacks.";
    }

    if (normalized.includes('competitive') || normalized.includes('algorithm')) {
      return "Head over to the **Achievement Museum** and the **Skills Lab**. He has live Codeforces and LeetCode ratings mapped out in interactive charts.";
    }

    // Default
    return "I'd recommend starting at the **Projects District** to see his live code, then heading to the **Experience Tower** for a timeline of his career!";
  }
}
