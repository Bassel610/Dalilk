import Header from '../components/header';
import Footer from '../components/footer';

export default function WebsiteLayout({ children, headerProps, hideFooter = false }) {
  return (
    <>
      <Header {...(headerProps || {})} />
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
