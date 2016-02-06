
import React from 'react'

let Editor = React.createClass({

  render() {
    let {defaultValue, onTextChange} = this.props

    return (
      <textarea className='editor'
        defaultValue={defaultValue}
        onChange={onTextChange} />
    )
  }
})

export default Editor
