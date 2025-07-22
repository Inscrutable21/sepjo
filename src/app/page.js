import Header from '../components/layout/Header';
import OurServices from '../components/OurServices';

export default function Home() {
  return (
    <div>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <OurServices />
      </main>
    </div>
  );
}