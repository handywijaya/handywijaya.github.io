import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import './index.css'
import * as serviceWorker from './serviceWorker'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Collection from './pages/Collection'
import NotFound from './pages/NotFound'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/">
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/collections/:collectionName" component={Collection} />
              <Route strict component={NotFound} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
