
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import WeatherList from './components/WeatherList';
import './App.css';

import CurrentCard from './components/CurrentCard';
import WeatherDetail from './components/WeatherDetail';
import Nav from './components/Nav';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path='/home' exact={true}>
          <CurrentCard />
        </Route>
        <Route path='/weatherlist'>
          <WeatherList />
        </Route>
        <Route path='/detail/:dayId' >
          <WeatherDetail />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
