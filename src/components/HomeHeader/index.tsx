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
      <video
        src="/chrome.mp4"
        muted
        autoPlay
        loop
        className="background-video"
      ></video>
      <Styled.Content>
        <IoInformationCircleOutline
          onClick={openInfoPopUp}
          size={30}
          width={30}
          height={30}
          color={"#83d350"}
        />

        <Styled.Logo>HMPL.ECO</Styled.Logo>

        <a href="#"></a>
      </Styled.Content>
    </Styled.Container>
  );
}
