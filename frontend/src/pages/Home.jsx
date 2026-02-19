import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Video from '../components/Video';
import Images from '../components/Images';
import Products from '../components/Products';

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Categories />
      <Video />
      <Images />
      <Products />
      {/* Add more sections here */}
    </div>
  );
}
