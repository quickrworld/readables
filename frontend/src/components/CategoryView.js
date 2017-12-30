import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { categoryViewStyles as styles } from './styles/categoryViewStyles'

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
  render() {
    return (
      <div style={styles.categoryStyle}>
        <NavLink onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
          style={styles.navLinkStyle}
          activeStyle={styles.navLinkActiveStyle}
          to={{
            pathname: `/${this.props.category.path}/posts`,
          }}>{this.props.category.name}
        </NavLink>
      </div>
    )
  }
}

export default CategoryView
