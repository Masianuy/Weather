import {
  BrowserRouter,
  NavLink,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import Weather from './components/Weather/Weather';
import Timer from './components/Timer/Timer';
import Page404 from './components/Page404/Page404';

function Home () {
  return (
    <>
      <div>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/weather'>Weather</NavLink>
        <NavLink to='/timer'>Timer</NavLink>
      </div>
      <Outlet />
    </>
  );
}
function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='weather' element={<Weather />} />
            <Route path='timer' element={<Timer />} />
          </Route>
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
