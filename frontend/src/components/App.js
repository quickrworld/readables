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
  styles = {
    gridStyle: {
      fontFamily: 'Open Sans',
      fontSize: '12px',
      display: 'grid',
      width: '100%',
      height: '100vh',
      gridTemplateColumns: '20rem 1fr',
    },
    sidebarStyle: {
      fontFamily: 'Open Sans',
      fontSize: '10px',
      backgroundColor: 'rgb(47,61,72)',
      zIndex: '20',
      display: 'grid',
      gridTemplateRows: '70px 1fr',
    },
    bylineStyle: {
      fontFamily: 'Open Sans',
      fontSize: '12px',
      color: 'rgba(255,255,255,.5)',
      padding: '0px 10px 10px 24px',
      fontWeight: '100',
    },
    sidebarMainStyle: {
      display: 'grid',
      gridTemplateRows: 'auto',
      backgroundColor: 'rgb(47,61,72)',
      padding: '0px 20px 0px 20px',
      height: 'calc(100vh - 77px)',
      overflow: 'auto',
    },
    contentStyle: {
      display: 'grid',
      gridTemplateRows: '57px 1fr',
    },
    contentMainStyle: {
      display: 'grid',
      gridTemplateRows: 'auto',
      backgroundColor: 'rgb(28,38,47)',
      padding: '0px 20px 0px 20px',
      height: 'calc(100vh - 57px)',
      overflow: 'auto',
    },
    mainContentStyle: {
      backgroundColor: 'rgb(255,255,255)',
      display: 'grid',
      height: '100%',
      padding: '20px',
      gridTemplateRows: 'minmax(min-content, min-content)',
    },
    logoBoxStyle: {
      fontWeight: 'lighter',
      borderBottom: '1px solid rgb(28,38,47)',
    },
    logoTextStyle: {
      fontSize: '21px',
      color: 'rgb(255,255,255)',
      padding: '10px 12px 5px 24px',
      fontWeight: 200,
    }
  }
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
        <div id={'grid'} style={this.styles.gridStyle}>
        <div id="sidebar" style={this.styles.sidebarStyle}>
          <div id="logo" style={this.styles.logoBoxStyle}>
            <div style={this.styles.logoTextStyle}>
              Readable
            </div>
            <div style={this.styles.bylineStyle}>
              For those who haven't Reddit
            </div>
          </div>
          <div style={this.styles.sidebarMainStyle}>
            <div>
              <CategoriesListView/>
            </div>
          </div>
        </div>
        <div style={this.styles.contentStyle}>
          <ContentHeader myCategory={this.props.category}/>
          <div style={this.styles.contentMainStyle}>
            <div style={this.styles.mainContentStyle}>
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
