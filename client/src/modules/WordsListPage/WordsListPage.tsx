import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IDInput } from "../../components/IDInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  clearData,
  fetchNewPage,
  getIsFetching,
  getWordsCount,
  getWordsFromPage,
} from "../../state/WordsSlice";

export const WordsListPage = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const search = params.get("word") || "";
  const page = parseInt(params.get("page") || "1") - 1;
  const rowsPerPage = parseInt(params.get("limit") || "10");

  const count = useAppSelector(getWordsCount);
  const isFetching = useAppSelector(getIsFetching);
  const words = useAppSelector(getWordsFromPage(page + 1));

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current && words.length === 0 && !isFetching) {
      dispatch(fetchNewPage(search, page + 1, rowsPerPage));
    }
    isSecondRender.current = true;
  }, [page, rowsPerPage, search]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setParams({
      page: (newPage + 1).toString(),
      limit: params.get("limit") || "",
      word: params.get("word") || "",
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(clearData());
    setParams({
      page: "1",
      limit: parseInt(event.target.value, 10).toString(),
      word: params.get("word") || "",
    });
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(clearData());
    setParams({
      page: "1",
      limit: params.get("limit") || "",
      word: event.target.value,
    });
  };

  return (
    <>
      <IDInput onChange={handleSearchChange} />
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Number of words"
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isFetching ? (
        <CircularProgress />
      ) : (
        words.map((entry, index) => (
          <Accordion key={index}>
            <AccordionSummary>{entry.word}</AccordionSummary>
            <AccordionDetails>{entry.description}</AccordionDetails>
          </Accordion>
        ))
      )}
    </>
  );
};
