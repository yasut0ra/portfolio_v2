import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface NavBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      if (location.pathname === '/') {
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id') || '';
          
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  const navLinks = location.pathname === '/' ? [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ] : [
    { to: '/', label: 'Home' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">
            <Link to="/">
              <span className="text-blue-600 dark:text-blue-400">My</span>
              <span className="text-gray-800 dark:text-white">Portfolio</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {location.pathname === '/' ? (
                navLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === link.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {link.label}
                  </button>
                ))
              ) : (
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Back to Home
                </Link>
              )}
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/profile'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Profile
              </Link>
              <Link
                to="/blog"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/blog'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Blog
              </Link>
              <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <button
              onClick={toggleMenu}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 invisible'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-md">
          {location.pathname === '/' ? (
            navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeSection === link.id
                    ? 'text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {link.label}
              </button>
            ))
          ) : (
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Back to Home
            </Link>
          )}
          <Link
            to="/profile"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/profile'
                ? 'text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Profile
          </Link>
          <Link
            to="/blog"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/blog'
                ? 'text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;