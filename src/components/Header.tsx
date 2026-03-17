import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "hello",    label: "_hello"      },
  { id: "about",    label: "_about-me"   },
  { id: "projects", label: "_projects"   },
  { id: "contact",  label: "_contact-me" },
];

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Move o underline animado para a tab ativa
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (!el) return;
    const parent = el.closest("nav")?.getBoundingClientRect();
    const rect   = el.getBoundingClientRect();
    if (!parent) return;
    setIndicator({ left: rect.left - parent.left, width: rect.width });
  }, [activeTab]);

  const mainTabs = TABS.filter(t => t.id !== "contact");
  const contactTab = TABS.find(t => t.id === "contact")!;

  return (
    <header className="flex items-center border-b border-border h-12 shrink-0">
      {/* Brand */}
      <div className="px-5 h-full flex items-center text-muted-foreground font-mono text-sm border-r border-border min-w-[180px]">
        joao-moreira
      </div>

      {/* Main tabs */}
      <nav className="flex h-full relative">
        {mainTabs.map(tab => (
          <button
            key={tab.id}
            ref={el => { tabRefs.current[tab.id] = el; }}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-6 h-full font-mono text-sm border-r border-border transition-colors duration-200 relative",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}

        {/* Sliding underline indicator — only for main tabs */}
        {activeTab !== "contact" && (
          <span
            className="absolute bottom-0 h-[2px] bg-vscode-string transition-all duration-300 ease-out"
            style={{
              left:  indicator.left,
              width: indicator.width,
            }}
          />
        )}
      </nav>

      <div className="flex-1" />

      {/* Contact tab — right side */}
      <button
        ref={el => { tabRefs.current["contact"] = el; }}
        onClick={() => onTabChange("contact")}
        className={cn(
          "px-6 h-full font-mono text-sm border-l border-border transition-colors duration-200 relative",
          activeTab === "contact"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {contactTab.label}
        {activeTab === "contact" && (
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-vscode-string" />
        )}
      </button>
    </header>
  );
};

export default Header;