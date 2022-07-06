import React from "react";
import "./app.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { paths } from "./paths";
import { Main } from "./pages/Main/Main";
import { Error } from './pages/Error/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.main} element={<Main />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
