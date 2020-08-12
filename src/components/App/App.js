import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../auth/SignUp'
import SignIn from '../auth/SignIn'
import SignOut from '../auth/SignOut'
import ChangePassword from '../auth/ChangePassword'
import CreateTournament from '../tournaments/CreateTournament'
import ViewTournaments from '../tournaments/ViewTournaments'
import ViewTournament from '../tournaments/ViewTournament'
import EditTournament from '../tournaments/EditTournament'
import Bracket from '../tournaments/Bracket'
import ViewMatch from '../tournaments/ViewMatch'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        <p>The current user is {JSON.stringify(user)}</p>
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='' render={() => (
            <Redirect to='/tournaments' />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-tournament' render={(props) => (
            <CreateTournament user={user} {...props} />
          )} />
          <Route exact path='/tournaments' render={() => (
            <ViewTournaments />
          )} />
          <Route exact path='/tournaments/:id' render={(props) => (
            <ViewTournament {...props} user={user} />
          )} />
          <Route exact path='/tournaments/:id/edit' render={(props) => (
            <EditTournament {...props} user={user} />
          )} />
          <Route exact path='/tournaments/:id/bracket' render={(props) => (
            <Bracket {...props} user={user} />
          )} />
          <Route exact path='/tournaments/:t_id/matches/:m_id' render={(props) => (
            <ViewMatch {...props} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
