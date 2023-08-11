import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Employeelist from './pages/Employeelist';
import CafesPage from './pages/CafesPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="main">
          <Switch>
            <Route path="/">
              <CafesPage />
            </Route>
            {/* <Route path="/">
              <Employeelist />
            </Route> */}
            <Route path="/user/:userId">
              <Employeelist />
            </Route> 
          </Switch>
        </div>
        <div className="footer">
          Awesome blog. All right Reserved
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
