import styled from 'styled-components';
import { Link } from 'react-router';
import { darkerHover, primaryDarker } from 'utils/colors';

const HeaderLink = styled(Link)`
  background: ${primaryDarker};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;

  &:hover{
    background: ${darkerHover};
    color: white;
    text-decoration: none;
  }
`;

export default HeaderLink;
