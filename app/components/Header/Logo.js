import styled from 'styled-components';
import { Link } from 'react-router';
import { primaryDarker } from 'utils/colors';

const Logo = styled(Link)`
  color: ${primaryDarker};
  margin: 0;
  font-size: 3rem;
  font-weight: bold;
  text-decoration: none;

  &:hover{
    text-decoration: none;
    color: ${primaryDarker};
  }
`;

export default Logo;
