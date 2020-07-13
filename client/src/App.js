import React, { lazy, Suspense } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const Checkout = lazy(() => import("./pages/checkout/checkout.component"));
const Contact = lazy(() => import("./pages/contact/contact.component"));

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/contact" component={Contact} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

export default App;
