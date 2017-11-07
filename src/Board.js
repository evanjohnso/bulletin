import React from 'react'
import './App.css'
import Note from './Note'

class Board extends React.Component {
  getInitialState() {
      return {
          notes: []
      }
  } 
  componentWillMount() {
      if (this.props.count) {
          let url = `http://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
          fetch(url)
                  .then(results => results.json())
                  .then(array => array[0])
                  .then(text => text.split('. '))
                  .then(array => array.forEach(                   
                      sentence => this.add(sentence)))
                  .catch(function(err) {
                      console.log("Didn't connect to the API", err)
                  }) 
      }
  } 
  nextId() {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
  } 
  add(textToAdd) {
      let notes = [
          ...this.state.notes,
          {
              id: this.nextId(),
              text: textToAdd
          }
      ]
      console.log(this.state.notes)
      this.setState({notes})
  } 
  update(newText, id) {
      let notes = this.state.notes.map(
          note => (note.id !== id) ? 
          note :
          {
              ...note,
              text: newText
          }
      )
      
      this.setState({notes})
      
  } 
  remove(id) {
      let notes = this.state.notes.filter(note => note.id !== id)
      this.setState({notes})
  } 
  eachNote(note) {
      return (<Note key={note.id}
                    id={note.id}
                    onChange={this.update}
                    onRemove={this.remove} >
                    {note.text}
              </Note>)
  } 
  render() {
      return (
          <div>
              <button onClick={ this.add }>+</button>
              {this.state.notes.map(this.eachNote)}
          </div>
      )
  }
}

export default Board
