import { useState } from 'react';
import { NavLogo } from './navigation/NavLogo';
import { NavLink } from './navigation/NavLink';
import { MobileNav } from './navigation/MobileNav';
import { MENU_ITEMS } from './navigation/constants';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full px-4 top-4 z-50">
      <nav className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-dark-800/50 backdrop-blur-md rounded-full" />
          
          {/* Border gradient */}
          <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Content */}
          <div className="relative px-4 sm:px-6">
            <div className="flex items-center justify-between h-14">
              <NavLogo />
              
              <div className="hidden md:flex items-center space-x-1">
                {MENU_ITEMS.map((item) => (
                  <NavLink key={item.label} href={item.href}>
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <MobileNav 
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}