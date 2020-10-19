import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, useParams, useHistory } from 'react-router-dom'
import Paths from './types/Paths'
import Search from './components/Search'
import Product from './components/Product'

function App() {
  const [theme, setTheme] = useState<'theme1'|'theme2'|'theme3'|'theme4'|'theme5'|'theme6'|''>('')
  console.log('useParams:',useParams())
  console.log('useHistory:', useHistory().location.pathname)
  const urlPath:string = useHistory().location.pathname.replace(/^\//, '')
  console.log(urlPath)
  return (
    <div className={`App ${theme}`}>
      <h1>So many parts to pick from</h1>
      <div className="App-categories">
        <button className="App-categories-button" onClick={() => setTheme('theme1')}><Link to={Paths.cases}>Cases</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.pcb}>PCB</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme3')}><Link to={Paths.plates}>Plates</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme4')}><Link to={Paths.stabilizers}>Stabilizers</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme5')}><Link to={Paths.switches}>Switches</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme6')}><Link to={Paths.keycaps}>Keycaps</Link></button>
      </div>
  
      <Route path="/" />
      <Route path={Paths.cases} render={ (props) => <Search category='cases' theme={theme}/> } />
      <Route path={Paths.pcb} render={ (props) => <Search category='PCBs' theme={theme}/> } />
      <Route path={Paths.plates} render={ (props) => <Search category='plates' theme={theme}/> } />
      <Route path={Paths.stabilizers} render={ (props) => <Search category='stabilizers' theme={theme}/> } />
      <Route path={Paths.switches} render={ (props) => <Search category='switches' theme={theme}/> } />
      <Route path={Paths.keycaps} render={ (props) => <Search category='keycaps' theme={theme}/> } />
      {urlPath === '123' ? <Route path="/:productid" render={ (props) => <Product id={urlPath}/>} /> : null}


    </div>
  );
}

export default App;
