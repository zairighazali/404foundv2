import { useEffect, useRef, useState } from "react";

export default function NotFound() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const player = { x: 140, y: 260, w: 40, h: 20 };
    let bullets = [];
    let enemies = [];
    let enemyDir = 1;
    let gameOver = false;

    // ===== AUDIO =====
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const playSound = (freq, duration = 0.1) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = freq;
      osc.type = "square";
      gain.gain.value = 0.05;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    };

    // ===== ENEMIES =====
    function spawnEnemies() {
      enemies = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 6; c++) {
          enemies.push({
            x: 40 + c * 40,
            y: 30 + r * 30,
            w: 24,
            h: 16,
          });
        }
      }
    }
    spawnEnemies();

    // ===== DRAW =====
    const drawPlayer = () => {
      ctx.fillStyle = "#00ffcc";
      ctx.fillRect(player.x, player.y, player.w, player.h);
    };

    const drawBullets = () => {
      ctx.fillStyle = "#fff";
      bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 10));
    };

    const drawEnemies = () => {
      ctx.fillStyle = "#ff5555";
      enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h));
    };

    const drawScore = () => {
      ctx.fillStyle = "#fff";
      ctx.font = "14px monospace";
      ctx.fillText(`SCORE: ${score}`, 10, 20);
    };

    // ===== UPDATE =====
    const updateBullets = () => {
      bullets.forEach(b => (b.y -= 5));
      bullets = bullets.filter(b => b.y > 0);
    };

    const updateEnemies = () => {
      let edgeHit = false;
      enemies.forEach(e => {
        e.x += enemyDir;
        if (e.x <= 0 || e.x + e.w >= canvas.width) edgeHit = true;
      });

      if (edgeHit) {
        enemyDir *= -1;
        enemies.forEach(e => (e.y += 10));
      }
    };

    const detectCollisions = () => {
      bullets.forEach((b, bi) => {
        enemies.forEach((e, ei) => {
          if (
            b.x < e.x + e.w &&
            b.x + 4 > e.x &&
            b.y < e.y + e.h &&
            b.y + 10 > e.y
          ) {
            bullets.splice(bi, 1);
            enemies.splice(ei, 1);
            playSound(200, 0.15);
            setScore(s => s + 10);
          }
        });
      });

      enemies.forEach(e => {
        if (e.y + e.h >= player.y) gameOver = true;
      });
    };

    // ===== LOOP =====
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (gameOver) {
        ctx.fillStyle = "#ff5555";
        ctx.font = "20px monospace";
        ctx.fillText("GAME OVER", 90, 150);
        return;
      }

      drawPlayer();
      drawBullets();
      drawEnemies();
      drawScore();

      updateBullets();
      updateEnemies();
      detectCollisions();

      if (enemies.length === 0) spawnEnemies();
      requestAnimationFrame(loop);
    }

    // ===== KEYBOARD =====
    const handleKey = e => {
      if (audioCtx.state === "suspended") audioCtx.resume();
      if (e.key === "ArrowLeft" && player.x > 0) player.x -= 12;
      if (e.key === "ArrowRight" && player.x < canvas.width - player.w)
        player.x += 12;
      if (e.key === " ") {
        bullets.push({ x: player.x + 18, y: player.y });
        playSound(600);
      }
    };

    // ===== TOUCH =====
    let touchStartX = null;

    const handleTouchStart = e => {
      if (audioCtx.state === "suspended") audioCtx.resume();
      touchStartX = e.touches[0].clientX;

      // tap = shoot
      bullets.push({ x: player.x + 18, y: player.y });
      playSound(600);
    };

    const handleTouchMove = e => {
      if (touchStartX === null) return;
      const currentX = e.touches[0].clientX;
      const diff = currentX - touchStartX;

      player.x += diff * 0.2;
      player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
      touchStartX = currentX;
    };

    // prevent scroll
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKey);

    loop();

    return () => {
      window.removeEventListener("keydown", handleKey);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [score]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 — ALIEN TERRITORY</h1>

      <p style={styles.subtitle}>
        Swipe untuk gerak. Tap untuk tembak 👾
      </p>

      <canvas
        ref={canvasRef}
        width="320"
        height="300"
        style={styles.canvas}
      />

      <p style={styles.footer}>
        Desktop: ⬅️ ➡️ + SPACE  
        <br />
        Balik ke{" "}
        <a href="/" style={styles.link}>Homepage</a> bila dah puas lawan alien.
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f0f0f",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "2.4rem",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "1.1rem",
    marginBottom: "15px",
    color: "#ff5555",
  },
  canvas: {
    background: "#000",
    border: "2px solid #ff5555",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(255,85,85,0.6)",
    touchAction: "none", // 🔥 penting
  },
  footer: {
    marginTop: "15px",
    fontSize: "0.9rem",
    lineHeight: "1.5",
  },
  link: {
    color: "#ff5555",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
