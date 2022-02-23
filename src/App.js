import "./App.css";
import UsersTable from "./Components/UsersTable/UsersTable";
import { Provider } from "react-redux";
import store from "./Store/reduxStore";

function App() {
  return (
    <Provider store={store}>
      <UsersTable />
    </Provider>
  );
}

export default App;
