import React, { Component } from 'react'
import { getTournament } from '../../api/tournaments'
class ViewTournament extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tournament: null
    }
  }

  componentDidMount () {
    getTournament(this.props.match.params.id)
      .then(res => {
        this.setState({ tournament: res.data })
      })
      .catch(console.error)
  }

  render () {
    if (!this.state.tournament) {
      return (
        <div className="loading">
          Loading...
        </div>
      )
    }

    return (
      <div className="tournament">
        <p>{this.state.tournament.name}</p>
        <p>{this.state.tournament.description}</p>
        <p>Run by {this.state.tournament.owner}</p>
      </div>
    )
  }
}

export default ViewTournament
