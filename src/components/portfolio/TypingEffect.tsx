
import { useEffect, useState } from "react";

export default function TypingEffect({
  phrases,
  className = "",
}: {
  phrases: string[];
  className?: string;
}) {
  const [text, setText] = useState("");
  const [pi, setPi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[pi % phrases.length];
    let speed = deleting ? 32 : 62;
    if (!deleting && text === current) speed = 1700;
    if (deleting && text === "") speed = 350;

    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setPi((v) => (v + 1) % phrases.length);
      } else {
        setText((current ?? "").slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, pi, phrases]);

  return <span className={`typing-caret ${className}`}>{text}</span>;
}
