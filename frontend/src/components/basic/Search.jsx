import { Button, InvertedButton } from '../styled/base'
import { SearchOutline } from '@styled-icons/evaicons-outline/SearchOutline'
import { Cross } from '@styled-icons/entypo/Cross'
import styled, { css } from 'styled-components'
import Input from './Input'
import { useSelector } from 'react-redux'

const StyledButton = styled(Button)`
  border-radius: 0 ${(props) => props.theme.borderRadius}
    ${(props) => props.theme.borderRadius} 0;
`

const SearchInput = styled.div`
  margin: 0 0 0 clamp(10px, 20px, 30px);
  display: flex;
  position: relative;

  .label {
    font-size: 1.2rem;
    text-transform: uppercase;
    font-family: var(--serif);
    top: -4px;
  }

  .inverted {
    position: absolute;
    right: 40px;
    top: 10px;
  }
  .inverted:hover {
    background-color: transparent;
    color: var(--main);
  }
`

const Search = ({ value, onChange, onEnter, onClear, onSearch }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <SearchInput>
      <Input
        label={lang.search}
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
          className="inverted"
          onClick={onClear}>
          <Cross />
        </button>
      )}
      <StyledButton onClick={onSearch}>
        <SearchOutline />
      </StyledButton>
    </SearchInput>
  )
}
export default Search
