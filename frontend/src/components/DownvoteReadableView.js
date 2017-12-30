import React, { Component } from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import {downvoteReadable} from "../actions"
import {connect} from "react-redux"
import {voteButtonStyles as styles} from './styles/voteButtonStyles'

class DownvoteReadableView extends Component {
  downvote = () => {
    this.props.downvoteReadable(this.props.readable.id)
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
    downvoteReadable: (id) => dispatch(downvoteReadable(id))
  }
}

export default connect(null, mapDispatchToProps)(DownvoteReadableView)