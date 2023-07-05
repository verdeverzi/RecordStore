import { Routes, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import NotFound from '../components/errors/NotFound';
import Homepage from '../components/Homepage';
import PrivateRoute from '../components/PrivateRoute';
import Profile from '../components/Profile';
import RecordsList from '../components/records/RecordsList';

const Router = () => (
  <Routes>
    <Route index element={<Homepage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    {/* todo: make this route protected so only when the authIsDone is true, we can access the records / profile */}
    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<RecordsList />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;
