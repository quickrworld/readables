import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentView from './CommentView'
import CommentToplineMenu from './CommentToplineMenu'
import {
  fetchComments,
  selectReadable,
  SORT_COMMENTS_NEWEST,
  SORT_COMMENTS_OLDEST,
  SORT_COMMENTS_TOPVOTED,
} from "../actions"

class CommentsListView extends Component {
  componentDidMount() {
    if(this.props.selectedReadable) {
      this.props.fetchComments(this.props.selectedReadable)
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.selectedReadable !== nextProps.selectedReadable) {
      this.props.fetchComments(nextProps.selectedReadable)
    }
  }
  render() {
    const comments = this.props.comments.comments
    return (
      <div>
        <CommentToplineMenu/>
        <div>
          {comments.map((comment) => (
            <CommentView key={comment.id} comment={comment}/>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const selectedReadable = ownProps.selectedReadable

  const { commentsByReadable } = state

  function compare(c1, c2) {
    if (commentsByReadable.order === SORT_COMMENTS_NEWEST) {
      return (c1.timestamp < c2.timestamp) ? 1 : -1
    }
    if (commentsByReadable.order === SORT_COMMENTS_OLDEST) {
      return (c1.timestamp > c2.timestamp) ? 1 : -1
    }
    if (commentsByReadable.order === SORT_COMMENTS_TOPVOTED) {
      return (c1.voteScore < c2.voteScore) ? 1 : -1
    }
    return c1.timestamp < c2.timestamp
  }

  const sortedComments = commentsByReadable.order
    ? (commentsByReadable[selectedReadable] &&
      commentsByReadable[selectedReadable].items ?
      Object.keys(commentsByReadable[selectedReadable].items).reduce((comments, comment) => {
        comments.push(commentsByReadable[selectedReadable].items[comment])
        return comments
      }, []) : []).sort((c1, c2) => compare(c1, c2))
    : commentsByReadable[selectedReadable] &&
      commentsByReadable[selectedReadable].items ?
      Object.keys(commentsByReadable[selectedReadable].items).reduce((comments, comment) => {
        comments.push(commentsByReadable[selectedReadable].items[comment])
        return comments
      }, []) : []

  const comments = selectedReadable
    ? {
        isFetching: commentsByReadable[selectedReadable] ? commentsByReadable[selectedReadable].isFetching : false,
        lastUpdated: commentsByReadable[selectedReadable] ? commentsByReadable[selectedReadable].lastUpdated : 0,
        comments: sortedComments,
        order: commentsByReadable.order ? commentsByReadable.order : SORT_COMMENTS_NEWEST
      }
    : {
        comments: [],
        order: commentsByReadable.order ? commentsByReadable.order : SORT_COMMENTS_NEWEST
      }

  return { comments, selectedReadable }
}

function mapDispatchToProps(dispatch) {
  return {
    selectReadable: (readable) => dispatch(selectReadable(readable)),
    fetchComments: (readable) => dispatch(fetchComments(readable))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsListView);
