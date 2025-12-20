export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Main The Daily Spell!</h1>

      <div style={styles.gameContainer}>
        <iframe
          src="https://itch.io/embed/XXXXX?border_width=0"
          width="640"
          height="480"
          style={styles.iframe}
          title="The Daily Spell"
        ></iframe>
      </div>

      <p style={styles.footer}>
        Kembali ke <a href="/" style={styles.link}>Homepage</a> bila siap main.
      </p>
    </div>
  );
}
