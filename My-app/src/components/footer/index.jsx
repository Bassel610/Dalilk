import { Link } from 'react-router-dom';
import { IconFacebook, IconInstagram, IconTwitter } from '../icons';
import { ROUTES } from '../../constants/app/routes';
import { TEXT } from '../../constants/app/ui-text';
import { HEADER_CATEGORIES } from '../../constants/components/header/categories';
import { FOOTER_TEXT } from '../../constants/components/footer';
import './styles.css';

export default function Footer() {
  return (
    <>
      <footer className="Footer">
        <div className="Footer-shell">
          <div className="Footer-brand">
            <h3>{TEXT.BRAND}</h3>
            <p>{FOOTER_TEXT.TAGLINE}</p>
            <div className="Footer-socials">
              <a href="#" aria-label="Facebook"><IconFacebook /></a>
              <a href="#" aria-label="Instagram"><IconInstagram /></a>
              <a href="#" aria-label="Twitter"><IconTwitter /></a>
            </div>
          </div>

          <div className="Footer-col">
            <h4>{FOOTER_TEXT.COL_NAV}</h4>
            <ul>
              <li><Link to={ROUTES.HOME}>{FOOTER_TEXT.NAV_HOME}</Link></li>
              <li><Link to={ROUTES.DETAILS}>{FOOTER_TEXT.NAV_ALL_SHOPS}</Link></li>
              <li><Link to={ROUTES.LOGIN}>{FOOTER_TEXT.NAV_LOGIN}</Link></li>
              <li><Link to={ROUTES.REGISTER}>{FOOTER_TEXT.NAV_REGISTER}</Link></li>
            </ul>
          </div>

          <div className="Footer-col">
            <h4>{FOOTER_TEXT.COL_CATS}</h4>
            <ul>
              {HEADER_CATEGORIES.filter((c) => c.key !== 'all').slice(0, 6).map((c) => (
                <li key={c.key}>
                  <Link to={`${ROUTES.DETAILS}?category=${c.key}`}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="Footer-col">
            <h4>{FOOTER_TEXT.COL_LEGAL}</h4>
            <ul>
              <li><a href="#">{FOOTER_TEXT.LEGAL_PRIVACY}</a></li>
              <li><a href="#">{FOOTER_TEXT.LEGAL_TERMS}</a></li>
              <li><a href="#">{FOOTER_TEXT.LEGAL_CONTACT}</a></li>
            </ul>
          </div>
        </div>

        <div className="Footer-bottom">
          <span>{FOOTER_TEXT.COPYRIGHT(new Date().getFullYear())}</span>
          <span>{FOOTER_TEXT.MADE_IN}</span>
        </div>
      </footer>
    </>
  );
}
