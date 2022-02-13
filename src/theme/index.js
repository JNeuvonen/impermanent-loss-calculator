import styled from 'styled-components'

export const StyledTd = styled.td.attrs((props) => ({
  style: {
    backgroundColor: props.color,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
}))`
  &: hover {
    cursor: pointer;
    color: #fff !important;
    background-color: ${(props) => props.hoverColor} !important;
  }
`
