"use client";

import { useRouter } from "next/navigation";
import { cn } from "~/lib/cn";

interface Props {
  label?: string;
  fallbackHref?: string;
  className?: string;
}

export function BackButton({
  label = "Back",
  fallbackHref = "/",
  className,
}: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className={cn(
        "w-fit cursor-pointer! self-start rounded-sm text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400",
        className,
      )}
    >
      <span aria-hidden="true">←</span> {label}
    </button>
  );
}
