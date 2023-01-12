import { Tile } from "../Tile";

export const GameMessageDiv = () => {
  return (
    <Tile dontAddMargin={true}>
      <h2 style={{ margin: 0, marginBottom: 5, textAlign: "center" }}>
        Game info
      </h2>
    </Tile>
  );
};
