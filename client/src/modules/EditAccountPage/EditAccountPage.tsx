import { Tile } from "../../components/Tile";
import { EditAccountForm } from "./EditAccountForm";

export const EditAccountPage = () => (
  <Tile width={500}>
    <h1>Edit account</h1>
    <EditAccountForm />
  </Tile>
);