import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../Pages/Main";
import { Repository } from "../Pages/Repository";

export function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/repository/:repository" element={<Repository />} />
      </Routes>
    </BrowserRouter>
  )
}