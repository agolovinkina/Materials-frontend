import { BrowserRouter, Route, Routes } from "react-router-dom";

import MaterialDetails from "./pages/MaterialDetails";
import MaterialsPage from "./pages/MaterialsPage";
import { HomePage } from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/Materials-frontend">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/materials/:id" element={<MaterialDetails />} />
        <Route path="*" element={<div>404: Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
