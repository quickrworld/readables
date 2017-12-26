import React, { Component } from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import {fetchReadableUpvote} from "../actions"
import {connect} from "react-redux"

class UpvoteReadableView extends Component {
  upvote = () => {
    this.props.upvoteReadable(this.props.readable.id)
  }
  render() {
    const pointerStyle = {
      cursor: 'pointer'
    }
    return (
      <span onClick={this.upvote} style={pointerStyle}>
        <FaThumbsOUp/>
      </span>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upvoteReadable: (id) => dispatch(fetchReadableUpvote(id))
  }
}

export default connect(null, mapDispatchToProps)(UpvoteReadableView)