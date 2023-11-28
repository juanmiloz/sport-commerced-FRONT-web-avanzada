import './App.css'
import Router from "./routes";
import {store} from "./redux/store/store.ts";
import {Provider} from "react-redux";
import {injectStore} from "./config/axios.ts";

function App() {

  injectStore(store)

  return (
      <Provider store={store}>
        <Router/>
      </Provider>
  )
}

export default App