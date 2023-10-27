import { Button, InvertedButton, StyledInput } from '../styled/base'
import { SearchOutline } from '@styled-icons/evaicons-outline/SearchOutline'
import { Cross } from '@styled-icons/entypo/Cross'
import styled, { css } from 'styled-components'

const SearchInput = styled.div`
  margin: 0 0 0 clamp(10px, 20px, 30px);
  display: flex;
  position: relative;
  ${StyledInput} {
    box-shadow: ${(props) => props.theme.shadowInset};
  }
  ${InvertedButton} {
    position: absolute;
    right: 0;
  }
  ${InvertedButton}:hover {
    background-color: transparent;
  }
`

const SideSearch = styled.div`
  display: flex;
  ${(props) =>
    props.theme.isMobile &&
    css`
      padding: 0.7rem 2rem 0.7rem 0px;
      width: 100%;
      border-bottom: 1px solid ${(props) => props.theme.lighter};
      text-align: right;
      ${StyledInput} {
        height: 100%;
        width: 100%;
      }
      ${SearchInput} {
        width: 100%;
      }
    `}
`

const Search = ({ value, onChange, onEnter, onClear, onSearch }) => {
  return (
    <SideSearch>
      <SearchInput>
        <StyledInput
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onEnter()
            }
          }}
        />

        <InvertedButton onClick={onClear}>
          <Cross />
        </InvertedButton>
      </SearchInput>
      <Button onClick={onSearch}>
        <SearchOutline />
      </Button>
    </SideSearch>
  )
}
export default Search
