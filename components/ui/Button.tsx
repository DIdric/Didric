import React from 'react';
import { cn } from '../../utils/cn';
import { useScrollTo } from '../../hooks/useScrollTo';
import { GradientBorder } from './GradientBorder';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  asChild?: boolean;
  href?: string;
  fullWidth?: boolean;
}

export function Button({ 
  className, 
  variant = 'primary',
  asChild,
  href,
  onClick,
  children,
  fullWidth,
  ...props 
}: ButtonProps) {
  const scrollTo = useScrollTo();
  
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-white transition-all duration-300";
  const variants = {
    primary: "hover:opacity-90",
    secondary: "hover:bg-dark-800/50 rounded-full"
  };
  const widthStyles = fullWidth ? "w-full" : "w-fit";

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      scrollTo(href.slice(1));
    }
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);
  };

  const Component = asChild || href ? 'a' : 'button';
  
  if (variant === 'secondary') {
    return (
      <Component
        {...(href ? { href } : {})}
        onClick={handleClick}
        className={cn(baseStyles, variants.secondary, widthStyles, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
  
  return (
    <GradientBorder className={cn("group", widthStyles)}>
      <Component
        {...(href ? { href } : {})}
        onClick={handleClick}
        className={cn(
          baseStyles,
          variants.primary,
          "w-full relative overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        {children}
        <div className="absolute inset-x-0 bottom-0 h-[1px] overflow-hidden">
          <div className="w-full h-full bg-gradient-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </div>
      </Component>
    </GradientBorder>
  );
}