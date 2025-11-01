"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "./utils";

type Word = {
  text: string;
  className?: string;
};

interface TypewriterEffectSmoothProps {
  words: Word[];
  className?: string;
  cursorClassName?: string;
}

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: TypewriterEffectSmoothProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete || currentWordIndex >= words.length) {
      return;
    }

    const currentWord = words[currentWordIndex];
    const typingSpeed = 100;

    const timeout = setTimeout(() => {
      if (currentCharIndex < currentWord.text.length) {
        // Still typing current word
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        // Finished current word, move to next
        setCurrentWordIndex((prev) => prev + 1);
        setCurrentCharIndex(0);

        if (currentWordIndex + 1 >= words.length) {
          setIsComplete(true);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentWordIndex, currentCharIndex, words, isComplete]);

  return (
    <div className={cn("flex flex-wrap justify-center gap-1 sm:gap-2", className)}>
      {words.map((word, idx) => {
        const isCompleted = idx < currentWordIndex;
        const isTyping = idx === currentWordIndex;
        const currentDisplay = isTyping ? word.text.slice(0, currentCharIndex) : "";

        return (
          <span key={`word-${idx}`} className="inline-block">
            {isCompleted ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={word.className}
              >
                {word.text}
              </motion.span>
            ) : isTyping ? (
              <span className={word.className}>
                {currentDisplay}
                {!isComplete && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 0,
                    }}
                    className={cn(
                      "ml-1 inline-block h-4 w-[2px] translate-y-1",
                      cursorClassName
                    )}
                    style={{ backgroundColor: 'currentColor' }}
                  />
                )}
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
};

