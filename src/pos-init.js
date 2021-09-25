import { ToastContainer } from "react-toastify";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Header } from "./core/js/header";
import { POSContainer } from "./pos/js/init";
import { OrdersContainer } from "./orders/js/init";

export const POSInit = () => (
    <main className="main-container">
        <ToastContainer />
        <Router>
            <div className="main-wrapper">
                <Header />
                <div className="content-wrapper">
                    <Switch>
                        <Route path="/orders">
                            <OrdersContainer />
                        </Route>
                        <Route path="/pos">
                            <POSContainer />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    </main>
);
