import React, { Component } from 'react'
import {connect} from 'react-redux'
import {sortReadablesNewest, sortReadablesOldest, sortReadablesTopvoted} from '../actions'
import ReadableEditorView from './ReadableEditorView'
import {toplineMenuStyles as styles} from './styles/toplineMenuStyles'

class ToplineMenu extends Component {
  state = {
    editorOpen: false
  }
  openEditor = () => {
    this.setState({editorOpen: true})
  }
  closeEditor = () => {
    this.setState({editorOpen: false})
  }
  sortNewest = () => {
    this.newest.style.color = 'rgba(0,0,0,.8)'
    this.oldest.style.color = 'rgba(128,128,128,.8)'
    this.topvoted.style.color = 'rgba(128,128,128,.8)'
    this.props.sortNewest()
  }
  sortOldest = () => {
    this.newest.style.color = 'rgba(128,128,128,.8)'
    this.oldest.style.color = 'rgba(0,0,0,0.8)'
    this.topvoted.style.color = 'rgba(128,128,128,.8)'
    this.props.sortOldest()
  }
  sortTopvoted = () => {
    this.newest.style.color = 'rgba(128,128,128,.8)'
    this.oldest.style.color = 'rgba(128,128,128,.8)'
    this.topvoted.style.color = 'rgba(0,0,0,0.8)'
    this.props.sortTopvoted()
  }
  render() {
    return (
      <div style={styles.topLineStyle}>
        <div style={styles.sortLineStyle}>
          <span ref={(span) => { this.newest = span }}
                onClick={this.sortNewest}
                style={{cursor: 'pointer', color: 'rgba(128,128,128,.8)'}}>
            Newest</span>
          <span> | </span>
          <span ref={(span) => { this.oldest = span }}
                onClick={this.sortOldest}
                style={{cursor: 'pointer', color: 'rgba(0,0,0,.8)'}}>
            Oldest</span>
          <span> | </span>
          <span ref={(span) => { this.topvoted = span }}
                onClick={this.sortTopvoted}
                style={{cursor: 'pointer', color: 'rgba(128,128,128,.8)'}}>
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
  const {selectedCategory} = state
  return { category: selectedCategory }
}

function mapDispatchToProps(dispatch) {
  return {
    sortNewest: () => dispatch(sortReadablesNewest()),
    sortOldest: () => dispatch(sortReadablesOldest()),
    sortTopvoted: () => dispatch(sortReadablesTopvoted())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToplineMenu)
