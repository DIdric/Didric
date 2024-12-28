import { Menu, X } from 'lucide-react';
import { NavLink } from './NavLink';
import { MENU_ITEMS } from './constants';
import { Button } from '../ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileNav({ isOpen, onToggle }: MobileNavProps) {
  return (
    <div className="md:hidden">
      <Button
        variant="secondary"
        onClick={onToggle}
        className="!p-2"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {isOpen && (
        <div className="absolute top-20 left-4 right-4">
          <div className="p-2 space-y-1 bg-dark-800/95 backdrop-blur-sm rounded-2xl border border-dark-600">
            {MENU_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                className="block rounded-xl hover:bg-dark-700"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}