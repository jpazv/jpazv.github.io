import SnakeGame from "@/components/SnakeGame";
// ─── HelloSection ─────────────────────────────────────────────────────────────
const HelloSection = () => {
  return (
    <>
      {/* ── Mobile: só o conteúdo, sem wrapper — o MobileLayout fica no Index ── */}
      <div
        className="md:hidden h-full relative flex flex-col justify-center px-6 py-8 gap-6"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 75% 25%, rgba(20,70,200,0.22) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 25% 75%, rgba(10,50,150,0.18) 0%, transparent 65%)",
        }}
      >
        <div>
          <div className="font-mono text-sm text-muted-foreground mb-2">Hi all. I am</div>
          <h1 className="font-mono text-5xl font-bold text-foreground leading-tight">
            João<br />Moreira
          </h1>
          <div className="font-mono text-lg text-vscode-string mt-3">
            &gt; Front-end developer
          </div>
        </div>
        <div className="font-mono text-xs space-y-1">
          <div className="text-muted-foreground">// find my profile on Github:</div>
          <div>
            <span className="text-vscode-keyword">const </span>
            <span className="text-vscode-variable">githubLink</span>
            <span className="text-foreground"> = </span>
            <a href="https://github.com/jpazv" className="text-vscode-string hover:underline break-all">
              "https://github.com/jpazv"
            </a>
          </div>
        </div>
      </div>

      {/* ── Desktop ──────────────────────────────────────────────────────────── */}
      <div
        className="hidden md:flex items-center justify-start h-full px-16 py-12 gap-12 relative overflow-hidden"      >
        {/* Green radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 62% 50%, rgba(32, 178, 140, 0.18) 0%, rgba(16, 120, 100, 0.10) 40%, transparent 70%)",
          }}
        />

        {/* Left side - intro */}
        <div className="flex flex-col gap-6 max-w-lg relative z-10">
          <div className="font-mono text-base text-muted-foreground">Hi all. I am</div>
          <h1 className="font-mono text-5xl font-bold text-foreground leading-tight">
            João Paulo Azevedo
          </h1>
          <div className="font-mono text-xl text-vscode-string">
            &gt; Front-end developer
          </div>
          <div className="mt-8 font-mono text-sm space-y-1">
            <div className="text-muted-foreground">// complete the game to continue </div>
            <div className="text-muted-foreground">// find my profile on Github:</div>
            <div>
              <span className="text-vscode-keyword">const </span>
              <span className="text-vscode-variable">githubLink</span>
              <span className="text-foreground"> = </span>
              <a href="https://github.com/jpazv" className="text-vscode-string hover:underline">
                "https://github.com/jpazv"
              </a>
            </div>
          </div>
        </div>

        {/* Right side - snake game */}
        <div className="shrink-0 relative z-10 ml-80">
          <SnakeGame />
        </div>
      </div>
    </>
  );
};

export default HelloSection;