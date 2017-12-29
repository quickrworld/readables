import React, { Component } from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import {upvoteReadable} from "../actions"
import {connect} from "react-redux"

class UpvoteReadableView extends Component {
  upvote = () => {
    this.props.upvoteReadable(this.props.readable.id)
  }
  styles = {
    pointerStyle: {
      cursor: 'pointer'
    }
  }
  render() {

    return (
      <span onClick={this.upvote} style={this.styles.pointerStyle}>
        <FaThumbsOUp/>
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