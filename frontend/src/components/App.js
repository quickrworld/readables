import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CategoriesListView from './CategoriesListView'
import ReadablesListView from './ReadablesListView'
import ContentHeader from './ContentHeader'
import ToplineMenu from './ToplineMenu'
import ReadableViewWithComments from "./ReadableViewWithComments"
import {fetchCategories, fetchReadables, selectCategory} from '../actions'
import '../App.css'
import { appStyles as styles } from './styles/appStyles'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    if(this.props.myCategory) {
      this.props.selectCategory(this.props.myCategory)
      this.props.fetchReadables(this.props.myCategory)
    }
  }
  render() {
    return (
      <Router>
        <div id={'grid'} style={styles.gridStyle}>
        <div id="sidebar" style={styles.sidebarStyle}>
          <div id="logo" style={styles.logoBoxStyle}>
            <div style={styles.logoTextStyle}>
              Readable
            </div>
            <div style={styles.bylineStyle}>
              For those who haven't Reddit
            </div>
          </div>
          <div style={styles.sidebarMainStyle}>
            <div>
              <CategoriesListView/>
            </div>
          </div>
        </div>
        <div style={styles.contentStyle}>
          <ContentHeader myCategory={this.props.category}/>
          <div style={styles.contentMainStyle}>
            <div style={styles.mainContentStyle}>
              <div>
                <Route exact={true} path={'/'} render={() => (
                  <div>
                    <ToplineMenu/>
                    <ReadablesListView category={'all'}/>
                  </div>
                )}/>
                <Route exact={true} path={'/:category/posts'} render={({match}) => (
                  <div>
                    <ToplineMenu/>
                    <ReadablesListView category={match.params.category}/>
                  </div>
                )}/>
                <Route exact={true} path={'/posts/:id'} render={({match}) => (
                  <ReadableViewWithComments id={match.params.id}/>
                )}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  if(state.readablesByCategory && state.readablesByCategory.myCategory) {
    return { myCategory: state.readablesByCategory.myCategory }
  }
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    selectCategory: (category) => dispatch(selectCategory(category)),
    fetchReadables: (category) => dispatch(fetchReadables(category.path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
