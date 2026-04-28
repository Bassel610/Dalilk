import Header from '../../components/header';
import Footer from '../../components/footer';
import Hero from './components/hero';
import Featured from './components/featured';
import CategoriesGrid from './components/categories-grid';

export default function HomePage({ inputvalue, onchangefun, searchBTN, id }) {
  return (
    <>
      <Header
        id={id}
        inputvalue={inputvalue}
        onchangefun={onchangefun}
        searchBTN={searchBTN}
      />
      <Hero />
      <Featured />
      <CategoriesGrid />
      <Footer />
    </>
  );
}
