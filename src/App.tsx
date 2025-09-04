import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/Home/Home'));
const SearchPage = lazy(() => import('./pages/Search/Search'));

import './App.css';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Home Page Loading...</div>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<div>Search Page Loading...</div>}>
              <SearchPage />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
