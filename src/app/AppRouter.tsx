import { lazy } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'
/* import { ProgressSpinner } from 'primereact/progressspinner';
import { ErrorBoundary } from './error/ErrorBoundary';
  <ErrorBoundary>
      <Suspense fallback={<ProgressSpinner />}>
      </Suspense>
    </ErrorBoundary>
 */
const Users = lazy(() => import('../Users/Users'));
const Usersll = lazy(() => import('../Users/Usersll'));


const AppRouter = () => {
  return (
  <>
        <Link to="/">Usersll</Link> -
        <Link to="/users">Users</Link>

  
        <Routes>
          <Route path="/" element={<Usersll />} />
          <Route path="/users" element={<Users />} />
         
        </Routes>
        </>
  );
};

export default AppRouter;
