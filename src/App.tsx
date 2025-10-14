import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
// import ResultPage from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        {/* <Route path="/result" element={<ResultPage />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
