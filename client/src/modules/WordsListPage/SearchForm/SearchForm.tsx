import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Button, Input } from "../../../components";
import { clearData } from "../../../state/WordsSlice";

interface SearchType {
  search: string;
}

export const SearchForm = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { register, handleSubmit } = useForm<SearchType>({
    defaultValues: { search: params.get("word") || "" },
  });
  const { ref: inputRef, ...inputProps } = register("search");

  const handleSearch: SubmitHandler<SearchType> = useCallback(
    (data) => {
      if (params.get("word") !== data.search) dispatch(clearData());
      setParams({
        page: "1",
        limit: params.get("limit") || "",
        word: data.search,
      });
    },
    [params]
  );

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <div>
        <Input label={"Enter word"} inputRef={inputRef} {...inputProps} />
        <Button type="submit" name="search" />
      </div>
    </form>
  );
};
