import Input from '../input';
import Button from '../button';
import { TEXT } from '../../constants/app/ui-text';
import './styles.css';

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = '',
  id,
  className = '',
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit?.();
    }
  };
  return (
    <div className={`SearchInput ${className}`.trim()}>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <Button variant="primary" className="SearchInput-btn" onClick={onSubmit}>
        {TEXT.NAV.SEARCH}
      </Button>
    </div>
  );
}
