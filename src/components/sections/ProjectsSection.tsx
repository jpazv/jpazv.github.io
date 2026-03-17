import { useState, useRef, useEffect } from "react";
import { AnimatedChevron } from "@/hooks/useAccordion.tsx";
import { AccordionPanel } from "@/hooks/useAccordion.tsx";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";



const TECH_FILTERS = [
  { id: "react",   label: "React",   icon: "⚛️" },
  { id: "html",    label: "HTML",    icon: "📄" },
  { id: "css",     label: "CSS",     icon: "🎨" },
  { id: "vue",     label: "Vue",     icon: "💚" },
  { id: "angular", label: "Angular", icon: "🅰️" },
  { id: "gatsby",  label: "Gatsby",  icon: "🟣" },
  { id: "flutter", label: "Flutter", icon: "🦋" },
];

const PROJECTS = [
  { id: 1, name: "Project 1", subtitle: "_ui-animations",  description: "Duis aute irure dolor in velit esse cillum dolore.", tech: ["react", "css"],     image: project1 },
  { id: 2, name: "Project 2", subtitle: "_tetris-game",    description: "Duis aute irure dolor in velit esse cillum dolore.", tech: ["react", "html"],    image: project2 },
  { id: 3, name: "Project 3", subtitle: "_dashboard",      description: "Duis aute irure dolor in velit esse cillum dolore.", tech: ["vue",   "css"],     image: project3 },
  { id: 4, name: "Project 4", subtitle: "_analytics",      description: "Duis aute irure dolor in velit esse cillum dolore.", tech: ["angular", "html"],  image: project4 },
];

const ProjectsSection = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>(["react"]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [cardKey, setCardKey] = useState(0); // trigger card re-animation on filter change

  const toggleFilter = (id: string) => {
    setActiveFilters(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
    setCardKey(k => k + 1);
  };

  const filtered =
    activeFilters.length === 0
      ? PROJECTS
      : PROJECTS.filter(p => p.tech.some(t => activeFilters.includes(t)));

  const FilterList = () => (
    <div className="space-y-1">
      {TECH_FILTERS.map(filter => (
        <label key={filter.id}
          className="flex items-center gap-3 px-4 py-1.5 cursor-pointer hover:bg-secondary/30 transition-colors">
          <input type="checkbox"
            checked={activeFilters.includes(filter.id)}
            onChange={() => toggleFilter(filter.id)}
            className="w-4 h-4 rounded border-border bg-transparent accent-vscode-string" />
          <span className="text-sm">{filter.icon}</span>
          <span className="font-mono text-sm text-muted-foreground">{filter.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-in { animation: cardIn 280ms cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="flex h-full">

        {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
        <div className="hidden md:block w-52 border-r border-border shrink-0 py-4">
          <div className="px-3 py-1.5 text-sm font-mono text-foreground mb-2">projects</div>
          <FilterList />
        </div>

        {/* ── Main content ────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Mobile accordion filter */}
          <div className="md:hidden border-b border-border">
            <button onClick={() => setFiltersOpen(o => !o)}
              className="flex items-center gap-2 px-4 py-3 w-full font-mono text-sm text-foreground bg-secondary/20 hover:bg-secondary/30 transition-colors">
              <AnimatedChevron open={filtersOpen} />
              projects
            </button>
            <AccordionPanel open={filtersOpen}>
              <div className="py-2 border-t border-border bg-background">
                <FilterList />
              </div>
            </AccordionPanel>
          </div>

          {/* Cards */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {/* Desktop filter chips */}
            {activeFilters.length > 0 && (
              <div className="hidden md:flex items-center gap-2 mb-4 border-b border-border pb-2 flex-wrap">
                {activeFilters.map(f => {
                  const filter = TECH_FILTERS.find(t => t.id === f);
                  return (
                    <div key={f} className="flex items-center gap-1 font-mono text-sm text-foreground">
                      {filter?.label}
                      <button onClick={() => toggleFilter(f)}
                        className="text-muted-foreground hover:text-foreground text-xs ml-1 transition-colors">
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((project, i) => (
                <div
                  key={`${cardKey}-${project.id}`}
                  className="group card-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="font-mono text-sm mb-2">
                    <span className="text-vscode-type font-bold">{project.name}</span>
                    <span className="text-muted-foreground"> // {project.subtitle}</span>
                  </div>
                  <div className="rounded-lg border border-border bg-card overflow-hidden">
                    <div className="relative h-40 md:h-36 overflow-hidden">
                      <img src={project.image} alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="font-mono text-sm text-muted-foreground mb-4">{project.description}</p>
                      <button className="font-mono text-sm px-4 py-1.5 rounded border border-border text-foreground hover:bg-secondary/50 transition-colors">
                        view-project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsSection;