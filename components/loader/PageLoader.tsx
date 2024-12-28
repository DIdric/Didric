import { LoaderLogo } from './LoaderLogo';
import { LoaderProgress } from './LoaderProgress';
import { cn } from '../../utils/cn';

export function PageLoader() {
  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-dark-900",
      "flex flex-col items-center justify-center gap-8",
      "animate-fadeOut animation-delay-1800"
    )}>
      <LoaderLogo />
      <LoaderProgress />
    </div>
  );
}