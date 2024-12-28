import { cn } from '../../utils/cn';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientBorder({ children, className }: GradientBorderProps) {
  return (
    <div className={cn(
      "relative rounded-full p-[1px] bg-gradient-accent",
      className
    )}>
      <div className="absolute inset-[1px] rounded-full bg-dark-900" />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}