import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CategoriesListView from './CategoriesListView'
import ReadablesListView from './ReadablesListView'
import ContentHeader from './ContentHeader'
import ToplineMenu from './ToplineMenu'

import {fetchCategories, fetchReadables, selectCategory} from '../actions'

import '../App.css'

import ReadableViewWithComments from "./ReadableViewWithComments"

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    if(this.props.myCategory) {
      this.props.selectCategory(this.props.myCategory)
      this.props.fetchReadables(this.props.myCategory)
    }
  }
  render() {
    const gridStyle = {
      fontFamily: 'Open Sans',
      fontSize: '12px',
      display: 'grid',
      width: '100%',
      height: '100vh',
      gridTemplateColumns: '18rem 1fr',
    }
    const sidebarStyle = {
      fontFamily: 'Open Sans',
      fontSize: '10px',
      backgroundColor: 'rgb(47,61,72)',
      zIndex: '20',
      display: 'grid',
      gridTemplateRows: '70px 1fr',
    }
    const bylineStyle = {
      fontFamily: 'Open Sans',
      fontSize: '12px',
      color: 'rgba(255,255,255,.5)',
      padding: '0px 10px 10px 24px',
      fontWeight: '100',
    }
    const sidebarMainStyle = {
      display: 'grid',
      gridTemplateRows: 'auto',
      backgroundColor: 'rgb(47,61,72)',
      padding: '0px 20px 0px 20px',
      height: 'calc(100vh - 77px)',
      overflow: 'auto',
    }
    const contentStyle = {
      display: 'grid',
      gridTemplateRows: '57px 1fr',
    }
    const contentMainStyle = {
      display: 'grid',
      gridTemplateRows: 'auto',
      backgroundColor: 'rgb(28,38,47)',
      padding: '0px 20px 0px 20px',
      height: 'calc(100vh - 57px)',
      overflow: 'auto',
    }
    const mainContentStyle = {
      backgroundColor: 'rgb(255,255,255)',
      display: 'grid',
      height: '100%',
      padding: '20px',
      gridTemplateRows: 'minmax(min-content, min-content)',
    }
    return (
      <Router>
        <div id={'grid'} style={gridStyle}>
        <div id="sidebar" style={sidebarStyle}>
          <div id="logo" style={{
            fontWeight: 'lighter',
            borderBottom: '1px solid rgb(28,38,47)',
          }}>
            <div style={{
              fontSize: '21px',
              color: 'rgb(255,255,255)',
              padding: '10px 12px 5px 24px',
              fontWeight: 200,
            }}>
              Readable
            </div>
            <div style={bylineStyle}>
              For those who haven't Reddit
            </div>
          </div>
          <div className="sidebar-main" style={sidebarMainStyle}>
            <div>
              <CategoriesListView/>
            </div>
          </div>
        </div>
        <div style={contentStyle}>
          <ContentHeader myCategory={this.props.category}/>
          <div className="content-main" style={contentMainStyle}>
            <div className="main-content" style={mainContentStyle}>
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
