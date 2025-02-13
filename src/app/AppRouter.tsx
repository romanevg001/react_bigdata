import { lazy, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'
import { Spinner } from '../common-components/Spinner';
//import { ErrorBoundary } from './error/ErrorBoundary';
 
const UsersTable = lazy(() => import('../pages/Users/UsersTable'));
{/* <ErrorBoundary> </ErrorBoundary>
 */}

const AppRouter = () => {
  return (
    <Suspense fallback={<Spinner />}>
    {/*     <Link to="/">Usersll</Link> |
        <Link to="/users">Users</Link> |
        <Link to="/entities">Entities</Link>
   */}
        <Routes>
          <Route path="/" element={<UsersTable />} />
        </Routes>
      </Suspense>
   
  );
};

export default AppRouter;
