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
            <CommentView key={comment.id} comment={comment} fetchReadable={this.props.fetchReadable}/>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const selectedReadable = ownProps.selectedReadable

  const { commentsByReadable } = state
  const readable = commentsByReadable[selectedReadable]

  const commentsArray = readable && readable.items
    ? Object.keys(readable.items).reduce((comments, comment) => {
        comments.push(readable.items[comment])
        return comments
      }, [])
    : []

  const sortedComments =  sortCommentsArray(commentsArray,
    commentsByReadable.order ? commentsByReadable.order : SORT_COMMENTS_NEWEST)

  const comments = selectedReadable
    ? {
        isFetching: readable ? readable.isFetching : false,
        lastUpdated: readable ? readable.lastUpdated : 0,
        comments: sortedComments,
        order: commentsByReadable.order ? commentsByReadable.order : SORT_COMMENTS_NEWEST
      }
    : {
        comments: [],
        order: commentsByReadable.order ? commentsByReadable.order : SORT_COMMENTS_NEWEST
      }

  return { comments, selectedReadable }
}

function sortCommentsArray(comments, order) { // sortBy?
  function compare(c1, c2) {
    if (order === SORT_COMMENTS_NEWEST) {
      return (c1.timestamp < c2.timestamp) ? 1 : -1
    }
    if (order === SORT_COMMENTS_OLDEST) {
      return (c1.timestamp > c2.timestamp) ? 1 : -1
    }
    if (order === SORT_COMMENTS_TOPVOTED) {
      return (c1.voteScore < c2.voteScore) ? 1 : -1
    }
    return c1.timestamp < c2.timestamp
  }
  return comments.sort((c1,c2) => compare(c1,c2))
}

function mapDispatchToProps(dispatch) {
  return {
    selectReadable: (readable) => dispatch(selectReadable(readable)),
    fetchComments: (readable) => dispatch(fetchComments(readable))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsListView);
