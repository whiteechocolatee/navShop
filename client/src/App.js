import React from "react";
import { Button } from "./components/Button/Button";
import { ContentWrapper } from "./components/contentWrapper/ContentWrapper";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <React.Fragment>
      <ContentWrapper>
        <Button children={"узнать больше"} />
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
}

export default App;
