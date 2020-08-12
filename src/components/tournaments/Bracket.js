import React, { Component } from 'react'
import ViewMatch from './ViewMatch'
import { getTournament } from '../../api/tournaments'

class Bracket extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // players: [],
      matches: []
    }
  }

  componentDidMount () {
    getTournament(this.props.match.params.id)
      .then(res => this.setState({ matches: this.buildBracket(res.data.player_names) }))
      .then(() => console.log('matches', this.state.matches))
      .catch(console.error)
  }

  buildBracket = (players) => {
    let pairs = 1
    const matches = []
    while (pairs < players.length / 2) {
      pairs *= 2
    }
    for (let i = 0; i < pairs; i++) {
      matches.push([players[i]])
      // matches.push({ id: i, playerOne: players[i] })
    }
    for (let i = 0; i < players.length - pairs; i++) {
      matches[i].push(players[i + pairs])
    }
    return matches
  }

  winnerIs = (matchId, player) => { // player can be 0 or 1
    // this.setState(prev => ({ matches: prev.matches.push([]) }))
    const p = this.state.matches[matchId][player]
    // this.setState(prev => ({ matches: prev.matches.push([p]) }))
    console.log(p)
  }

  render () {
    return (
      <div>
        {this.state.matches.map(match => (
          <ViewMatch
            key={match}
            {...this.props}
            matchId={this.state.matches.indexOf(match)}
            winnerIs={this.winnerIs}
            playerOne={match[0]}
            playerTwo={match[1]} />
        ))}
      </div>
    )
  }
}

export default Bracket
