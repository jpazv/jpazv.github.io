import { useState, useRef, useEffect } from "react";
import { FolderOpen, FileText, Mail, Phone } from "lucide-react";
import { AnimatedChevron } from "@/hooks/useAccordion.tsx";
import { AccordionPanel } from "@/hooks/useAccordion.tsx";



// ─── Data ─────────────────────────────────────────────────────────────────────
const PERSONAL_INFO = {
  bio: {
    label: "bio", icon: "🟥",
    content: [
      "/**", " * Sobre mim",
      " * Eu tenho 26 anos e sou um desenvolvedor front-end",
      " * com paixão por criar interfaces de usuário",
      " * envolventes e responsivas. Com mais de 5 anos",
      " * de experiência na programação, tenho trabalhado",
      " * em uma variedade de projetos, desde pequenos",
      " * sites até grandes aplicações web.", " */",
    ],
  },
  interests: {
    label: "interesses", icon: "🟩",
    content: [
      "/**", " * Me interesso por",
      " * - Desenvolvimento Web", " * - Open Source",
      " * - Design de Interfaces", " * - Empreendedorismo", " */",
    ],
  },
  education: {
    label: "educação", icon: "🟦",
    items: ["ensino-medio", "universidade"],
    content: [
      "/**", " * Educação",
      " * - Universidade de Fortaleza",
      " * - Análise e desenvolvimento de sistemas",
      " * - 2022 - 2026", " */",
    ],
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
const AboutSection = () => {
  const [activeFile, setActiveFile] = useState("bio");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "personal-info": false, "professional-info": false,
    hobbies: false, contacts: false, education: false,
  });

  const toggle = (key: string) =>
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const currentContent =
    PERSONAL_INFO[activeFile as keyof typeof PERSONAL_INFO]?.content ||
    PERSONAL_INFO.bio.content;

  // content fade when switching file
  const [contentKey, setContentKey] = useState("bio");
  const [contentAnim, setContentAnim] = useState("");
  const switchFile = (key: string) => {
    if (key === activeFile) return;
    setContentAnim("content-fade-out");
    setTimeout(() => {
      setActiveFile(key);
      setContentKey(key);
      setContentAnim("content-fade-in");
    }, 120);
  };

  return (
    <>
      <style>{`
        @keyframes contentFadeIn  { from { opacity:0; transform:translateY(4px) } to { opacity:1; transform:translateY(0) } }
        @keyframes contentFadeOut { from { opacity:1; transform:translateY(0) } to { opacity:0; transform:translateY(-4px) } }
        .content-fade-in  { animation: contentFadeIn  160ms ease both; }
        .content-fade-out { animation: contentFadeOut 120ms ease both; }
      `}</style>

      <div className="flex h-full">

        {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
        <div className="hidden md:block w-66 border-r border-border shrink-0 py-2 overflow-y-auto">
          {/* personal-info */}
          <button onClick={() => toggle("personal-info")}
            className="flex items-center gap-2 px-3 py-1.5 w-full text-sm font-mono text-foreground hover:bg-secondary/30 transition-colors">
            <AnimatedChevron open={expanded["personal-info"]} />
            <FolderOpen className="w-4 h-4 text-vscode-string" />
            personal-info
          </button>
          <AccordionPanel open={expanded["personal-info"]}>
            <div className="ml-4">
              {Object.entries(PERSONAL_INFO).map(([key, val]) => (
                <div key={key}>
                  {key === "education" ? (
                    <>
                      <button onClick={() => toggle("education")}
                        className="flex items-center gap-2 px-3 py-1 w-full text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
                        <AnimatedChevron open={expanded.education} />
                        <span>{val.icon}</span> {val.label}
                      </button>
                      <AccordionPanel open={expanded.education}>
                        {"items" in val && val.items?.map((item: string) => (
                          <button key={item} onClick={() => switchFile("education")}
                            className={`flex items-center gap-2 px-3 py-1 ml-6 w-full text-sm font-mono transition-colors ${
                              activeFile === "education" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}>
                            <FileText className="w-3 h-3" /> {item}
                          </button>
                        ))}
                      </AccordionPanel>
                    </>
                  ) : (
                    <button onClick={() => switchFile(key)}
                      className={`flex items-center gap-2 px-3 py-1 w-full text-sm font-mono transition-colors ${
                        activeFile === key ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}>
                      <span className="w-3 h-3 opacity-0" />
                      <span>{val.icon}</span> {val.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </AccordionPanel>

          {/* contacts */}
          <button onClick={() => toggle("contacts")}
            className="flex items-center gap-2 px-3 py-1.5 w-full text-sm font-mono text-foreground hover:bg-secondary/30 transition-colors mt-2">
            <AnimatedChevron open={expanded.contacts} />
            contacts
          </button>
          <AccordionPanel open={expanded.contacts}>
            <div className="ml-6 space-y-1">
              <div className="flex items-center gap-1 px-3 py-1 text-xs font-mono text-muted-foreground">
                <Mail className="w-3 h-3 shrink-0" />
                <span className="truncate">jpazevedomoreiraa@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 text-xs font-mono text-muted-foreground">
                <Phone className="w-3 h-3 shrink-0" /> +55 88999981111
              </div>
            </div>
          </AccordionPanel>
        </div>

        {/* ── Main content ────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 overflow-y-auto">

            {/* ── Mobile accordions ─────────────────────────────────────── */}
            <div className="md:hidden">
              {/* personal-info */}
              <button onClick={() => toggle("personal-info")}
                className="flex items-center gap-2 px-4 py-3 w-full font-mono text-sm text-foreground bg-secondary/20 hover:bg-secondary/30 transition-colors border-b border-border">
                <AnimatedChevron open={expanded["personal-info"]} />
                personal-info
              </button>
              <AccordionPanel open={expanded["personal-info"]}>
                <button onClick={() => switchFile("bio")}
                  className={`flex items-center gap-2 px-8 py-2 w-full font-mono text-sm border-b border-border transition-colors ${
                    activeFile === "bio" ? "text-foreground bg-secondary/30" : "text-muted-foreground hover:text-foreground"}`}>
                  <span>🟥</span> bio
                </button>
                <button onClick={() => switchFile("interests")}
                  className={`flex items-center gap-2 px-8 py-2 w-full font-mono text-sm border-b border-border transition-colors ${
                    activeFile === "interests" ? "text-foreground bg-secondary/30" : "text-muted-foreground hover:text-foreground"}`}>
                  <span>🟩</span> interesses
                </button>
                <button onClick={() => toggle("education")}
                  className="flex items-center gap-2 px-8 py-2 w-full font-mono text-sm text-muted-foreground hover:text-foreground border-b border-border transition-colors">
                  <AnimatedChevron open={expanded.education} />
                  <span>🟦</span> educação
                </button>
                <AccordionPanel open={expanded.education}>
                  {["high-school", "university"].map(item => (
                    <button key={item} onClick={() => switchFile("education")}
                      className={`flex items-center gap-2 px-12 py-2 w-full font-mono text-sm border-b border-border transition-colors ${
                        activeFile === "education" ? "text-foreground bg-secondary/30" : "text-muted-foreground hover:text-foreground"}`}>
                      <FileText className="w-3 h-3" /> {item}
                    </button>
                  ))}
                </AccordionPanel>
              </AccordionPanel>

              {/* professional-info */}
              <button onClick={() => toggle("professional-info")}
                className="flex items-center gap-2 px-4 py-3 w-full font-mono text-sm text-foreground bg-secondary/20 hover:bg-secondary/30 transition-colors border-b border-border">
                <AnimatedChevron open={expanded["professional-info"]} />
                professional-info
              </button>
              <AccordionPanel open={expanded["professional-info"]}>
                <div className="px-8 py-3 font-mono text-sm text-muted-foreground border-b border-border">// in progress...</div>
              </AccordionPanel>

              {/* hobbies */}
              <button onClick={() => toggle("hobbies")}
                className="flex items-center gap-2 px-4 py-3 w-full font-mono text-sm text-foreground bg-secondary/20 hover:bg-secondary/30 transition-colors border-b border-border">
                <AnimatedChevron open={expanded.hobbies} />
                hobbies
              </button>
              <AccordionPanel open={expanded.hobbies}>
                <div className="px-8 py-3 font-mono text-sm text-muted-foreground border-b border-border">// in progress...</div>
              </AccordionPanel>

              {/* contacts */}
              <button onClick={() => toggle("contacts")}
                className="flex items-center gap-2 px-4 py-3 w-full font-mono text-sm text-foreground bg-secondary/20 hover:bg-secondary/30 transition-colors border-b border-border">
                <AnimatedChevron open={expanded.contacts} />
                contacts
              </button>
              <AccordionPanel open={expanded.contacts}>
                <div className="px-8 py-3 space-y-2 border-b border-border">
                  <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                    <Mail className="w-3 h-3 shrink-0" />
                    <span className="truncate">jpazevedomoreiraa@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                    <Phone className="w-3 h-3 shrink-0" /> +55 88999981111
                  </div>
                </div>
              </AccordionPanel>
            </div>

            {/* ── Code content ──────────────────────────────────────────── */}
            <div className="p-4 md:p-6">
              <div className="hidden md:flex items-center gap-2 mb-4 border-b border-border pb-2">
                <span className="font-mono text-sm text-foreground">{activeFile}</span>
                <span className="text-muted-foreground text-xs cursor-pointer">×</span>
              </div>
              <div key={contentKey} className={`flex mt-2 ${contentAnim}`}>
                <div className="pr-4 text-right font-mono text-xs md:text-sm text-vscode-linenum select-none">
                  {currentContent.map((_, i) => <div key={i} className="leading-7">{i + 1}</div>)}
                </div>
                <div className="font-mono text-xs md:text-sm leading-7">
                  {currentContent.map((line, i) => <div key={i} className="text-vscode-comment">{line}</div>)}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop right panel */}
          <div className="hidden lg:block w-96 border-l border-border p-6 overflow-auto">
            <div className="font-mono text-sm text-muted-foreground mb-6">// Code snippet showcase:</div>
            <div className="rounded-lg border border-border p-4 bg-card/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/30" />
                  <div>
                    <div className="font-mono text-sm text-foreground">@jpazv</div>
                    <div className="font-mono text-xs text-muted-foreground">Created 5 months ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <span>details</span><span>⭐ 3 stars</span>
                </div>
              </div>
              <div className="bg-background rounded p-3 font-mono text-xs leading-6 overflow-x-auto">
                <div><span className="text-vscode-keyword">function </span><span className="text-vscode-function">initializeModelChunk</span><span className="text-foreground">{"<T>"}(chunk): T {"{"}</span></div>
                <div className="pl-4"><span className="text-vscode-keyword">const </span>value: T = parseModel(chunk._response, chunk._value);</div>
                <div className="pl-4"><span className="text-vscode-keyword">return </span>value;</div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;