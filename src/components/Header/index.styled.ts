import styled from "styled-components";

export const Container = styled.header`
  position: relative; // Add this to position the video

  .background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1; // Ensure the video sits behind your header content
  }

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  border-color: ${({ theme }) => theme.border};
  border-bottom-width: 0.5px;
  border-bottom-style: solid;

  margin-bottom: 15px;
`;

export const Content = styled.div`
  background-color: rgba(
    255,
    255,
    255,
    0
  ); // This is an example with a white semi-transparent background

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: space-between;

  width: 40%;

  @media (max-width: 768px) {
    width: 95%;
  }

  max-width: 650px;

  svg:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  a {
    color: ${({ theme }) => theme.text};
  }
`;

export const Logo = styled.h1`
  color: #ffff00;
  font-family: "Helvetica", "Arial", sans-serif; // Helvetica with fallbacks
  text-transform: uppercase;
  width: max-content;
  letter-spacing: 7.5px; // Triple the space between characters

  -webkit-touch-callout: none;
  user-select: none;
`;
