import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import './index.css'
import * as serviceWorker from './serviceWorker'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Collection from './pages/Collection'
import NotFound from './pages/NotFound'

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path ="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/collections/:collectionName" element={<Collection />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
