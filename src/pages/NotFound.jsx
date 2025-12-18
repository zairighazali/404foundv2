
export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 – Halaman Tak Wujud</h1>
      <p style={styles.subtitle}>
        Eh, kau tersesat! Tapi jangan risau, main game dulu 😎
      </p>

      <div style={styles.gameContainer}>
        {/* Gantikan src ni dengan path game kau sendiri */}
        <iframe
          src="/games/pacman/index.html"
          width="600"
          height="400"
          style={styles.iframe}
          title="Arcade Game"
        ></iframe>
      </div>

      <p style={styles.footer}>
        Kembali ke <a href="/" style={styles.link}>Homepage</a> bila-bila masa.
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px 20px",
    fontFamily: "'Arial', sans-serif",
    background: "#0f0f0f",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "40px",
    color: "#ff5555",
  },
  gameContainer: {
    maxWidth: "100%",
    marginBottom: "30px",
  },
  iframe: {
    border: "none",
    borderRadius: "10px",
    boxShadow: "0 0 20px #ff5555",
  },
  footer: {
    marginTop: "20px",
    fontSize: "1rem",
  },
  link: {
    color: "#ff5555",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
