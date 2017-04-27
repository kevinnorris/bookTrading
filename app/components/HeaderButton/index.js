import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { darkerHover, primaryDarker } from 'utils/colors';

const HeaderButton = styled(Button)`
  background: ${primaryDarker};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;

  &:hover, &:active, &:focus{
    background: ${darkerHover};
    color: white;
    text-decoration: none;
  }
`;

export default HeaderButton;
