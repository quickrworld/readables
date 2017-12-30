import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReadableView from './ReadableView'
import {
  fetchReadables,
  selectCategory,
  SORT_READABLES_NEWEST,
  SORT_READABLES_OLDEST,
  SORT_READABLES_TOPVOTED
} from '../actions'

class ReadablesListView extends Component {
  componentDidMount() {
    this.props.selectCategory(this.props.category)
    this.props.fetchReadables(this.props.category)
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.myCategory !== nextProps.myCategory) {
      this.props.selectCategory(nextProps.myCategory)
      this.props.fetchReadables(nextProps.myCategory)
    }
  }
  render() {
    const readables = this.props.readables.readables
    return (
      <div>
        {readables.map((readable) => (
          <div key={readable.id} >
            <ReadableView id={readable.id} readable={readable}/>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const myCategory = ownProps.category
  const { readablesByCategory } = state

  const categoryReadables = readablesByCategory[myCategory]

  const readablesArray = (categoryReadables
    ? Object.keys(categoryReadables.items).reduce((readables, readable) => {
      readables.push(categoryReadables.items[readable])
      return readables
    }, [])
    : [])

  const sortedReadables = sortReadables(readablesArray, readablesByCategory.order)

  const readables = {
    isFetching: categoryReadables && categoryReadables.isFetching,
    lastUpdated: categoryReadables && categoryReadables.lastUpdated,
    readables: sortedReadables,
    order: readablesByCategory.order ? readablesByCategory.order : SORT_READABLES_NEWEST
  }

  return { readables, myCategory }
}

function sortReadables(readables, order) {
  function compare(r1,r2) {
    if (order === SORT_READABLES_NEWEST) {
      return r1.timestamp < r2.timestamp ? 1: -1
    }
    if (order === SORT_READABLES_OLDEST) {
      return r1.timestamp > r2.timestamp ? 1: -1
    }
    if (order === SORT_READABLES_TOPVOTED) {
      return r1.voteScore < r2.voteScore ? 1: -1
    }
    return r1.timestamp > r2.timestamp ? 1: -1
  }
  return readables.sort((r1,r2) => compare(r1,r2))
}

function mapDispatchToProps(dispatch) {
  return {
    selectCategory: (category) => dispatch(selectCategory(category)),
    fetchReadables: (category) => dispatch(fetchReadables(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadablesListView);
