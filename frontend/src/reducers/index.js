import { combineReducers } from 'redux'
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  SELECT_CATEGORY,
  FETCH_READABLES_REQUEST,
  FETCH_READABLES_SUCCESS,
  FETCH_READABLES_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_READABLE_REQUEST,
  FETCH_READABLE_SUCCESS,
  FETCH_READABLE_FAILURE,
  UPVOTE_READABLE,
  FETCH_READABLE_UPVOTE_REQUEST,
  FETCH_READABLE_UPVOTE_SUCCESS,
  FETCH_READABLE_UPVOTE_FAILURE,
  DOWNVOTE_READABLE,
  FETCH_READABLE_DOWNVOTE_REQUEST,
  FETCH_READABLE_DOWNVOTE_SUCCESS,
  FETCH_READABLE_DOWNVOTE_FAILURE,
  UPVOTE_COMMENT,
  FETCH_COMMENT_UPVOTE_REQUEST,
  FETCH_COMMENT_UPVOTE_SUCCESS,
  FETCH_COMMENT_UPVOTE_FAILURE,
  DOWNVOTE_COMMENT,
  FETCH_COMMENT_DOWNVOTE_REQUEST,
  FETCH_COMMENT_DOWNVOTE_SUCCESS,
  FETCH_COMMENT_DOWNVOTE_FAILURE,
  SORT_READABLES_NEWEST,
  SORT_READABLES_OLDEST,
  SORT_READABLES_TOPVOTED,
  SORT_COMMENTS_NEWEST,
  SORT_COMMENTS_OLDEST,
  SORT_COMMENTS_TOPVOTED,
  FETCH_COMMENT_ADD_SUCCESS,
  FETCH_COMMENT_ADD_FAILURE,
  FETCH_COMMENT_EDIT_SUCCESS,
  FETCH_COMMENT_EDIT_FAILURE,
  FETCH_COMMENT_DELETE_SUCCESS,
  FETCH_COMMENT_DELETE_FAILURE,
  FETCH_READABLE_ADD_SUCCESS,
  FETCH_READABLE_ADD_FAILURE,
  FETCH_READABLE_EDIT_SUCCESS,
  FETCH_READABLE_EDIT_FAILURE,
  FETCH_READABLE_DELETE_SUCCESS,
  FETCH_READABLE_DELETE_FAILURE,
} from "../actions";

// categories
function categories(
  state = {
    isFetching: false,
    items: {}
  }, action) {
  switch(action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.categories,
        lastUpdated: action.receivedAt
      })
    case FETCH_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

function allCategories(state = {
  isFetching: false,
  lastUpdated: 0,
  items: {},
}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
    case FETCH_CATEGORIES_REQUEST:
      return Object.assign({}, state,
        categories(state[action.category], action)
      )
    default:
      return state
  }
}

// readables
function selectedCategory(state, action) {
  if(!state) {
    state = 'all'
  }
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category ? action.category : state
    default:
      return state
  }
}

function readables(state = {
    isFetching: false,
    items: {}
  }, action) {
  switch(action.type) {
    case FETCH_READABLES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_READABLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.readables,
        lastUpdated: action.receivedAt
      })
    case FETCH_READABLES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

// readable
function readable(state = {
  isFetching: false
}, action) {
  switch(action.type) {
    case FETCH_READABLE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_READABLE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        readable: action.readable,
        lastUpdated: action.receivedAt
      })
    case FETCH_READABLE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case FETCH_READABLE_UPVOTE_REQUEST:
      return state
    case FETCH_READABLE_UPVOTE_SUCCESS:
      let upvotedState = Object.assign({}, state)
      return upvotedState[action.id] = action.readable
    case FETCH_READABLE_UPVOTE_FAILURE:
      return state
    case FETCH_READABLE_DOWNVOTE_REQUEST:
      return state
    case FETCH_READABLE_DOWNVOTE_SUCCESS:
      let downvotedState = Object.assign({}, state)
      return downvotedState[action.id] = action.readable
    case FETCH_READABLE_DOWNVOTE_FAILURE:
      return state
    case FETCH_READABLE_EDIT_SUCCESS:
      let readableEditedState = Object.assign({}, state)
      readableEditedState.readable = Object.assign({}, action.readable)
      return readableEditedState
    case FETCH_READABLE_EDIT_FAILURE:
      return state
    default:
      return state
  }
}

function readableById(state = {
  isFetching: false,
  lastUpdated: 0
}, action) {
  switch(action.type) {
    case FETCH_READABLE_SUCCESS:
    case FETCH_READABLE_REQUEST:
      if(action.id) {
        const value =  Object.assign({}, state, {
          [action.id]: readable(state[action.id], action)
        })
        return value
      }
      return state
    case UPVOTE_READABLE:
      // we might also want to update the value of voteCount for the matching readable (local copy)
      return state
    case FETCH_READABLE_UPVOTE_SUCCESS:
      let upvotedState = Object.assign({}, state)
      upvotedState[action.id] = {
        isFetching: false,
        lastUpdated: action.readable.timestamp,
        readable: action.readable
      }
      return upvotedState
    case DOWNVOTE_READABLE:
      return state // we might want to update the value of voteCount for the matching readable (local copy)
    case FETCH_READABLE_DOWNVOTE_SUCCESS:
      let downvotedState = Object.assign({}, state)
      downvotedState[action.id] = {
        isFetching: false,
        lastUpdated: action.readable.timestamp,
        readable: action.readable
      }
      return downvotedState
    case FETCH_READABLE_ADD_SUCCESS:
      let readableAddedState = Object.assign({}, state)
      readableAddedState[action.id] = {
        isFetching: false,
        lastUpdated: action.readable.timestamp,
        readable: action.readable
      }
      return readableAddedState
    case FETCH_READABLE_ADD_FAILURE:
      return state
    case FETCH_READABLE_EDIT_SUCCESS:
      let readableEditedState = Object.assign({}, state)
      readableEditedState[action.readable.id] = {
        isFetching: false,
        lastUpdated: action.readable.timestamp,
        readable: action.readable
      }
      return readableEditedState
    case FETCH_READABLE_DELETE_SUCCESS:
      let deletedReadableState = Object.assign({}, state)
      if (deletedReadableState[action.readable.id]) {
        delete deletedReadableState[action.readable.id].readable
        deletedReadableState[action.readable.id].readable =
          {id: action.readable.id, deleted: true, body: 'deleted!', category: action.readable.category}
        return deletedReadableState
      }
      return deletedReadableState
    case FETCH_READABLE_DELETE_FAILURE:
      return state
    default:
      return state
  }
}

function readablesByCategory(state = {
  isFetching: false,
  lastUpdated: 0
}, action) {
  switch (action.type) {
    case FETCH_READABLES_SUCCESS:
    case FETCH_READABLES_REQUEST:
      if (action.category) {
        let value = Object.assign({}, state, {
          [action.category]: readables(state[action.category], action),
        })
        if (!state.myCategory) {
          value.myCategory = action.category
        }
        return value
      }
      return state
    case SORT_READABLES_NEWEST:
      return Object.assign({}, state, {
          'order': SORT_READABLES_NEWEST
      })
    case SORT_READABLES_OLDEST:
      return Object.assign({}, state, {
        'order': SORT_READABLES_OLDEST
      })
    case SORT_READABLES_TOPVOTED:
      return Object.assign({}, state, {
        'order': SORT_READABLES_TOPVOTED
      })
    case FETCH_READABLE_UPVOTE_SUCCESS:
      let upvotedState = Object.assign({}, state)
      if(upvotedState[state.myCategory] &&
        upvotedState[state.myCategory].items) {
        upvotedState[state.myCategory].items[action.readable.id] = action.readable
      }
      return upvotedState
    case FETCH_READABLE_DOWNVOTE_SUCCESS:
      let downvotedState = Object.assign({}, state)
      if(downvotedState[state.myCategory] &&
        downvotedState[state.myCategory].items) {
        downvotedState[state.myCategory].items[action.readable.id] = action.readable
      }
      return downvotedState
    case FETCH_READABLE_ADD_SUCCESS:
      let readableAddedState = Object.assign({}, state)
      if(readableAddedState[action.readable.category] &&
        readableAddedState[action.readable.category].items) {
        readableAddedState[action.readable.category].items[action.readable.id] = action.readable
      }
      if(readableAddedState['all'] &&
        readableAddedState['all'].items) {
        readableAddedState['all'].items[action.readable.id] = action.readable
      }
      return readableAddedState
    case FETCH_READABLE_EDIT_SUCCESS:
      let readableEditedState = Object.assign({}, state)
      if(readableEditedState[action.readable.category] &&
        readableEditedState[action.readable.category].items) {
        readableEditedState[action.readable.category].items[action.readable.id] = action.readable
      }
      if(readableEditedState['all'] &&
        readableEditedState['all'].items) {
        readableEditedState['all'].items[action.readable.id] = action.readable
      }
      return readableEditedState
    case FETCH_READABLE_DELETE_SUCCESS:
      let readableDeletedState = Object.assign({}, state)
      if(readableDeletedState[action.readable.category] &&
        readableDeletedState[action.readable.category].items) {
        delete readableDeletedState[action.readable.category].items[action.readable.id]
      }
      if(readableDeletedState['all'] &&
        readableDeletedState['all'].items) {
        delete readableDeletedState['all'].items[action.readable.id]
      }
      return readableDeletedState
    case SELECT_CATEGORY:
      const value = {
        ...state,
        'myCategory': action.category
      }
      return value
    default:
      return state
  }
}

function comments(state = {
  isFetching: false
}, action) {
  switch(action.type) {
    case FETCH_COMMENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.comments,
        lastUpdated: action.receivedAt
      })
    case FETCH_COMMENTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

function commentsByReadable(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
    case FETCH_COMMENTS_REQUEST:
      const value =  Object.assign({}, state, {
        [action.readable]: comments(state[action.readable], action)
      })
      return value
    case UPVOTE_COMMENT:
      return state // we might want to update the value of voteCount for the matching comment (local copy)
    case FETCH_COMMENT_UPVOTE_REQUEST:
      return state
    case FETCH_COMMENT_UPVOTE_SUCCESS:
      let upvotedState = Object.assign({}, state)
      upvotedState[action.comment.parentId].items[action.id] = action.comment
      return upvotedState
    case FETCH_COMMENT_UPVOTE_FAILURE:
      return state
    case DOWNVOTE_COMMENT:
      return state // we might want to update the value of voteCount for the matching comment (local copy)
    case FETCH_COMMENT_DOWNVOTE_REQUEST:
      return state
    case FETCH_COMMENT_DOWNVOTE_SUCCESS:
      let downvotedState = Object.assign({}, state)
      downvotedState[action.comment.parentId].items[action.id] = action.comment
      return downvotedState
    case FETCH_COMMENT_DOWNVOTE_FAILURE:
      return state
    case SORT_COMMENTS_NEWEST:
      return Object.assign({}, state, {
        'order': SORT_COMMENTS_NEWEST
      })
    case SORT_COMMENTS_OLDEST:
      return Object.assign({}, state, {
        'order': SORT_COMMENTS_OLDEST
      })
    case SORT_COMMENTS_TOPVOTED:
      return Object.assign({}, state, {
        'order': SORT_COMMENTS_TOPVOTED
      })
    case FETCH_COMMENT_ADD_SUCCESS:
      let newState = Object.assign({}, state)
      newState[action.comment.parentId].items[action.comment.id] = action.comment
      return newState
    case FETCH_COMMENT_ADD_FAILURE:
      return state // need to update any fetching flags to false
    case FETCH_COMMENT_EDIT_SUCCESS:
      let editedState = Object.assign({}, state)
      editedState[action.comment.parentId].items[action.comment.id] = action.comment
      return editedState
    case FETCH_COMMENT_EDIT_FAILURE:
      return state
    case FETCH_COMMENT_DELETE_SUCCESS:
      let deletedCommentState = Object.assign({}, state)
      delete deletedCommentState[action.comment.parentId].items[action.comment.id]
      return deletedCommentState
    case FETCH_COMMENT_DELETE_FAILURE:
      return state
    default:
      return state
  }
}

function errors(state = {error: ''}, action) {
  switch(action.type) {
    case FETCH_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_CATEGORIES_FAILURE,
        message: action.status.error.message,
        timestamp: action.status.timestamp,
      })
    case FETCH_READABLES_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_READABLES_FAILURE,
        message: action.status.error.message,
        timestamp: action.status.timestamp,
      })
    case FETCH_COMMENTS_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_COMMENTS_FAILURE,
        message: action.status.error.message,
        timestamp: action.status.timestamp,
      })
    case FETCH_READABLE_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_READABLE_FAILURE,
        message: action.status.error.message,
        timestamp: action.status.timestamp,
      })
    case FETCH_READABLE_DOWNVOTE_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_READABLE_DOWNVOTE_FAILURE,
        message: action.status.error.message,
        timestamp: action.status.timestamp,
      })
    case FETCH_READABLE_UPVOTE_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_READABLE_UPVOTE_FAILURE,
        message: action.status.error.message,
        timestamp: action.status.timestamp,
      })
    case FETCH_COMMENT_DOWNVOTE_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_COMMENT_DOWNVOTE_FAILURE,
        message: action.status.error.message,
        timestamp: action.status.timestamp,
      })
    case FETCH_COMMENT_UPVOTE_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_COMMENT_UPVOTE_FAILURE,
        message: action.status.error.message,
        timestamp: action.status.timestamp,
      })
    case FETCH_COMMENT_ADD_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_COMMENT_ADD_FAILURE,
        message: action.status && action.status.error && action.status.error.message,
        timestamp: action.status && action.status.timestamp
      })
    case FETCH_COMMENT_EDIT_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_COMMENT_EDIT_FAILURE,
        message: action.status && action.status.error && action.status.error.message,
        timestamp: action.status && action.status.timestamp
      })
    case FETCH_COMMENT_DELETE_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_COMMENT_DELETE_FAILURE,
        message: action.status && action.status.error && action.status.error.message,
        timestamp: action.status && action.status.timestamp
      })
    case FETCH_READABLE_ADD_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_READABLE_ADD_FAILURE,
        message: action.status && action.status.error && action.status.error.message,
        timestamp: action.status && action.status.timestamp
      })
    case FETCH_READABLE_EDIT_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_READABLE_EDIT_FAILURE,
        message: action.status && action.status.error && action.status.error.message,
        timestamp: action.status && action.status.timestamp
      })
    case FETCH_READABLE_DELETE_FAILURE:
      return Object.assign({}, state, {
        error: FETCH_READABLE_DELETE_FAILURE,
        message: action.status && action.status.error && action.status.error.message,
        timestamp: action.status && action.status.timestamp
      })
    default:
      return state
  }
}

// root reducer
const reducer = combineReducers({
  allCategories,
  readablesByCategory,
  readable,
  readableById,
  commentsByReadable,
  selectedCategory,
  errors
})

export default reducer