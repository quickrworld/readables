import React, { Component } from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import {downvoteReadable} from "../actions"
import {connect} from "react-redux"

class DownvoteReadableView extends Component {
  downvote = () => {
    this.props.downvoteReadable(this.props.readable.id)
  }
  styles = {
    pointerStyle: {
      cursor: 'pointer'
    }
  }
  render() {
    return (
      <span onClick={this.downvote} style={this.styles.pointerStyle}>
        <FaThumbsODown/>
      </span>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downvoteReadable: (id) => dispatch(downvoteReadable(id))
  }
}

export default connect(null, mapDispatchToProps)(DownvoteReadableView)