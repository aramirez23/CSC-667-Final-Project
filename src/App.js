import React from "react";
import "./App.css";
import {CookiesProvider} from "react-cookie";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Listing from "./screens/Listing";
import Entries from "./screens/Entries";
import * as ReactDOM from "react-dom";
import {Provider, useDispatch} from "react-redux";
import PersistedStore from "./redux/PersistedStore";
import {getMessages, getUserId} from "./utility/request";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";

const App = () => {
    let webSocket = new WebSocket(`ws:${window.origin.substring("http//".length).split(':')[0]}:4004/webrocket`);

    const dispatch = useDispatch();
    webSocket.onmessage = (message) => {
        getUserId().then((res) => {
            console.log("user id is")
            console.log(res.data)
            if (res && res.data && res.data.partyId) {
                console.log("message data is ")
                console.log(message.data)
                if (res.data.partyId === message.data) {
                    console.log("got here")
                    getMessages()
                    .then((res) => {
                        console.log(res);
                        dispatch({
                            type: 'UPDATE_MESSAGES',
                            messages: res.data,
                        });
                        window.location.reload();
                    })
                }
            }
        })
    };

    return ReactDOM.render(
        <Provider store={PersistedStore.getDefaultStore().store}>
        <CookiesProvider>
            <div className="App">
                <Router>
                    <Navbar/>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route path="/register" exact>
                        <Register />
                    </Route>
                    <Route path="/listing/:listingId" exact>
                        <Listing />
                    </Route>
                    <Route path="/entries" exact>
                        <Entries />
                    </Route>
                    <Route path="/cart" exact>
                        <Cart />
                    </Route>
                    <Route path="/checkout" exact>
                        <Checkout />
                    </Route>
                </Router>
                <Footer/>
            </div>
        </CookiesProvider>
        </Provider>,
            document.getElementById('root')
    );
}

export default App;