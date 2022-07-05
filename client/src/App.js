import React from "react";
import { Button } from "./components/Button/Button";
import { ContentWrapper } from "./components/contentWrapper/ContentWrapper";

function App() {
  return (
    <React.Fragment>
      <ContentWrapper>
        <Button children={"узнать больше"} />
      </ContentWrapper>
    </React.Fragment>
  );
}

export default App;
