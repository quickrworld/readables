import React, { Component } from 'react'
import {connect} from "react-redux"
import {contentHeaderStyles as styles} from './styles/contentHeaderStyles'
class ContentHeader extends Component {
  state = {
    counter: 0,
    errorMessage: this.props.errorMessage,
    mediaQueryListener: window.matchMedia('(max-width: 899px)')
  }
  componentDidMount() {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      errorMessage: this.props.errorMessage,
    }));
    this.state.mediaQueryListener.addListener(this.handleMediaQueryEvent)
  }
  componentWillReceiveProps(nextProps) {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      errorMessage: nextProps.errorMessage
    }));
  }
  handleMediaQueryEvent = (e) => {
    let sidebar = document.getElementById('sidebar')
    let grid = document.getElementById('grid')
    if(e.matches) {
      sidebar.style.display = 'none'
      grid.style.gridTemplateColumns = "1fr"
    } else {
      sidebar.style.display = 'grid'
      grid.style.gridTemplateColumns = "20rem 1fr"
    }
  }
  handleMenuButtonClick = () => {
    this.toggleSidebar()
  }
  toggleSidebar() {
    let sidebar = document.getElementById('sidebar')
    let grid = document.getElementById('grid')
    if(sidebar.style.display === 'grid' || sidebar.style.display === '') {
      sidebar.style.display = 'none'
      grid.style.gridTemplateColumns = "1fr"
    } else {
      sidebar.style.display = 'grid'
      grid.style.gridTemplateColumns = "20rem 1fr"
    }
  }
  render() {
    return (
      <div style={{...styles.contentHeaderStyle, alignContent:'center'}}>
        <div style={{display: 'grid', gridTemplateColumns: '32px 1fr', alignContent: 'center'}}>
          <div style={{
            cursor: 'pointer',
            textAlign: 'center',
            alignContent: 'top',
            outlineStyle: 'none',
            fontSize: '22px',
            borderWidth: '0px',
            padding: '0px',
            marginTop: '-6px',
            gridColumnStart: '1',
            color: 'rgb(2, 179, 228)',
            backgroundColor:'rgba(255,255,255,0)'}}
            onClick={this.handleMenuButtonClick}>
            &#x2630;
          </div>
        </div>
        <div style={{display: 'grid', gridColumnStart:'2', gridColumnEnd:'3', ...styles.categoryLabelStyle}}>
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

