
import React from 'react'

import Editor from './Editor.jsx'
import Viewer from './Viewer.jsx'

export default React.createClass({

  getInitialState() {
    return {text: 'Hello!'}
  },

  handleTextChange(e) {
    this.setState({text: e.target.value})
    console.log(e.target.value)
  },

  render() {
    let {text} = this.state

    return (
      <div className='app-wrapper'>
        <Editor
          defaultValue={text}
          onTextChange={this.handleTextChange} />
        <Viewer text={text} />
      </div>
    )
  }
})
