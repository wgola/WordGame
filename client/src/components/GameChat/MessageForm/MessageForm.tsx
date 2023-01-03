import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button, Input } from "../../../components";
import { useAppSelector } from "../../../hooks";
import { getUser } from "../../../state/UserSlice";

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
    publish(`game/${gameID}/chat`, JSON.stringify(message));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex" }}>
        <Input inputRef={inputRef} {...inputProps} required />
        <Button type="submit" children="send" />
      </div>
    </form>
  );
};
