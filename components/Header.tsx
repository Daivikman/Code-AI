
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Page } from '../types';
import { CodeIcon } from './IconComponents';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50 border-b border-cyan-500/20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(Page.Home); }} className="flex-shrink-0 flex items-center gap-2">
              <CodeIcon className="h-8 w-8 text-cyan-400" />
              <span className="text-white font-orbitron text-xl font-bold">CodeAI</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  onClick={(e) => { e.preventDefault(); onNavigate(item.name); }}
                  className={`font-orbitron px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    currentPage === item.name
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
             {/* Mobile menu button could be added here */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
