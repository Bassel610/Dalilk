import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { HEADER_CATEGORIES } from '../../constants/categories';
import './styles.css';

function IconFb() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>
  );
}
function IconIg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>
  );
}
function IconTw() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  );
}

export default function Footer() {
  return (
    <>
      <footer className="Footer">
        <div className="Footer-shell">
          <div className="Footer-brand">
            <h3>دليلك</h3>
            <p>دليل المحلات والخدمات الأقرب إليك في مدينتك. ابحث، صفّ النتائج، واصل لأي مكان بسهولة.</p>
            <div className="Footer-socials">
              <a href="#" aria-label="Facebook"><IconFb /></a>
              <a href="#" aria-label="Instagram"><IconIg /></a>
              <a href="#" aria-label="Twitter"><IconTw /></a>
            </div>
          </div>

          <div className="Footer-col">
            <h4>التصفح</h4>
            <ul>
              <li><Link to={ROUTES.HOME}>الرئيسية</Link></li>
              <li><Link to={ROUTES.DETAILS}>كل المحلات</Link></li>
              <li><Link to={ROUTES.LOGIN}>تسجيل الدخول</Link></li>
              <li><Link to={ROUTES.REGISTER}>إنشاء حساب</Link></li>
            </ul>
          </div>

          <div className="Footer-col">
            <h4>التصنيفات</h4>
            <ul>
              {HEADER_CATEGORIES.filter((c) => c.key !== 'all').slice(0, 6).map((c) => (
                <li key={c.key}>
                  <Link to={`${ROUTES.DETAILS}?category=${c.key}`}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="Footer-col">
            <h4>قانوني</h4>
            <ul>
              <li><a href="#">سياسة الخصوصية</a></li>
              <li><a href="#">شروط الاستخدام</a></li>
              <li><a href="#">تواصل معنا</a></li>
            </ul>
          </div>
        </div>

        <div className="Footer-bottom">
          <span>© {new Date().getFullYear()} دليلك. جميع الحقوق محفوظة.</span>
          <span>صُنع بحب في مصر</span>
        </div>
      </footer>
    </>
  );
}
