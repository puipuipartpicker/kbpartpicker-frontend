import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, useParams, useHistory } from 'react-router-dom'
import Paths from './types/Paths'
import Search from './components/Search'
import Product from './components/Product'
import { Themes, ThemeVariableValues } from './types/types'
import updateThemeVariables from './updateThemeVariables'


function App() {
  const [theme, setTheme] = useState<keyof ThemeVariableValues>('theme1')
  console.log('useParams:',useParams())
  console.log('useHistory:', useHistory().location.pathname)
  const urlPath:string = useHistory().location.pathname.replace(/^\//, '')
  const productKeys = ['123', '666', '456']
  console.log(urlPath)
  updateThemeVariables(theme)
  return (
    <div className={`App ${theme}`}>
      <h1 className="App__header">KBPartPicker</h1>
      <p>what are you looking for?</p>
      <div className="App-categories">
        <button className="App-categories-button" onClick={() => setTheme('theme1')}><Link to={Paths.cases}>Cases</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.pcb}>PCB</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme3')}><Link to={Paths.plates}>Plates</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme4')}><Link to={Paths.stabilizers}>Stabilizers</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme5')}><Link to={Paths.switches}>Switches</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme6')}><Link to={Paths.keycaps}>Keycaps</Link></button>
      </div>

      // TODO: see if themes can be only managed by the App component so it doesn't need to be passed down as a prop
      <Route path="/" />
      <Route path={Paths.cases} render={ (props) => {
        setTheme('theme1')
        return <Search category='cases' theme={theme}/>
      }}/>
      <Route path={Paths.pcb} render={ (props) => {
        setTheme('theme2')
        return <Search category='PCBs' theme={theme}/>
      }}/>
      <Route path={Paths.plates} render={ (props) => {
        setTheme('theme3')
        return <Search category='plates' theme={theme}/>
      }}/>
      <Route path={Paths.stabilizers} render={ (props) => {
        setTheme('theme4')
        return <Search category='stabilizers' theme={theme}/>
      }}/>
      <Route path={Paths.switches} render={ (props) => {
        setTheme('theme5')
        return <Search category='switches' theme={theme}/>
      }}/>
      <Route path={Paths.keycaps} render={ (props) => {
        setTheme('theme6') 
        return <Search category='keycaps' theme={theme}/>
      }}/>
      {productKeys.includes(urlPath) ? <Route path={Paths.product} render={ (props) => <Product id={urlPath}/>} /> : null}


    </div>
  );
}

export default App;
