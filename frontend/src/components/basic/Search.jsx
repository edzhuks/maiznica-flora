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
    right: 45px;
    top: 7px;
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
    <SearchInput
      style={style}
      className={className}>
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
  )
}
export default Search
