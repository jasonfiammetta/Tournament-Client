import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { createTournament } from '../../api/tournaments'

class CreateTournament extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      game: '',
      description: '',
      players: '' // split on commas
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  create = event => {
    event.preventDefault()

    createTournament(this.props.user, this.state)
      .then(res => this.props.history.push(`/tournaments/${res.data.id}`))
      .catch(console.error)
  }

  render () {
    const { name, game, description, players } = this.state

    return (
      <div className="create-form">
        <Form onSubmit={this.create}>
          <Form.Group controlId="name">
            <Form.Label>Tournament Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={name}
              placeholder="Enter tournament name"
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="game">
            <Form.Label>Tournament Game</Form.Label>
            <Form.Control
              required
              type="text"
              name="game"
              value={game}
              placeholder="Enter tournament game"
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Tournament Description</Form.Label>
            <Form.Control
              required
              type="textarea"
              name="description"
              value={description}
              placeholder="Enter tournament description"
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Players (You can add more later)</Form.Label>
            <Form.Control
              type="text"
              name="players"
              value={players}
              placeholder="Separate names with commas, i.e. Alice, Bob, Charlie"
              onChange={this.handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default CreateTournament
