import WebsiteLayout from '../../layouts/website';
import Hero from './hero';
import Featured from './featured';
import CategoriesGrid from './categories-grid';

export default function Home({ inputvalue, onchangefun, searchBTN, id }) {
  return (
    <WebsiteLayout headerProps={{ id, inputvalue, onchangefun, searchBTN }}>
      <Hero />
      <Featured />
      <CategoriesGrid />
    </WebsiteLayout>
  );
}
