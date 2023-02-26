import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import RepoPage from "./pages/RepoPage";
import RepositoriesPage from "./pages/RepositoriesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<RepositoriesPage />} />
          <Route path="/:owner">
            <Route path=":name" element={<RepoPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
