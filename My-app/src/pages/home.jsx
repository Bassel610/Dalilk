import WebsiteLayout from '../layouts/website';
import Hero from '../components/home/hero';
import Featured from '../components/home/featured';
import CategoriesGrid from '../components/home/categories-grid';

export default function HomePage({ inputvalue, onchangefun, searchBTN, id }) {
  return (
    <WebsiteLayout headerProps={{ id, inputvalue, onchangefun, searchBTN }}>
      <Hero />
      <Featured />
      <CategoriesGrid />
    </WebsiteLayout>
  );
}
