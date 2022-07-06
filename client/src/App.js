import React from "react";
import { Button } from "./components/Button/Button";
import { ContentWrapper } from "./components/contentWrapper/ContentWrapper";
import { Footer } from "./components/Footer/Footer";
import { Input } from "./components/Input/Input";

function App() {
  return (
    <React.Fragment>
      <ContentWrapper>
        <Button children={"узнать больше"} />
        <Input placeholder={"Имя"} />
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
}

export default App;
