import { TEXT } from '../../constants/ui-text';
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
      <input
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <button type="button" className="SearchInput-btn" onClick={onSubmit}>
        {TEXT.NAV.SEARCH}
      </button>
    </div>
  );
}
