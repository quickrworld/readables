import React, { Component } from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import {fetchReadableDownvote} from "../actions"
import {connect} from "react-redux"

class DownvoteReadableView extends Component {
  downvote = () => {
    this.props.downvoteReadable(this.props.readable.id)
  }
  render() {
    const pointerStyle = {cursor: 'pointer'}
    return (
      <span onClick={this.downvote} style={pointerStyle}>
        <FaThumbsODown/>
      </span>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downvoteReadable: (id) => dispatch(fetchReadableDownvote(id))
  }
}

export default connect(null, mapDispatchToProps)(DownvoteReadableView)