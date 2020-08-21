import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import { Signin, Signup } from './session';
import DocCreate from './document/createDoc';
import DocsIndex from './document/indexDocs';
import DocDetails from './document/showDoc';
import Footer from './footer';
import { AuthRoute, ProtectedRoute } from '../utils/route';

const App = () => {
  return (
    <HashRouter>
      <div id="page-container">
        <div id="content-wrap">
          <header>
            <Navbar />
          </header>
          <main>
            <Switch>
              <AuthRoute path="/signin" component={Signin} />
              <AuthRoute path="/signup" component={Signup} />
              <ProtectedRoute path="/user" component={Signin} />
              <ProtectedRoute path="/documents" exact component={DocsIndex} />
              <ProtectedRoute
                path="/documents/new"
                exact
                component={DocCreate}
              />
              <ProtectedRoute path="/documents/:docId" component={DocDetails} />
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </main>
        </div>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
