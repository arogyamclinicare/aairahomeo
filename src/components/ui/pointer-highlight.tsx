"use client";

import * as React from "react";
import { cn } from "./utils";

interface PointerHighlightProps {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
}

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}: PointerHighlightProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  const angle = Math.atan2(mousePosition.y, mousePosition.x) * (180 / Math.PI);
  const distance = Math.min(Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2), 50);

  return (
    <span
      ref={containerRef}
      className={cn("relative inline-block", containerClassName)}
    >
      {/* Rectangle highlight */}
      <span
        className={cn(
          "absolute inset-0 rounded-sm border",
          rectangleClassName
        )}
        style={{
          transform: "skewX(-12deg)",
          left: "-2px",
          right: "-2px",
        }}
      />
      
      {/* Pointer/Arrow - follows mouse */}
      <span
        className={cn(
          "absolute -right-2 top-1/2 -translate-y-1/2 transition-transform duration-100 ease-out pointer-events-none",
          pointerClassName
        )}
        style={{
          transform: `translate(${distance * 0.3}px, ${distance * 0.1}px) rotate(${angle + 45}deg)`,
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M6 0L11.196 10.5H0.804L6 0Z" />
        </svg>
      </span>
      
      {/* Content */}
      {children}
    </span>
  );
}

