
import React from 'react'
import marked from 'marked'

let Viewer = React.createClass({
  render() {
    let {text} = this.props

    return (
      <div
        className='viewer'
        dangerouslySetInnerHTML= {this.renderMarkdown()} />
    )
  },

  renderMarkdown() {
    const {text} = this.props
    return {__html: marked(text)}
  }
})

export default Viewer
