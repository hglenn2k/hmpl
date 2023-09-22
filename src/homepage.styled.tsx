import styled from "styled-components";
export const Container = styled.div`
  width: 40%;

  @media (max-width: 768px) {
    width: 90%;
  }

  max-width: 600px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
`;
export const Buttons = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
