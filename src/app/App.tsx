import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import PlayPage from "../pages/playPage/ui/PlayPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
