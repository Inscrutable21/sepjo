import Header from '../components/layout/Header';

export default function Home() {
  return (
    <div>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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