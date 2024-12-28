import { LucideIcon } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
}

export function SocialLink({ href, icon: Icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-dark-800 hover:bg-dark-700 p-3 rounded-full transition-colors">
        <Icon className="w-5 h-5" />
      </div>
    </a>
  );
}