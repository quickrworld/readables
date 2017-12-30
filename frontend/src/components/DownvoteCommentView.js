import React, { Component } from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import {downvoteComment} from "../actions"
import {connect} from "react-redux"
import {voteButtonStyles as styles} from './styles/voteButtonStyles'

class DownvoteCommentView extends Component {
  downvote = () => {
    this.props.downvoteComment(this.props.id)
  }

  render() {
    return (
      <span onClick={this.downvote} style={styles.pointerStyle}>
        <FaThumbsODown/>
      </span>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downvoteComment: (id) => dispatch(downvoteComment(id))
  }
}

export default connect(null, mapDispatchToProps)(DownvoteCommentView)