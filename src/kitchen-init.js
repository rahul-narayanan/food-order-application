import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./core/js/header";
import { Kitchen } from "./kitchen/js/init";

export const KitchenInit = () => (
    <main className="main-container">
        <ToastContainer />
        <Router>
            <div className="main-wrapper">
                <Header hideMenus />
                <div className="content-wrapper">
                    <Kitchen />
                </div>
            </div>
        </Router>
    </main>
);
