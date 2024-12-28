import { GradientBorder } from '../ui/GradientBorder';

export function NavLogo() {
  return (
    <GradientBorder className="w-10 h-10">
      <div className="w-full h-full flex items-center justify-center p-2">
        <img src="/D-logo.svg" alt="Logo" className="w-full h-full" />
      </div>
    </GradientBorder>
  );
}