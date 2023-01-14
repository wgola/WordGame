import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { TablePagination } from "@mui/material";
import { Tile, ButtonDiv } from "../../components";
import { WordsList } from "./WordsList/WordsList";
import { SearchForm } from "./SearchForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearData, getWordsCount } from "../../state/WordsSlice";

export const WordsListPage = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const count = useAppSelector(getWordsCount);

  const search = params.get("word") || "";
  const page = parseInt(params.get("page") || "1") - 1;
  const rowsPerPage = parseInt(params.get("limit") || "10");

  const handleChangePage = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      newPage: number
    ) => {
      setParams({
        page: (newPage + 1).toString(),
        limit: params.get("limit") || "",
        word: params.get("word") || "",
      });
    },
    [params]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(clearData());
      setParams({
        page: "1",
        limit: parseInt(event.target.value, 10).toString(),
        word: params.get("word") || "",
      });
    },
    [params]
  );

  return (
    <Tile width={900}>
      <ButtonDiv>
        <SearchForm />
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Number of words:"
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ButtonDiv>
      <WordsList search={search} page={page} rowsPerPage={rowsPerPage} />
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Number of words:"
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Tile>
  );
};
