import Header from '../components/layout/Header';
import SearchBar from '../components/SearchBar';
import OurServices from '../components/OurServices';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <div>
      <Header />
      <SearchBar />
      
      <main className="min-h-screen bg-gray-50">
        <OurServices />
        <Testimonials />
        <FAQ />
      </main>
    </div>
  );
}


