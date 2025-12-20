import { useEffect, useRef } from "react";

export default function NotFound() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let x = 150;
    let y = 150;
    let dx = 2;
    let dy = 0;

    function drawPacman() {
      ctx.beginPath();
      ctx.arc(x, y, 15, 0.25 * Math.PI, 1.75 * Math.PI);
      ctx.lineTo(x, y);
      ctx.fillStyle = "#FFD700";
      ctx.fill();
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPacman();

      x += dx;
      y += dy;

      if (x > canvas.width) x = 0;
      if (x < 0) x = canvas.width;
      if (y > canvas.height) y = 0;
      if (y < 0) y = canvas.height;
    }

    function handleKey(e) {
      if (e.key === "ArrowRight") { dx = 2; dy = 0; }
      if (e.key === "ArrowLeft") { dx = -2; dy = 0; }
      if (e.key === "ArrowUp") { dx = 0; dy = -2; }
      if (e.key === "ArrowDown") { dx = 0; dy = 2; }
    }

    window.addEventListener("keydown", handleKey);
    const gameLoop = setInterval(update, 16);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 – Kau tersesat</h1>

      <p style={styles.subtitle}>
        Jangan panik. Dalam dunia kami, error = hiburan 🎮
      </p>

      <canvas
        ref={canvasRef}
        width="300"
        height="300"
        style={styles.canvas}
      />

      <p style={styles.footer}>
        Dah bosan? Balik ke{" "}
        <a href="/" style={styles.link}>Homepage</a>
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
    fontSize: "2.8rem",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "25px",
    color: "#ff5555",
  },
  canvas: {
    border: "2px solid #ff5555",
    borderRadius: "12px",
    background: "#000",
    boxShadow: "0 0 20px rgba(255,85,85,0.6)",
  },
  footer: {
    marginTop: "25px",
    fontSize: "1rem",
  },
  link: {
    color: "#ff5555",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
