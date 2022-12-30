import { useEffect, useMemo, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { WordEntry } from "../../../components";
import {
  fetchNewPage,
  getIsFetching,
  getWordsFromPage,
} from "../../../state/WordsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { styled } from "@mui/material/styles";

interface WordsListProps {
  search: string;
  page: number;
  rowsPerPage: number;
}

const StyledLoading = styled("div")`
  width: 50px;
  margin: auto;
  padding: 50px 0px;
`;

export const WordsList = ({ search, page, rowsPerPage }: WordsListProps) => {
  const dispatch = useAppDispatch();

  const isFetching = useAppSelector(getIsFetching);
  const words = useAppSelector(getWordsFromPage(page + 1));

  const wordsList = useMemo(
    () => words.map((entry, index) => <WordEntry word={entry} key={index} />),
    [words]
  );

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current && words.length === 0) {
      dispatch(fetchNewPage(search, page + 1, rowsPerPage));
    }
    isSecondRender.current = true;
  }, [page, rowsPerPage, search]);

  return isFetching ? (
    <StyledLoading>
      <CircularProgress />
    </StyledLoading>
  ) : (
    <>{wordsList}</>
  );
};
