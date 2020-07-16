import React from 'react'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ToastContainer} from 'react-toastify'

import 'config/reactotronConfig'

import Routes from 'routes'
import history from 'services/history'

import {store, persistor} from 'store'

import 'styles/global.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <CssBaseline />
          <Routes />
        </Router>
        <ToastContainer />
      </PersistGate>
    </Provider>
  )
}

export default App
