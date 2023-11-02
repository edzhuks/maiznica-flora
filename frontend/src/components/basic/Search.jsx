import { Button, InvertedButton, StyledInput } from '../styled/base'
import { SearchOutline } from '@styled-icons/evaicons-outline/SearchOutline'
import { Cross } from '@styled-icons/entypo/Cross'
import styled, { css } from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 0 ${(props) => props.theme.borderRadius}
    ${(props) => props.theme.borderRadius} 0;
`

const SearchInput = styled.div`
  margin: 0 0 0 clamp(10px, 20px, 30px);
  display: flex;
  position: relative;
  ${StyledInput} {
    box-shadow: ${(props) => props.theme.shadowInset};
    background-color: ${(props) => props.theme.lighter};
    border-radius: ${(props) => props.theme.borderRadius} 0 0
      ${(props) => props.theme.borderRadius};
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

        {value && (
          <InvertedButton onClick={onClear}>
            <Cross />
          </InvertedButton>
        )}
      </SearchInput>
      <StyledButton onClick={onSearch}>
        <SearchOutline />
      </StyledButton>
    </SideSearch>
  )
}
export default Search
