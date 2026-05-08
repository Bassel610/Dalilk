import Button from '../../button';
import SectionHead from '../../section-head';
import { ROUTES } from '../../../constants/app/routes';
import { FEATURED_TEXT } from '../../../constants/pages/home/components/featured';
import { IconArrow } from '../../icons';

export default function FeaturedHead() {
  return (
    <SectionHead
      title={FEATURED_TEXT.TITLE}
      subtitle={FEATURED_TEXT.SUBTITLE}
      action={
        <Button
          variant="link"
          to={ROUTES.DETAILS}
          className="Featured-link"
          endIcon={<IconArrow />}
        >
          {FEATURED_TEXT.SEE_ALL}
        </Button>
      }
    />
  );
}
