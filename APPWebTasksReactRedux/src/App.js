import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import Tasks from './components/Tasks';


function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <Tasks />
        </Container>
      </ToastProvider>
    </Provider>
  );
}
export default App;
