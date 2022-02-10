import { makeStyles } from '@mui/styles'
import styled from 'styled-components'

export const StyledTr = styled.tr`
  background-color: #f0f0f0;
  border-bottom: 3px solid #7a7a7a;
  border-top: 3px solid #7a7a7a;
  position: relative;
  &: hover {
    background-image: linear-gradient(315deg, #af8c9d 50%, #adadad 50%);
  }
`

export const StyledTd = styled.td.attrs((props) => ({
  style: {
    backgroundColor: props.color,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
}))`
  &: hover {
    cursor: pointer;
    background-image: ${(props) => props.hoverColor};
  }
`
