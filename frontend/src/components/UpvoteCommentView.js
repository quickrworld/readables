import React, { Component } from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import {upvoteComment} from "../actions"
import {connect} from "react-redux"

class UpvoteCommentView extends Component {
  upvote = () => {
    this.props.upvoteComment(this.props.id)
  }
  render() {
    const pointerStyle = {
      'cursor': 'pointer'
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
    upvoteComment: (id) => dispatch(upvoteComment(id))
  }
}

export default connect(null, mapDispatchToProps)(UpvoteCommentView)