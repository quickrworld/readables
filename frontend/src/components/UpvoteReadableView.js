import React, { Component } from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import {upvoteReadable} from "../actions"
import {connect} from "react-redux"

class UpvoteReadableView extends Component {
  state = {
    canVote: true
  }
  upvote = () => {
    if (this.state.canVote) {
      this.props.upvoteReadable(this.props.readable.id)
      this.setState({ canVote: false })
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
    upvoteReadable: (id) => dispatch(upvoteReadable(id))
  }
}

export default connect(null, mapDispatchToProps)(UpvoteReadableView)