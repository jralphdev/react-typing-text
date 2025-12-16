import '../index.css';
import { useEffect, useMemo, useState, type ComponentProps } from 'react';

interface TypingTextProps {
  words: readonly string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDelay?: number;
  showCursor?: boolean;
  className?: ComponentProps<'span'>['className'];
}

const TypingText = ({
  words,
  typeSpeed = 50,
  deleteSpeed = 50,
  pauseDelay = 3000,
  showCursor = true,
  className,
}: TypingTextProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const currentWord = useMemo(() => words[wordIndex] || '', [words, wordIndex]);

  // Blinking cursor
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => {
      setCursorVisible((visible) => !visible);
    }, 500);
    return () => clearInterval(interval);
  }, [showCursor]);

  // typing / deleting effect
  useEffect(() => {
    if (words.length === 0) return;

    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      // deleting characters
      if (letterIndex > 0) {
        // remove one character at a time
        timeout = setTimeout(() => setLetterIndex((i) => i - 1), deleteSpeed);
      } else {
        // finished deleting → move to next word
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }, 0);
      }
    } else {
      // typing characters
      if (letterIndex < word.length) {
        // add one character at a time
        timeout = setTimeout(() => setLetterIndex((i) => i + 1), typeSpeed);
      } else {
        // finished typing full word → pause before deleting
        timeout = setTimeout(() => setIsDeleting(true), pauseDelay);
      }
    }

    return () => clearTimeout(timeout);
  }, [words, wordIndex, letterIndex, isDeleting, typeSpeed, deleteSpeed, pauseDelay]);

  if (!Array.isArray(words) || words.length === 0) return null;

  const displayText = currentWord.slice(0, letterIndex);
  const cursor = cursorVisible ? '|' : '';

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className='inline-block w-2'>{cursor}</span>}
    </span>
  );
};

export default TypingText;
