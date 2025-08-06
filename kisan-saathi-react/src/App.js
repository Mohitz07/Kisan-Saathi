// App.js - Updated for React Router v7
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="App">
        <Header />
        <Home />
      </div>
    ),
  },
  {
    path: "/weather",
    element: (
      <div className="App">
        <Header />
        <Home />
      </div>
    ),
  },
  {
    path: "/disease-detection",
    element: (
      <div className="App">
        <Header />
        <Home />
      </div>
    ),
  },
  {
    path: "/soil-monitoring",
    element: (
      <div className="App">
        <Header />
        <Home />
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
