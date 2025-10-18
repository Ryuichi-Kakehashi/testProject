import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ConfirmPage from "./pages/ConfirmPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/confirm" element={<ConfirmPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
