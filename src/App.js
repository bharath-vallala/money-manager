import logo from './logo.svg'
import './App.css'
import PrivateRoute from './components/privateRoute'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Charts from './pages/ChartsView'
import AddTModal from './components/AddTransactionModal/AddTransactionsModal'
import AddBudget from './components/AddBudget/AddBudget'

function App() {
  return (
    <div className='App'>
      <Router>
        <div
          className='flex-col'
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <AddTModal></AddTModal>
          <AddBudget></AddBudget>
        </div>
        <Switch>
          <PrivateRoute exact path='/'>
            <Home></Home>

          </PrivateRoute>
          <PrivateRoute path='/chart'>
            <Charts></Charts>
          </PrivateRoute>
          <Route exact path='/signin' component={SignIn}></Route>
          
        </Switch>
      </Router>
    </div>
  )
}

export default App
