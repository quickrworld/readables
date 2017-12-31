import React, { Component } from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import {downvoteComment} from "../actions"
import {connect} from "react-redux"

class DownvoteCommentView extends Component {
  state = {
    canVote: true
  }
  downvote = () => {
    if (this.state.canVote) {
      this.props.downvoteComment(this.props.id)
      this.setState({canVote: false})
    }
  }
  render() {
    return (
      <span onClick={this.downvote} style={{cursor: 'pointer'}}>
        <FaThumbsODown style={{color: this.state.canVote ? 'rgb(79,79,79)' : 'lightgray'}}/>
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