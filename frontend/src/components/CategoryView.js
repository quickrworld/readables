import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { categoryViewStyles as styles } from './styles/categoryViewStyles'

class CategoryView extends Component {
  render() {
    return (
      <div style={styles.categoryStyle}>
        <NavLink className={'category-navlink'}
          style={styles.navLinkStyle}
          activeStyle={styles.navLinkActiveStyle}
          to={{
            pathname: `/${this.props.category.path}`,
          }}>{this.props.category.name}
        </NavLink>
      </div>
    )
  }
}

export default CategoryView
