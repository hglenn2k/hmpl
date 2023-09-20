import styled from "styled-components";
import { IoMusicalNoteOutline, IoHelpCircleOutline } from "react-icons/io5";

export const Container = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.75);
`;

export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; // Ensure the video is below the content
  border-radius: 10px;
`;

export const PopUp = styled.div`
  position: relative; // to position the video inside it
  width: 90%;
  max-width: 500px;
  @media (max-width: 768px) {
    width: 80%;
  }
  padding: 20px;

  background-color: rgba(0, 0, 0, 0.4);

  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 0;
    color: ${({ theme }) => theme.red};
  }
`;

export const Spacer = styled.div`
  width: 70%;
  height: 0.2px;

  margin: 20px 0;

  background-color: ${({ theme }) => theme.text};
  opacity: 0.5;
`;

export const Section = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  a {
    color: ${({ theme }) => theme.text};
  }
`;

export const Contact = styled.p`
  a {
    color: ${({ theme }) => theme.text};
  }
  color: ${({ theme }) => theme.red};
  margin-top: 5%;

  font-size: 0.9rem;
  font-weight: bold;
`;

export const StyledMusicalNoteIcon = styled(IoMusicalNoteOutline)`
  color: ${({ theme }) => theme.red};
`;

export const StyledHelpCircleIcon = styled(IoHelpCircleOutline)`
  color: ${({ theme }) => theme.red};
`;
