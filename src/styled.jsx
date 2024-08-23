import styled from 'styled-components';
import tailwindConfig from '../tailwind.config'

const colors = tailwindConfig.theme.extend.colors;
const fonts = tailwindConfig.theme.extend.fontFamily;

console.log(fonts)

export const Header = styled.h1`
font-family: ${fonts['display'][0]};
color: ${colors['darkGreen']};
font-size: 4rem;
line-height: 1.2;
`


export const Button = styled.button`
background : ${({ $primary }) => ($primary ? colors['lightGreen']: "white")};
color : ${({ $primary }) => ($primary ? colors['darkGreen']: "black")};
fontFamily: ${fonts['body']};
font-weight: 600;
  font-size: 1rem;
  margin: 1rem;
  padding: 1rem 2rem;
  border-radius: 100px;
  transition: all cubic-bezier(0.4, 0, 0, 1) 450ms;

  &:hover {
  padding: 1rem 2.4rem;
  background: ${({ $primary }) => ($primary ? 'white': "black")};
  }
`;
