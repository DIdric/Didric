import { cn } from '../../utils/cn';

export function LoaderLogo() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 bg-gradient-accent rounded-lg animate-pulse" />
      <div className="absolute inset-[2px] bg-dark-900 rounded-lg" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
          P
        </span>
      </div>
    </div>
  );
}