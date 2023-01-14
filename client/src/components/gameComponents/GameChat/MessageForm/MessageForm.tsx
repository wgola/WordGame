import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../../../components";
import { getUser } from "../../../../state/UserSlice";
import { useAppSelector } from "../../../../hooks";
import { useParams } from "react-router-dom";

interface MessageType {
  message: string;
}

interface MessageFormProps {
  publish: (topic: string, message: string) => void;
}

export const MessageForm = ({ publish }: MessageFormProps) => {
  const { register, handleSubmit, reset } = useForm<MessageType>({
    defaultValues: { message: "" },
  });
  const { ref: inputRef, ...inputProps } = register("message");

  const user = useAppSelector(getUser);
  const { gameID } = useParams();

  const onSubmit: SubmitHandler<MessageType> = (data) => {
    reset();
    const message = { author: user.username || "", body: data.message };
    publish(`/game/${gameID}/chat`, JSON.stringify(message));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Input
          inputRef={inputRef}
          {...inputProps}
          required
          style={{ width: "85%" }}
        />
        <Button type="submit" children="send" style={{ width: "15%" }} />
      </div>
    </form>
  );
};
