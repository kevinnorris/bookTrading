import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  margin-bottom: 25px;
  background: white;
  padding: 12.5px;
  box-shadow: ${
    (props) => {
      if (props.zLevel) {
        switch (props.zLevel) {
          case 1:
            return '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
          case 2:
            return '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
          case 3:
            return '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';
          case 4:
            return '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
          case 5:
            return '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)';
          default:
            return 'none';
        }
      } else {
        return 'none';
      }
    }
  };
`;

export default Card;
