import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { POSInit } from "src/pos-init";
import { KitchenInit } from "src/kitchen-init";

const AppInit = () => (
    <Router>
        <Switch>
            {["/pos", "/orders"].map((path, index) => <Route path={path} component={POSInit} key={index} />)}
            <Route path="/kitchen"><KitchenInit /></Route>
            <Route path="/"><Redirect to="/pos" /></Route>
        </Switch>
    </Router>
);

export default withAuthenticator(AppInit);
