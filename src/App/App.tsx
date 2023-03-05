import React from "react";

import routes from "@config/routes";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { useRoutes } from "react-router-dom";

function App() {
  useQueryParamsStoreInit();
  const element = useRoutes(routes);
  return element;
}

export default App;
