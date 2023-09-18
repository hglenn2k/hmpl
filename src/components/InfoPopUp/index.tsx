import React from "react";
import { Button } from "..";
import * as Styled from "./index.styled";

interface Props {
  onClose: () => void;
}

export function InfoPopUp({ onClose }: Props) {
  return (
    <Styled.Container>
      <Styled.PopUp>
        <Styled.VideoBackground autoPlay muted loop src="/chrome.mp4" />
        <h1>Welcome 🍋</h1>
        <Styled.Spacer />
        <Styled.Section>
          <Styled.StyledMusicalNoteIcon size={30} />
          <Styled.Contact>
            How well do you know Beyoncé&apos;s discography?
          </Styled.Contact>
        </Styled.Section>
        <Styled.Section>
          <Styled.StyledHelpCircleIcon size={30} />
          <Styled.Contact>Check back for a new song every day!</Styled.Contact>
        </Styled.Section>
        <Button variant="pink" style={{ marginTop: 20 }} onClick={onClose}>
          Let&apos;s go
        </Button>
      </Styled.PopUp>
    </Styled.Container>
  );
}
