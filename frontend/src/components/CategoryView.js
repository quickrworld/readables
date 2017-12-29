import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class CategoryView extends Component {
  handleMouseEnter = (event) => {
    event.target.style.borderColor = 'rgba(255,255,255,.5)'
    event.target.style.borderStyle = 'solid'
    event.target.style.borderWidth = '1px'
    event.target.style.borderRadius = '4px'
  }
  handleMouseLeave = (event) => {
    event.target.style.borderWidth = '0px'
  }
  styles = {
    categoryStyle: {
      alignContent: 'center',
      height: '35px',
      borderBottom: '1px',
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: '100',
      color: 'rgba(255,255,255,.5)',
      padding: '4px 20px 0px 40px'
    },
    navLinkStyle: {
      color: 'rgba(255,255,255,.5)',
      textDecoration: 'none',
      padding: '4px 8px 4px 8px'
    },
    navLinkActiveStyle: {
      color: 'rgb(255,255,255)',
      textDecoration: 'none',
      pointerEvents: 'none'
    }
  }
  render() {
    return (
      <div style={this.styles.categoryStyle}>
        <NavLink onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
          style={this.styles.navLinkStyle}
          activeStyle={this.styles.navLinkActiveStyle}
          to={{
            pathname: `/${this.props.category.path}/posts`,
          }}>{this.props.category.name}
        </NavLink>
      </div>
    )
  }
}

export default CategoryView
