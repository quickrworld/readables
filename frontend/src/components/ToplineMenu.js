import React, { Component } from 'react'
import {connect} from 'react-redux'
import {sortReadablesNewest, sortReadablesOldest, sortReadablesTopvoted} from '../actions'
import ReadableEditorView from './ReadableEditorView'

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
  handleMouseEnter = (event) => {
    event.target.style.backgroundColor = 'rgba(47,61,72,.8)'
    event.target.style.color = 'rgba(255,255,255,.8)'
    event.target.style.borderRadius = '4px'
  }
  handleMouseLeave = (event) => {
    event.target.style.backgroundColor = 'rgb(255,255,255)'
    event.target.style.color = 'rgb(0,0,0)'
    event.target.style.borderRadius = '4px'
  }
  render() {
    const topLineStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto minmax(min-content, min-content)',
      paddingBottom: '6px',
    }
    const sortLineStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '2',
    }
    const newReadableButtonStyle = {
      gridColumnStart: '2',
      gridColumnEnd: '3',
      textAlign: 'right'
    }
    const sortLinkStyle = {
      'cursor': 'pointer',
    }
    return (
      <div className="top-line" style={topLineStyle}>
        <div style={sortLineStyle}>
          <span ref={(span) => { this.newest = span }}
                onClick={this.sortNewest} style={sortLinkStyle}>
            Newest</span> | <span ref={(span) => { this.oldest = span }} onClick={this.sortOldest} style={sortLinkStyle}>
            Oldest</span> | <span ref={(span) => { this.topvoted = span }} onClick={this.sortTopvoted} style={sortLinkStyle}>
            Top voted</span>
          <hr/>
        </div>
        <div style={newReadableButtonStyle}>
          <button onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onClick={() => this.openEditor()}
                  style={{borderWidth: '0px',
                    borderColor: 'rgb(255,255,255)',
                    pointerStyle: 'pointer'}}>New Readable</button>
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
