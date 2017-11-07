import React from 'react'
import './App.css'
import Draggable from 'react-draggable'

class Note extends React.Component {
    getInitialState() {
        return { editing: false }
    }
    edit() {
        this.setState({editing: true})
    }
    save() {
        this.props.onChange(this.refs.newText.value, this.props.id)
        this.setState({editing: false})
    }
    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 200, 'px'),
            top: this.randomBetween(0, window.innerHeight - 200, 'px'),
            background: this.getRandomColor()
        }
    }
    componentDidUpdate () {
        if (this.state.editing) {
            this.refs.newText.focus()
            this.refs.newText.select()
        }
    }
    shouldComponentUpdate (nextProps, nextState) {
      return this.props.children !== nextProps.children || this.state !== nextState  
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    randomBetween(x, y, s) {
        return (x + Math.ceil( Math.random() * (y-x))) + s
    }
    remove() {
        this.props.onRemove(this.props.id)
    }
    renderForm() {
        return (
            <div className="note"
                 style={this.style}>
                <textarea ref="newText"
                          defaultValue={this.props.children}></textarea>
                <button onClick={this.save}>SAVE</button>
            </div>
        )
    }
    renderDisplay() {
        return (
            <div className="note"
                 style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}>EDIT</button>
                    <button onClick={this.remove}>X</button>
                </span>
            </div>
        )
    }
    render() {
        return ( <Draggable>
            { (this.state.editing) ? this.renderForm() : this.renderDisplay() } 
                </Draggable>
            )
    }
}

export default Note