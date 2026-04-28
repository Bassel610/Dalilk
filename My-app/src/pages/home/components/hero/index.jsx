import GreenPoster from '../../../../assast/Images/GreenPoster.png';
import searchun from '../../../../assast/Images/searchun.gif';
import { TEXT } from '../../../../constants/ui-text';
import './styles.css';

export default function Hero() {
  return (
    <div className="CoverPage">
      <div className="FullPage">
        <div className="BigImg">
          <img src={GreenPoster} alt="cover" />
        </div>
        <div className="CoverContent">
          <div className="ImgCoverContent">
            <img className="BigIcon" src={searchun} alt="search" />
          </div>
          <div className="TextCoverContent">
            <div>{TEXT.COVER.HEADLINE}</div>
          </div>
          <div className="ScoTextCoverContent">
            <div>{TEXT.COVER.SUB1}</div>
            <div>{TEXT.COVER.SUB2}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
