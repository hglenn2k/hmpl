import React from "react";
import { event } from "react-ga";
import { IoSearch } from "react-icons/io5";
import { searchSong } from "../../helpers";
import * as Styled from "./index.styled";

interface BasicSongProperties {
  youtubeId: string;
  artist: string;
  name: string;
}

interface Props<T extends BasicSongProperties> {
  currentTry: number;
  setSelectedSong: React.Dispatch<React.SetStateAction<T | undefined>>;
  source?: "songs" | "verses";
}

export function Search<T extends BasicSongProperties>({
  currentTry,
  setSelectedSong,
  source = "songs",
}: Props<T>) {
  const [value, setValue] = React.useState<string>("");
  const [results, setResults] = React.useState<T[]>([]);

  React.useEffect(() => {
    if (value) {
      setResults(searchSong(value, source) as T[]); // You might need type casting here
    } else if (value === "") {
      setResults([]);
    }
  }, [value, source]);

  // clear value on selection
  React.useEffect(() => {
    setValue("");
  }, [currentTry]);

  return (
    <Styled.Container>
      <Styled.ResultsContainer>
        {results.map((song) => (
          <Styled.Result
            key={song.youtubeId}
            onClick={() => {
              setSelectedSong(song);
              setValue(`${song.artist} - ${song.name}`);
              setResults([]);

              event({
                category: "Player",
                action: "Chose song",
                label: `${song.artist} - ${song.name}`,
              });
            }}
          >
            <Styled.ResultText>
              {song.artist} - {song.name}
            </Styled.ResultText>
          </Styled.Result>
        ))}
      </Styled.ResultsContainer>
      <Styled.SearchContainer>
        <Styled.SearchPadding>
          <IoSearch size={20} />
          <Styled.Input
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder="Search Songs"
            value={value}
          />
        </Styled.SearchPadding>
      </Styled.SearchContainer>
    </Styled.Container>
  );
}
