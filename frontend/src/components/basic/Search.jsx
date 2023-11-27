import { SearchOutline } from '@styled-icons/evaicons-outline/SearchOutline'
import { Cross } from '@styled-icons/entypo/Cross'
import styled from 'styled-components'
import Input from './Input'
import { useSelector } from 'react-redux'

const StyledButton = styled.button`
  border-radius: 0 va(--border-radius) var(--border-radius) 0;
`

const SearchInput = styled.div`
  display: flex;
  position: relative;
  align-items: end;
  align-self: center;

  .label {
    font-size: 1.2rem;
    text-transform: uppercase;
    font-family: var(--serif);
    top: 6px;
  }
  .inverted {
    position: absolute;
    z-index: 20;
    left: 175px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const Search = ({
  value,
  onChange,
  onEnter,
  onClear,
  onSearch,
  style,
  className,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div
      className={className}
      style={style}>
      <SearchInput>
        <Input
          label={lang.search}
          className="m-0 "
          width={200}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onEnter()
            }
          }}
        />
        {value && (
          <button
            className="btn inverted icon-button"
            onClick={onClear}>
            <Cross className="icon-m" />
          </button>
        )}
        <StyledButton
          className="btn"
          onClick={onSearch}
          style={{}}>
          <SearchOutline className="icon-m" />
        </StyledButton>
      </SearchInput>
    </div>
  )
}
export default Search
