import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { createTournament } from '../../api/tournaments'

class CreateTournament extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      game: '',
      description: ''
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
    const { name, game, description } = this.state

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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default CreateTournament
