import React, { Component } from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import {downvoteReadable} from "../actions"
import {connect} from "react-redux"
import {voteButtonStyles as styles} from './styles/voteButtonStyles'

class DownvoteReadableView extends Component {
  state = {
    canVote: true
  }
  downvote = () => {
    if (this.state.canVote) {
      this.props.downvoteReadable(this.props.readable.id)
      this.setState({ canVote: false })
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
    downvoteReadable: (id) => dispatch(downvoteReadable(id))
  }
}

export default connect(null, mapDispatchToProps)(DownvoteReadableView)