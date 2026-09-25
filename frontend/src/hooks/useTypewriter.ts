import { useState, useEffect } from 'react';

const LINES = ['Sip.', 'Savour.', 'Sustain.'];
const TYPE_SPEED = 80;   // ms per character
const LINE_DELAY = 220;  // pause between lines

export function useTypewriter() {
  const [revealed, setRevealed] = useState([0, 0, 0]);
  const [activeLine, setActiveLine] = useState(0); // which line is currently typing
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      if (lineIdx >= LINES.length) {
        setDone(true);
        setActiveLine(-1); // no active line when done
        return;
      }

      const line = LINES[lineIdx];
      charIdx++;

      setActiveLine(lineIdx);
      setRevealed(prev => {
        const next = [...prev];
        next[lineIdx] = charIdx;
        return next;
      });

      if (charIdx < line.length) {
        timeout = setTimeout(tick, TYPE_SPEED);
      } else {
        lineIdx++;
        charIdx = 0;
        timeout = setTimeout(tick, LINE_DELAY);
      }
    }

    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, []);

  return { revealed, activeLine, done };
}
