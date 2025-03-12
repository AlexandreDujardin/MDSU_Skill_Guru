import { cn } from "@/lib/utils";
import React from "react";

interface TypographyProps {
  as?: keyof JSX.IntrinsicElements;
  variant?: "h1" | "h2" | "h3" | "title1" | "title2" | "body1" | "body2" | "caption";
  className?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  as: Tag = "p",
  variant = "body1",
  className,
  children,
}) => {
  const baseClasses = {
    h1: "text-h1-d md:text-h1-m font-outfit font-semibold",
    h2: "text-h2-d md:text-h2-m font-outfit font-semibold",
    h3: "text-h3-d md:text-h3-m font-outfit font-semibold",
    title1: "text-title1-d md:text-title1-m font-outfit font-semibold",
    title2: "text-title2-d md:text-title2-m font-outfit font-semibold",
    body1: "text-body1 font-inter font-medium",
    body2: "text-body2 font-inter font-medium",
    caption: "text-caption font-inter",
  };

  return <Tag className={cn(baseClasses[variant], className)}>{children}</Tag>;
};
