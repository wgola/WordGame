import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../../../components";
import { getUser } from "../../../../state/UserSlice";
import { useAppSelector } from "../../../../hooks";
import socket from "../../../../ws";

interface MessageType {
  message: string;
}

export const MessageForm = () => {
  const { register, handleSubmit, reset } = useForm<MessageType>({
    defaultValues: { message: "" },
  });
  const { ref: inputRef, ...inputProps } = register("message");

  const user = useAppSelector(getUser);

  const onSubmit: SubmitHandler<MessageType> = (data) => {
    reset();
    const message = { author: user.username || "", body: data.message };
    socket.emit("chat", JSON.stringify(message));
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
