import { useState, useEffect, useCallback, useRef } from "react";

const GRID_SIZE = 20;
const CELL_SIZE = 16;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = [
  { x: 5, y: 5 }, { x: 15, y: 3 }, { x: 8, y: 15 },
  { x: 3, y: 12 }, { x: 17, y: 8 }, { x: 12, y: 17 },
  { x: 6, y: 9 }, { x: 14, y: 14 }, { x: 9, y: 4 }, { x: 16, y: 11 },
];

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type GameState = "idle" | "playing" | "won" | "lost";

interface SnakeGameProps {
  onSkip?: () => void;
}

const SnakeGame = ({ onSkip }: SnakeGameProps) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameState, setGameState] = useState<GameState>("idle");
  const dirRef = useRef<Direction>("RIGHT");
  const gameRef = useRef<number>();

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection("RIGHT");
    dirRef.current = "RIGHT";
    setGameState("playing");
  };

  const moveSnake = useCallback(() => {
    setSnake((prev) => {
      const head = { ...prev[0] };
      const dir = dirRef.current;
      if (dir === "UP") head.y--;
      if (dir === "DOWN") head.y++;
      if (dir === "LEFT") head.x--;
      if (dir === "RIGHT") head.x++;

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameState("lost");
        return prev;
      }
      if (prev.some((s) => s.x === head.x && s.y === head.y)) {
        setGameState("lost");
        return prev;
      }

      const newSnake = [head, ...prev];
      const foodIdx = food.findIndex((f) => f.x === head.x && f.y === head.y);
      if (foodIdx !== -1) {
        setFood((f) => {
          const newFood = f.filter((_, i) => i !== foodIdx);
          if (newFood.length === 0) setGameState("won");
          return newFood;
        });
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [food]);

  useEffect(() => {
    if (gameState === "playing") {
      gameRef.current = window.setInterval(moveSnake, 150);
      return () => clearInterval(gameRef.current);
    }
    if (gameRef.current) clearInterval(gameRef.current);
  }, [gameState, moveSnake]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      const map: Record<string, Direction> = {
        ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
      };
      const newDir = map[e.key];
      if (!newDir) return;
      const opposite: Record<Direction, Direction> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
      if (opposite[newDir] !== dirRef.current) {
        dirRef.current = newDir;
        setDirection(newDir);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState]);

  const handleArrow = (dir: Direction) => {
    if (gameState !== "playing") return;
    const opposite: Record<Direction, Direction> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
    if (opposite[dir] !== dirRef.current) {
      dirRef.current = dir;
      setDirection(dir);
    }
  };

  return (
    <div className="flex gap-11 items-start">
      {/* Game Board */}
      <div
        className="relative rounded-lg border border-border bg-card/50 p-3 backdrop-blur-sm"
        style={{ width: GRID_SIZE * CELL_SIZE + 24, minHeight: GRID_SIZE * CELL_SIZE + 24 }}
      >
        {/* Corner dot */}
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-primary/60" />

        <div
          className="relative rounded"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            background: "hsl(220 18% 10% / 0.8)",
          }}
        >
          {/* Snake */}
          {snake.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-sm transition-all duration-100"
              style={{
                left: s.x * CELL_SIZE,
                top: s.y * CELL_SIZE,
                width: CELL_SIZE - 1,
                height: CELL_SIZE - 1,
                background: i === 0 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.6)",
              }}
            />
          ))}

          {/* Food */}
          {food.map((f, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: f.x * CELL_SIZE + 3,
                top: f.y * CELL_SIZE + 3,
                width: CELL_SIZE - 7,
                height: CELL_SIZE - 7,
                background: "hsl(var(--primary))",
                boxShadow: "0 0 6px hsl(var(--primary) / 0.6)",
              }}
            />
          ))}

          {/* Start button overlay */}
          {gameState === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 rounded gap-3">
              <button
                onClick={resetGame}
                className="font-mono text-sm px-5 py-2 rounded-lg bg-vscode-string text-primary-foreground hover:opacity-90 transition-opacity"
              >
                start-game
              </button>
            </div>
          )}

          {/* Won / Lost overlay */}
          {(gameState === "won" || gameState === "lost") && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded gap-2">
              <span className="font-mono text-lg font-bold text-foreground">
                {gameState === "won" ? "WELL DONE!" : "GAME OVER!"}
              </span>
              <button
                onClick={resetGame}
                className="font-mono text-sm text-muted-foreground hover:text-foreground"
              >
                {gameState === "won" ? "play-again" : "start-again"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Controls Panel */}
      <div className="flex flex-col gap-4">
        <div className="font-mono text-sm text-muted-foreground">
          <div>// use keyboard</div>
          <div>// arrows to play</div>
        </div>

        {/* D-pad */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => handleArrow("UP")}
            className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
          >
            ▲
          </button>
          <div className="flex gap-1">
            <button
              onClick={() => handleArrow("LEFT")}
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
            >
              ◄
            </button>
            <button
              onClick={() => handleArrow("DOWN")}
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
            >
              ▼
            </button>
            <button
              onClick={() => handleArrow("RIGHT")}
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
            >
              ►
            </button>
          </div>
        </div>

        {/* Food left */}
        <div>
          <div className="font-mono text-sm text-muted-foreground mb-2">// food left</div>
          <div className="flex flex-wrap gap-1.5 max-w-[120px]">
            {INITIAL_FOOD.map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background: i < food.length ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  boxShadow: i < food.length ? "0 0 4px hsl(var(--primary) / 0.5)" : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Skip button — always visible */}
        {onSkip && (
          <button
            onClick={onSkip}
            className="font-mono text-sm px-4 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors self-end mt-auto"
          >
            skip
          </button>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;