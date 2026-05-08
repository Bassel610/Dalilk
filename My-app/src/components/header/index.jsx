import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assast/Images/Logo.png';
import Button from '../button';
import SearchInput from '../search-input';
import ProfileChip from '../profile-chip';
import { CategoryIcon } from '../icons';
import { useAuth } from '../../hooks/auth/use-auth';
import { ROUTES } from '../../constants/app/routes';
import { TEXT } from '../../constants/app/ui-text';
import { HEADER_CATEGORIES, HEADER_CATEGORIES_MOBILE } from '../../constants/components/header/categories';
import './styles.css';

function categoryLink(key) {
  return key === 'all' ? ROUTES.DETAILS : `${ROUTES.DETAILS}?category=${key}`;
}

export default function Header({ inputvalue, onchangefun, searchBTN, id }) {
  const { user } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const onDetails = location.pathname === ROUTES.DETAILS;
  const activeCategory = params.get('category') || (onDetails ? 'all' : null);

  return (
    <div className="Header">
      <div className="CoverNavBar">
        <div className="Logo Flex">
          <Link to={ROUTES.HOME}>
            <img className="LogoImg" src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="AuthNav">
          {user ? (
            <ProfileChip />
          ) : (
            <>
              <Button variant="outline" size="sm" to={ROUTES.LOGIN}>
                {TEXT.NAV.LOGIN}
              </Button>
              <Button variant="solid" size="sm" to={ROUTES.REGISTER}>
                {TEXT.NAV.REGISTER}
              </Button>
            </>
          )}
        </div>

        <div className="Search">
          <SearchInput
            id={id}
            value={inputvalue}
            onChange={onchangefun}
            onSubmit={searchBTN}
          />
        </div>

        <div className="CatList">
          <ul>
            {HEADER_CATEGORIES.map((c) => (
              <li
                key={c.key}
                className={activeCategory === c.key ? 'is-active' : ''}
              >
                <Link to={categoryLink(c.key)}>
                  <CategoryIcon name={c.icon} />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="CatListDis">
          <ul>
            {HEADER_CATEGORIES_MOBILE.map((c) => (
              <li
                key={c.key}
                className={activeCategory === c.key ? 'is-active' : ''}
              >
                <Link to={categoryLink(c.key)}>
                  <CategoryIcon name={c.icon} />
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
