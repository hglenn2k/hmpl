import styled from "styled-components";

export const Container = styled.div`
  width: 90%;

  @media (max-width: 768px) {
    width: 90%;
  }

  max-width: 700px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 auto;

  h2 {
    color: #00fdf9;
  }
`;
