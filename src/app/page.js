
export default function Home() {
  return (
    <div>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome to Your Website
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              This is your homepage with a beautiful navbar. Start building your amazing website!
            </p>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Get Started
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature 1</h3>
              <p className="text-gray-600">
                Description of your first feature or service goes here.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature 2</h3>
              <p className="text-gray-600">
                Description of your second feature or service goes here.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature 3</h3>
              <p className="text-gray-600">
                Description of your third feature or service goes here.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}