import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joinGame } from "../../../api";
import { Button, Input } from "../../../components";

interface JoinGameFormType {
  gameID: string;
}

export const JoinGameForm = ({
  setMessage,
}: {
  setMessage: (value: string) => void;
}) => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<JoinGameFormType>({
    defaultValues: { gameID: "" },
  });
  const { ref: inputRef, ...inputProps } = register("gameID");

  const handleJoinGame: SubmitHandler<JoinGameFormType> = async ({
    gameID,
  }) => {
    setMessage("Loading...");
    const result = await joinGame(gameID);
    if (result.data) navigate(`/game/${gameID}`);
    else
      setMessage(
        "Something went wrong! You are trying to join to game with two player or have wrong gameID"
      );
  };

  return (
    <form onSubmit={handleSubmit(handleJoinGame)}>
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
