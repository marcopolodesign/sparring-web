import styled from 'styled-components';
import tailwindConfig from '../tailwind.config'

const colors = tailwindConfig.theme.extend.colors;
const fonts = tailwindConfig.theme.extend.fontFamily;


export const Header = styled.h1`
font-family: ${fonts['display'][0]};
color: ${colors['darkGreen']};
font-size: 4rem;
line-height: .8;
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


export const SubContainer = styled.div`
border-radius: 8px;
padding: 1rem;
margin-top: 1rem;
margin-bottom: 1rem;
`

export const Divider = styled.span`
height: 2px;
width: 100%;
background: #000;
display: block;
`

export const ThumbImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100px;
`