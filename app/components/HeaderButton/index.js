import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { darkerHover, primaryDarker } from 'utils/colors';

const HeaderButton = styled(Button)`
  background: ${primaryDarker};
  color: white;
  &:hover{
    background: ${darkerHover};
    color: white;
  }
`;

export default HeaderButton;
