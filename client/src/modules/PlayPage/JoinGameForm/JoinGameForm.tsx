import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components";

interface JoinGameFormType {
  gameID: string;
}

export const JoinGameForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<JoinGameFormType>({
    defaultValues: { gameID: "" },
  });
  const { ref: inputRef, ...inputProps } = register("gameID");

  const handleSearch: SubmitHandler<JoinGameFormType> = ({ gameID }) =>
    navigate(`/game/${gameID}`);

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <div>
        <Input
          label={"Enter game ID"}
          inputRef={inputRef}
          {...inputProps}
          required={true}
        />
        <Button type="submit" children="Join game" />
      </div>
    </form>
  );
};
