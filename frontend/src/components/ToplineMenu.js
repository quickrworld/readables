import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
  SORT_READABLES_NEWEST, SORT_READABLES_OLDEST, SORT_READABLES_TOPVOTED, sortReadablesNewest, sortReadablesOldest,
  sortReadablesTopvoted
} from '../actions'
import ReadableEditorView from './ReadableEditorView'
import {toplineMenuStyles as styles} from './styles/toplineMenuStyles'

class ToplineMenu extends Component {
  state = {
    editorOpen: false
  }
  componentDidMount() {
    this.highlightOldest()
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps.order', nextProps.order)
    const sort = nextProps.order ? nextProps.order : SORT_READABLES_OLDEST
    this.setState({sort: sort})
    switch(sort) {
      case SORT_READABLES_NEWEST:
        this.highlightNewest()
        break
      case SORT_READABLES_OLDEST:
        this.highlightOldest()
        break
      case SORT_READABLES_TOPVOTED:
        this.highlightTopvoted()
        break
      default:
        this.highlightOldest()
        break
    }
  }
  openEditor = () => {
    this.setState({editorOpen: true})
  }
  closeEditor = () => {
    this.setState({editorOpen: false})
  }
  highlightNewest() {
    this.newest.style.color = 'rgba(0,0,0,.9)'
    this.newest.style.fontWeight = 'bold'
    this.oldest.style.color = 'rgba(128,128,128,.9)'
    this.oldest.style.fontWeight = 'normal'
    this.topvoted.style.color = 'rgba(128,128,128,.9)'
    this.topvoted.style.fontWeight = 'normal'
  }
  highlightOldest() {
    this.newest.style.color = 'rgba(128,128,128,.9)'
    this.newest.style.fontWeight = 'normal'
    this.oldest.style.color = 'rgba(0,0,0,0.9)'
    this.oldest.style.fontWeight = 'bold'
    this.topvoted.style.color = 'rgba(128,128,128,.9)'
    this.topvoted.style.fontWeight = 'normal'
  }
  highlightTopvoted() {
    this.newest.style.color = 'rgba(128,128,128,.9)'
    this.newest.style.fontWeight = 'normal'
    this.oldest.style.color = 'rgba(128,128,128,.9)'
    this.oldest.style.fontWeight = 'normal'
    this.topvoted.style.color = 'rgba(0,0,0,0.9)'
    this.topvoted.style.fontWeight = 'bold'
  }
  sortNewest = () => {
    this.highlightNewest()
    this.props.sortNewest()
    this.setState({sort: SORT_READABLES_NEWEST})
  }
  sortOldest = () => {
    this.highlightOldest()
    this.props.sortOldest()
    this.setState({sort: SORT_READABLES_OLDEST})
  }
  sortTopvoted = () => {
    this.highlightTopvoted()
    this.props.sortTopvoted()
    this.setState({sort: SORT_READABLES_TOPVOTED})
  }
  render() {
    return (
      <div style={styles.topLineStyle}>
        <div style={styles.sortLineStyle}>
          <span ref={(span) => { this.newest = span }}
                onClick={this.sortNewest}
                style={{
                  cursor: 'pointer',
                  fontWeight: this.state.sort === SORT_READABLES_NEWEST ? 'bold' : 'normal'}}>
            Newest</span>
          <span> | </span>
          <span ref={(span) => { this.oldest = span }}
                onClick={this.sortOldest}
                style={{
                  cursor: 'pointer',
                  fontWeight: this.state.sort === SORT_READABLES_OLDEST ? 'bold' : 'normal'}}>
            Oldest</span>
          <span> | </span>
          <span ref={(span) => { this.topvoted = span }}
                onClick={this.sortTopvoted}
                style={{
                  cursor: 'pointer',
                  fontWeight: this.state.sort === SORT_READABLES_TOPVOTED ? 'bold' : 'normal'}}>
            Top voted</span>
          <hr/>
        </div>
        <div style={styles.buttonBoxStyle}>
          <button className={'new-readable-button'}
                  onClick={() => this.openEditor()}
                  style={styles.newReadableButtonStyle}>New Readable</button>
          <hr/>
        </div>
        <div style={{display: this.state.editorOpen ? 'block' : 'none', gridColumnStart:'1', gridColumnEnd: '5'}}>
          <ReadableEditorView
            category={this.props.category}
            close={this.closeEditor}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {selectedCategory } = state
  const {order} = state.readablesByCategory
  return { category: selectedCategory, order: order }
}

function mapDispatchToProps(dispatch) {
  return {
    sortNewest: () => dispatch(sortReadablesNewest()),
    sortOldest: () => dispatch(sortReadablesOldest()),
    sortTopvoted: () => dispatch(sortReadablesTopvoted())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToplineMenu)
