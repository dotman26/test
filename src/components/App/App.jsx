import React, { useReducer } from "react";
import AppRoutes from "../Routes/Routes";

import { ContextApp, initialState, productsReducer } from "../../reducers/products.js";

const App = () => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  return (
    <div className="app">
        <ContextApp.Provider value={{ state, dispatch}}>
          <AppRoutes />
        </ContextApp.Provider>
    </div>
  );
};

export default App;
