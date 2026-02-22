import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6", className)}
    >
      {/* T */}
      <rect x="0" y="2" width="20" height="3.5" rx="1" fill="#3dd68c" />
      <rect x="8.25" y="2" width="3.5" height="24" rx="1" fill="#3dd68c" />
      {/* O */}
      <ellipse cx="38" cy="14" rx="12" ry="12" stroke="#3dd68c" strokeWidth="3.5" fill="none" />
      {/* Line through the O */}
      <rect x="24" y="12.25" width="28" height="3.5" rx="1" fill="#3dd68c" />
    </svg>
  );
}
