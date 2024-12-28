import { cn } from '../../utils/cn';

export function LoaderProgress() {
  return (
    <div className="w-48 h-[2px] bg-dark-800 rounded-full overflow-hidden">
      <div 
        className="h-full w-full bg-gradient-accent animate-progress origin-left"
      />
    </div>
  );
}