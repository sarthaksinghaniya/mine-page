/**
 * @file src/ui/system/TechBadge.tsx
 * @description Stylized badge for displaying technologies.
 */

export interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[var(--color-primary-300)] rounded-md shadow-[0_0_8px_rgba(0,229,240,0.1)] transition-colors hover:bg-[rgba(0,229,240,0.1)] hover:border-[rgba(0,229,240,0.3)] hover:text-[#00e5f0] cursor-default">
      {name}
    </span>
  );
}
