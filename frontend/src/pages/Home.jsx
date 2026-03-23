import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Video from '../components/Video';
import Images from '../components/Images';
import Products from '../components/Products';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Categories />
      <Video />
      <Images />
      <Products />
      <FAQ />
      {/* Add more sections here */}
    </div>
  );
}
