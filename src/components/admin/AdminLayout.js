export default function AdminLayout({ children, admin, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main content */}
      <div className="flex-1">
        {children}
      </div>
      
      {/* Admin Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  Sepjo Admin Panel
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                © 2025 Sepjo. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Logged in as: {admin?.name || 'Admin'}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Version 1.0.0
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}