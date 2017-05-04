import styled, { keyframes } from 'styled-components';

import { primaryDarker } from 'utils/colors';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export default styled.div`
  position: relative;
  left: 45%;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid ${primaryDarker};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 1.5s linear infinite;
`;
