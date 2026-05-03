import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import Layout from './versions/v1/layouts/Layout'
import Home from './versions/v1/pages/Home'
import Collection from './versions/v1/pages/Collection'
import NotFound from './versions/v1/pages/NotFound'
import LayoutV2 from './versions/v2/layouts/Layout'
import HomeV2 from './versions/v2/pages/Home'
import FoodAlbumV2 from './versions/v2/pages/FoodAlbum'
import CollectionDetailV2 from './versions/v2/pages/CollectionDetail'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LayoutV2 />}>
          <Route index element={<HomeV2 />} />
          <Route path="food-album" element={<FoodAlbumV2 />} />
          <Route
            path="collections/:collectionName"
            element={<CollectionDetailV2 />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/v1" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="collections/:collectionName"
            element={<Collection />}
          />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
