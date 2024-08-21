import styled from 'styled-components';
import tailwindConfig from '../tailwind.config'

const colors = tailwindConfig.theme.extend.colors;
const fonts = tailwindConfig.theme.extend.fontFamily;

export const Button = styled.button`
background : ${({ $primary }) => ($primary ? colors['lightGreen']: "white")};
color : ${({ $primary }) => ($primary ? colors['darkGreen']: "black")};
fontFamily: ${fonts['body']};
font-weight: 600;
  font-size: 1rem;
  margin: 1rem;
  padding: 1rem 2rem;
  border-radius: 100px;
`;
