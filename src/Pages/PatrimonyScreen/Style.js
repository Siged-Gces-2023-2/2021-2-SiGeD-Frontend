import styled from 'styled-components';
import colors from '../../Constants/colors';

export const H1 = styled.h1`
  font-size: 1.5rem;
  font-family: Montserrat;
`;

export const TableHeader = styled.div`
  background-color: ${colors.navHeaders};
  color: ${colors.secondary};
  height: 5vh;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 750px) {
    visibility: hidden;
  }
`;

export const P = styled.div`
  color: ${colors.secondary};
  font-size: 2vh;

  @media (max-width: 750px) {
    font-size: 1.6vh;
  }
`;

export const Bar = styled.div`
  width: 0.05%;
  height: 35%;
  border-radius: 3px;
  background-color: ${colors.secondary};
`;

export const TableTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: ${(props) => `${props.width}%`};
`;

export const Button = styled.div`
  background-color: ${colors.primary};
  color: ${colors.secondary};
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 25.5%;
  right: 240px;
  height: 50px;
  border-radius: 15px;

  @media(max-width: 750px){
    top: 16%;
    right: 38%;
  }
`;
