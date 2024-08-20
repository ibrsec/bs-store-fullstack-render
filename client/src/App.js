import { ToastContainer } from "react-toastify";
import "./App.css"; 
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

function App() { 
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
