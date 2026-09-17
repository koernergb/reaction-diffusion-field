"use client";
import React from "react";

interface DistortedSectionProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function DistortedSection({ className = "", children, style, onClick }: DistortedSectionProps) {
  return (
    <div 
      className={`distorted-section ${className}`} 
      style={{ position: 'relative', ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

