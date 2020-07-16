import React from 'react'
import {useSelector} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'

import Layout from 'layout/Main'
import {Register, Login, Dashboard, Dragon, AddDragon} from 'views'

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed)

  if (!signed)
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Redirect from="*" to="/login" />
      </Switch>
    )

  return (
    <Layout>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/dragons/:id" component={Dragon} />
        <Route path="/add-dragon" component={AddDragon} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </Layout>
  )
}
