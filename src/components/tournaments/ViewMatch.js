import React, { Component } from 'react'
import { getMatch } from '../../api/tournaments'
import { ListGroup } from 'react-bootstrap'

class ViewMatch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      match: null
    }
  }

  componentDidMount () {
    const { match } = this.props
    getMatch(match.params.t_id, match.params.m_id)
      .then(res => this.setState({ match: res.data }))
      .catch(console.error)
  }

  render () {
    let tdControls = ''
    const { match } = this.state
    if (match && match.owner === this.props.user) {
      tdControls = 'buttons'
    }

    return (
      <div className="match">
        <ListGroup>
          <ListGroup.Item>
            Player 1
          </ListGroup.Item>
          <ListGroup.Item>
            Player 2
          </ListGroup.Item>
        </ListGroup>
        {tdControls}
      </div>
    )
  }
}

export default ViewMatch
