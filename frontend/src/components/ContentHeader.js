import React, { Component } from 'react'
import {connect} from "react-redux"

class ContentHeader extends Component {
  state = {
    counter: 0,
    errorMessage: this.props.errorMessage,
  }
  componentDidMount() {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      errorMessage: this.props.errorMessage,
    }));
  }
  componentWillReceiveProps(nextProps) {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      errorMessage: nextProps.errorMessage
    }));
  }
  render() {
    const contentHeaderStyle = {
      backgroundColor: 'rgb(28,38,47)',
      boxShadow: 'rgba(0,0,0,0.5) 0px 2px 4px 0px',
      zIndex: '10',
      alignContent: 'baseline',
      textAlign: 'center',
      fontFamily: 'Open Sans',
      fontSize: '18px',
      color: 'rgb(255,255,255)',
      padding: '17px 12px 12px 12px',
      fontWeight: 200,
      display: 'grid',
      gridTemplateColumns: '1fr, 1fr, 1fr'
    }
    return (
      <div id="content-header" style={contentHeaderStyle}>
        <div style={{gridColumnStart:'2', gridColumnEnd:'3', textAlign: 'center'}}>
          {this.props.category}
        </div>
        <div style={{
          fontSize: '14px',
          color: 'red',
          gridColumnStart:'3',
          gridColumnEnd:'4',
          textAlign: 'right'}}>
          {this.state.errorMessage && `${this.state.errorMessage}`}
          {this.state.errorMessage &&
          <button style={{
                    fontSize: '14px',
                    padding: '4px 12px 12px 12px',
                    alignContent: 'center',
                    border: '0px',
                    backgroundColor: 'rgba(255,255,255,0)',
                    color: 'white'}}
                  onClick={() => this.setState({errorMessage: '', counter: 0})}>&#x24e7;</button>}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { selectedCategory, allCategories, errors } = state
  const category = ownProps.myCategory ? ownProps.myCategory : selectedCategory
  if (allCategories.items[category]) {
    return {
      category: allCategories.items[category].name,
      errorMessage: errors.message,
      timestamp: errors.timestamp
    }
  }
  if(category === 'all') {
    return {
      category: 'All Categories',
      errorMessage: errors.message,
      timestamp: errors.timestamp
    }
  }
  return {
    category: '',
    errorMessage: errors.message,
    timestamp: errors.timestamp
  }
}

export default connect(mapStateToProps)(ContentHeader)

