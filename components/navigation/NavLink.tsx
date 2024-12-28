import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const location = useLocation();
  const isExternal = href.startsWith('http');
  const isAnchor = href.startsWith('#');
  const isHomeAnchor = href.startsWith('/#');

  // Handle external links
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative px-4 py-2 text-sm font-medium transition-colors",
          "before:absolute before:inset-x-4 before:bottom-1 before:h-px",
          "before:bg-gradient-accent before:opacity-0 before:transition-opacity",
          "hover:before:opacity-100",
          className
        )}
      >
        {children}
      </a>
    );
  }

  // Handle anchor links on home page
  if (isHomeAnchor) {
    const elementId = href.split('#')[1];
    return (
      <a
        href={href}
        className={cn(
          "relative px-4 py-2 text-sm font-medium transition-colors",
          "before:absolute before:inset-x-4 before:bottom-1 before:h-px",
          "before:bg-gradient-accent before:opacity-0 before:transition-opacity",
          "hover:before:opacity-100",
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          if (location.pathname !== '/') {
            window.location.href = href;
            return;
          }
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {children}
      </a>
    );
  }

  // Handle regular anchor links
  if (isAnchor) {
    const elementId = href.slice(1);
    return (
      <a
        href={href}
        className={cn(
          "relative px-4 py-2 text-sm font-medium transition-colors",
          "before:absolute before:inset-x-4 before:bottom-1 before:h-px",
          "before:bg-gradient-accent before:opacity-0 before:transition-opacity",
          "hover:before:opacity-100",
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {children}
      </a>
    );
  }

  // Handle internal navigation
  return (
    <Link
      to={href}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-colors",
        "before:absolute before:inset-x-4 before:bottom-1 before:h-px",
        "before:bg-gradient-accent before:opacity-0 before:transition-opacity",
        "hover:before:opacity-100",
        className
      )}
    >
      {children}
    </Link>
  );
}