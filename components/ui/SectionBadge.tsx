// components/ui/SectionBadge.tsx
import { LucideIcon } from "lucide-react";

interface SectionBadgeProps {
  icon: LucideIcon;
  text: string;
  className?: string;
}

export function SectionBadge({
  icon: Icon,
  text,
  className = "",
}: SectionBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/5 backdrop-blur-sm text-gray-palette font-semibold text-body ${className}`}
    >
      <Icon className="w-5 h-5 stroke-[2]" strokeWidth={2} />
      <span>{text}</span>
    </span>
  );
}
