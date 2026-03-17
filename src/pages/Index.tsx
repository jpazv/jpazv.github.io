import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelloSection from "@/components/sections/HelloSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import { MobileLayout } from "@/components/sections/MobileNav";
import type { Section } from "@/components/sections/MobileNav";

const SECTION_ORDER: Section[] = ["hello", "about", "projects", "contact"];

function renderSection(tab: Section) {
  switch (tab) {
    case "hello":    return <HelloSection />;
    case "about":    return <AboutSection />;
    case "projects": return <ProjectsSection />;
    case "contact":  return <ContactSection />;
  }
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<Section>("hello");
  const [animKey, setAnimKey]     = useState(0);   // força re-mount da animação
  const [direction, setDirection] = useState<"left" | "right">("right");

  const navigate = (next: Section) => {
    if (next === activeTab) return;
    const fromIdx = SECTION_ORDER.indexOf(activeTab);
    const toIdx   = SECTION_ORDER.indexOf(next);
    setDirection(toIdx > fromIdx ? "right" : "left");
    setActiveTab(next);
    setAnimKey(k => k + 1);
  };

   return (
    <>
      <style>{`
        @keyframes fadeSlideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .anim-right { animation: fadeSlideInRight 260ms cubic-bezier(0.22,1,0.36,1) both; }
        .anim-left  { animation: fadeSlideInLeft  260ms cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
 
      <div className="h-screen flex flex-col overflow-hidden bg-background border border-border rounded-lg m-1">
 
        {/* ── Mobile ──────────────────────────────────────────── */}
        <div className="md:hidden h-full">
          <MobileLayout
            activeSection={activeTab}
            sectionOrder={SECTION_ORDER}
            onNavigate={navigate}
            renderSection={renderSection}
          />
        </div>
 
        {/* ── Desktop ─────────────────────────────────────────── */}
        <div className="hidden md:flex md:flex-col h-full">
          <Header activeTab={activeTab} onTabChange={navigate} />
          <main className="flex-1 overflow-hidden relative">
            <div key={activeTab} className="h-full anim-right">
              {renderSection(activeTab)}
            </div>
          </main>
          <Footer />
        </div>
 
      </div>
    </>
  );
};
 
export default Index;