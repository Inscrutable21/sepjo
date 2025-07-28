import Link from 'next/link';

export default function MobileNavbar({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  isDarkMode, 
  toggleDarkMode 
}) {
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`md:hidden transition-all duration-300 ease-in-out ${
      isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="px-2 pt-4 pb-6 space-y-1">
          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-3 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 text-base font-semibold transition-colors rounded-md"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              href="/Blog" 
              className="block px-3 py-3 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 text-base font-semibold transition-colors rounded-md"
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-3 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 text-base font-semibold transition-colors rounded-md"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-3 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 text-base font-semibold transition-colors rounded-md"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </div>
          
          {/* Mobile Action Links */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
            <Link 
              href="/wishlist" 
              className="flex items-center px-3 py-3 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 text-base font-semibold transition-colors rounded-md"
              onClick={closeMobileMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Wishlist
            </Link>
            
            <Link 
              href="/account" 
              className="flex items-center px-3 py-3 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 text-base font-semibold transition-colors rounded-md"
              onClick={closeMobileMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account
            </Link>
            
            <button
              onClick={() => {
                toggleDarkMode();
                closeMobileMenu();
              }}
              className="flex items-center w-full px-3 py-3 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 text-base font-semibold transition-colors rounded-md"
            >
              {isDarkMode ? (
                <>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
