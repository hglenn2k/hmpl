import styled from "styled-components";

export const Buttons = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const LyricsPlaceholder = styled.div`
  background-color: #f3f4f6; // Light gray background for placeholder
  border: 1px solid #d1d5db; // Light gray border
  padding: 10px 20px;
  margin: 20px 0;
  border-radius: 8px;
  font-size: 1.2rem;
  text-align: center;

  // You can add more styles or variations for the redacted parts, e.g.
  span.redacted {
    background-color: #2f3640; // Darker gray for redacted parts
    color: transparent; // Hide the actual text
    user-select: none; // Prevent users from selecting and revealing the text
  }
`;
