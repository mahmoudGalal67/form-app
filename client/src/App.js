import React from 'react'
import {BrowserRouter as Router , Route , Switch} from "react-router-dom"
import Navbar from "./components/navbar.jsx"
import bootcamp from './pages/bootcamp.jsx'

function App() {
  return (
    <>
    <Navbar />
    <Router >
      <Switch >
        <Route  exact path="/" component={bootcamp} />
      </Switch>
    </Router>
    </>
  )
}

export default App

