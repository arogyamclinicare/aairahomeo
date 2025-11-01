"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./utils";

interface LayoutTextFlipProps {
  text: string;
  words: string[];
  className?: string;
  wordClassName?: string;
  flipInterval?: number;
}

export function LayoutTextFlip({
  text,
  words,
  className,
  wordClassName,
  flipInterval: _flipInterval = 3000,
}: LayoutTextFlipProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

          let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      // Typing phase
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => currentWord.slice(0, prev.length + 1));
        }, 30); // Optimized for smooth animation
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, 15); // Faster deleting for smooth transition
      } else {
        // Finished deleting, move to next word
        setTimeout(() => {
          setIsTyping(true);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 0);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentWordIndex, words]);

  useEffect(() => {
    // Reset when word changes
    setTimeout(() => {
      setDisplayText("");
      setIsTyping(true);
    }, 0);
  }, [currentWordIndex]);

  return (
    <div className={cn("inline-flex items-center", className)}>
      <span>{text}</span>
      <span className="relative ml-2 inline-block min-w-[120px] text-left">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className={cn("inline-block", wordClassName)}
          >
            {displayText}
            {isTyping && displayText.length < words[currentWordIndex]?.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-4 ml-1 bg-emerald-600 translate-y-1"
              />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

