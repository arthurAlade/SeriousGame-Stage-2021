import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  useParams,
  useLocation,
  useHistory
} from "react-router-dom";
import './index.css';
import './css/createSeance.css'
import GetAllSeancesComponent from './Components/GetAllSeancesComponent';
import GetSeanceComponent from './Components/GetSeanceComponent';
import CreateSeance from './Components/CreateSeance';
import GetEquipeComponent from "./Components/GetEquipeComponent";
import GetAllLogComponent from "./Components/GetAllLogComponent";

export default function App() {

  let history = useHistory();

  return (
      <Router>
        <div className="ApplicationContent">
          <ul className="HeaderListe">
            <li className="HeaderListe Li">
              <Link to="/seances">Séances</Link>
            </li>
            <li className="HeaderListe Li">
              <Link to="/appareils">Appareils</Link>
            </li>
            <li className="HeaderListe Li">
              <Link to="/statistiques">Statistiques</Link>
            </li>
            <li className="HeaderListe Li NewSeance">
              <Link to="/newSeance">Créer une seance</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/seances">
              <Seances />
            </Route>

            <Route path="/seance/:id">
              <SeanceID />
            </Route>
            <Route path="/equipe/:id">
              <EquipeID />
            </Route>
            <Route path="/appareils">
              <Appareils />
            </Route>
            <Route path="/statistiques">
              <Statistiques />
            </Route>
            <Route path="/newSeance">
              <NewSeance />
            </Route>
            <Route path="/log">
              <Log />
            </Route>
            <Redirect from="/" to="/seances" />
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

function Seances() {
  return <GetAllSeancesComponent/>;
}

function Appareils() {
  return <h2>Appareils</h2>;
}

function Statistiques() {
  return <h2>Statistiques</h2>;
}

function NewSeance() {
  return <CreateSeance />
}
function SeanceID() {
  return <GetSeanceComponent/>;
}
function EquipeID(){
  return <GetEquipeComponent/>
}
function Log(){
  return <GetAllLogComponent/>
}
function NoMatch() {
  let location = useLocation();

  return (
      <div>
        <h3>
          La route <code>{location.pathname}</code> est inexistante.
        </h3>
      </div>
  );
}