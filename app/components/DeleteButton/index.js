import styled from 'styled-components';

import { deleteColor, deleteHover } from 'utils/colors';

export default styled.button`
  display: inline-flex;
  background: ${deleteColor};
  color: white;
  padding: 0.25em 2em;
  margin: 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  
  &:hover, &:active, &:focus{
    background: ${deleteHover};
    color: white;
    text-decoration: none;
  }
`;
