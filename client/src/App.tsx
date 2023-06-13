import { useKeycloak } from "@react-keycloak/web";
import { Button, Form, Tile, ButtonDiv } from "./components";

const App = () => {
  const { keycloak } = useKeycloak();

  return (
    <Tile width={500}>
      <Form>
        <h1>Welcome to WordGame!</h1>
        <ButtonDiv>
          <Button
            type="button"
            children="Log in"
            onClick={() =>
              keycloak.login({
                redirectUri: `${window.location.origin}/home/play`,
              })
            }
          />
          or
          <Button
            type="button"
            children="Create account"
            onClick={() =>
              keycloak.register({
                redirectUri: `${window.location.origin}/home/play`,
              })
            }
          />
        </ButtonDiv>
      </Form>
    </Tile>
  );
};

export default App;
