import { useRef, useEffect } from "react";

/**
 * AccordionPanel — anima height 0 → auto.
 * Ignora o primeiro render para não animar no mount.
 */
export function AccordionPanel({ open, children }: { open: boolean; children: React.ReactNode }) {
  const ref        = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Primeiro render: apenas define estado inicial, sem animar
    if (!mountedRef.current) {
      mountedRef.current = true;
      if (!open) {
        el.style.height   = "0px";
        el.style.opacity  = "0";
        el.style.overflow = "hidden";
      }
      return;
    }

    // Renders seguintes: anima
    if (open) {
      el.style.overflow = "hidden";
      el.style.height   = "0px";
      el.style.opacity  = "0";
      const h = el.scrollHeight;
      requestAnimationFrame(() => {
        el.style.transition = "height 240ms cubic-bezier(0.22,1,0.36,1), opacity 200ms ease";
        el.style.height     = `${h}px`;
        el.style.opacity    = "1";
      });
      const tid = setTimeout(() => {
        el.style.height   = "auto";
        el.style.overflow = "";
      }, 260);
      return () => clearTimeout(tid);
    } else {
      const h = el.scrollHeight;
      el.style.height   = `${h}px`;
      el.style.overflow = "hidden";
      requestAnimationFrame(() => {
        el.style.transition = "height 200ms cubic-bezier(0.4,0,1,1), opacity 160ms ease";
        el.style.opacity    = "0";
        el.style.height     = "0px";
      });
    }
  }, [open]);

  return <div ref={ref}>{children}</div>;
}

/**
 * AnimatedChevron — rotaciona suavemente entre ▶ e ▼
 */
export function AnimatedChevron({ open, className = "w-3 h-3" }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)",
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        flexShrink: 0,
      }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}