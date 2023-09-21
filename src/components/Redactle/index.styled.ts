import styled from "styled-components";

export const Buttons = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const LyricsPlaceholder = styled.div`
  font-family: "Courier Sans", monospace; // Fall back to monospace if 'Courier Sans' isn't available
  font-weight: bold;
  background-color: #d3d3d3; // Light gray background for placeholder
  border: 1px solid #d1d5db; // Light gray border
  padding: 10px 20px;
  margin: 20px 0;
  border-radius: 8px;
  font-size: 1.25rem;
  text-align: center;
  color: #8b0000; // Dark red text color

  span.redacted {
    background-color: #2f3640; // Darker gray for redacted parts
    color: transparent; // Hide the actual text
    user-select: none; // Prevent users from selecting and revealing the text
  }
`;
