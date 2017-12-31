import React, { Component } from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import {upvoteComment} from "../actions"
import {connect} from "react-redux"

class UpvoteCommentView extends Component {
  state = {
    canVote: true
  }
  upvote = () => {
    if (this.state.canVote) {
      this.props.upvoteComment(this.props.id)
      this.setState({canVote: false})
    }
  }
  render() {
    return (
      <span onClick={this.upvote} style={{cursor: 'pointer'}}>
        <FaThumbsOUp style={{color: this.state.canVote ? 'rgb(79,79,79)' : 'lightgray'}}/>
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