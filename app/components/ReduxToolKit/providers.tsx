"use client";

import { store, persistor } from "./store";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default Providers;
