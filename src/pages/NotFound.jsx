import { useEffect, useRef, useState } from "react";

export default function NotFound() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);
  const inputRef = useRef(null);

  const script = [
    "$ locate page",
    "> searching...",
    "> page not found",
    "> but congratulations",
    "> you found us",
    "> aku tahu gelap dekat sini",
    "> macam ni la gelapnya bila page kau orang lain yang buat",
    "> tak ceria dan hambar",
    "> jangan biar gelap ni berpanjangan",
    "> kembali ke halaman utama",
    "> dan mari kita terangi bersama",
    "",
    "type 'home' and press ENTER to return",
  ];

  // typing effect
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = "";
    const interval = setInterval(() => {
      if (lineIndex >= script.length) {
        clearInterval(interval);
        setReady(true);
        inputRef.current?.focus();
        return;
      }

      if (charIndex < script[lineIndex].length) {
        currentLine += script[lineIndex][charIndex];
        charIndex++;
        setLines(prev => {
          const updated = [...prev];
          updated[lineIndex] = currentLine;
          return updated;
        });
      } else {
        lineIndex++;
        charIndex = 0;
        currentLine = "";
        setLines(prev => [...prev, ""]);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();

    setLines(prev => [...prev, `$ ${input}`]);
    setInput("");

    if (["home", "cd /", "exit", "back"].includes(cmd)) {
      setLines(prev => [...prev, "> redirecting..."]);
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } else {
      setLines(prev => [...prev, "> command not found"]);
    }
  };

  return (
    <div style={styles.screen} onClick={() => inputRef.current?.focus()}>
      <div style={styles.terminal}>
        {lines.map((line, i) => (
          <div key={i} style={styles.line}>
            {line}
          </div>
        ))}

        {ready && (
          <form onSubmit={handleSubmit}>
            <span style={styles.prompt}>$ </span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              style={styles.input}
              autoComplete="off"
            />
            <span style={styles.cursor}>█</span>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  screen: {
    background: "#0b0b0b",
    color: "#00ff88",
    width: "100vw",
    height: "100vh",
    fontFamily: "monospace",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "text",
  },
  terminal: {
    width: "100%",
    maxWidth: "900px",
    padding: "40px",
    boxSizing: "border-box",
  },
  line: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.6",
  },
  prompt: {
    color: "#00ff88",
  },
  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#00ff88",
    fontFamily: "monospace",
    fontSize: "1rem",
    width: "300px",
  },
  cursor: {
    marginLeft: "2px",
    animation: "blink 1s infinite",
  },
};
