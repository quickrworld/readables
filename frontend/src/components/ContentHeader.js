import React, { Component } from 'react'
import {connect} from "react-redux"
import {commentHeaderStyles as styles} from './styles/commentHeaderStyles'

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
    return (
      <div style={styles.contentHeaderStyle}>
        <div style={{gridColumnStart:'2', gridColumnEnd:'3', ...styles.categoryLabelStyle}}>
          {this.props.category}
        </div>
        <div style={styles.errorMessageStyle}>
          {this.state.errorMessage && `${this.state.errorMessage}`}
          {this.state.errorMessage &&
          <button style={styles.errorButtonStyle}
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

