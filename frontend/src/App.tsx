import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Paths from './types/Paths'
import Search from './components/Search'

function App() {
  const [theme, setTheme] = useState<'theme1'|'theme2'|'theme3'|'theme4'|'theme5'|'theme6'|''>('')
  return (
    <div className={`App ${theme}`}>
      <h1>So many parts to pick from</h1>
      <div className="App-categories">
        <button className="App-categories-button" onClick={useState('theme1')}><Link to={Paths.cases}>Cases</Link></button>
        <button className="App-categories-button"><Link to={Paths.pcb}>PCB</Link></button>
        <button className="App-categories-button"><Link to={Paths.plates}>Plates</Link></button>
        <button className="App-categories-button"><Link to={Paths.stabilizers}>Stabilizers</Link></button>
        <button className="App-categories-button"><Link to={Paths.switches}>Switches</Link></button>
        <button className="App-categories-button"><Link to={Paths.keycaps}>Keycaps</Link></button>
      </div>
  
      <Route path="/" />
      <Route path={Paths.cases} render={ (props) => <Search category='cases' theme='red'/> } />
      <Route path={Paths.pcb} render={ (props) => <Search category='PCBs' theme='blue'/> } />
      <Route path={Paths.plates} render={ (props) => <Search category='plates' theme='green'/> } />
      <Route path={Paths.stabilizers} render={ (props) => <Search category='stabilizers' theme='yellow'/> } />
      <Route path={Paths.switches} render={ (props) => <Search category='switches' theme='magic'/> } />
      <Route path={Paths.keycaps} render={ (props) => <Search category='keycaps' theme='rainbow'/> } />

    </div>
  );
}

export default App;
