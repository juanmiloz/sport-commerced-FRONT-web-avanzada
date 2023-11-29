import './App.css'
import Router from "./routes";
import {store} from "./redux/store/store.ts";
import {Provider} from "react-redux";
import {injectStore} from "./config/axios.ts";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

function App() {

    injectStore(store)

    const persistor = persistStore(store)

    return (
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <Router/>
            </Provider>
        </PersistGate>
    )
}

export default App