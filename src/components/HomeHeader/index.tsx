import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

import * as Styled from "./index.styled";
import { theme } from "../../constants";

interface Props {
  openInfoPopUp: () => void;
}

export function HomeHeader({ openInfoPopUp }: Props) {
  return (
    <Styled.Container>
      <img src="/chrome.jpg" className="background-video"></img>
      <Styled.Content>
        <Styled.Logo>HMPL.ME</Styled.Logo>
      </Styled.Content>
    </Styled.Container>
  );
}
