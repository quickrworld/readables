import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addReadable} from '../actions'
import {editReadable} from '../actions'

class ReadableEditorView extends Component {
  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id,
      author: nextProps.author,
      category: nextProps.category,
      title: nextProps.title,
      story: nextProps.story,
      categories: nextProps.categories,
    })
  }

  addReadable = () => {
    if (!this.state.author ||
      !this.state.story ||
      !this.state.category ||
      this.state.category === 'all') {
      return
    }
    this.props.addReadable({
      category: this.state.category,
      author: this.state.author,
      body: this.state.story,
      title: this.state.title,
    })
// TODO
// success => close
// failure => display message. Do not close. Provide a close button.
// animate close
    if (this.props.close) {
      this.props.close()
    }
  }
  editReadable = () => {
    if (!this.state.author || !this.state.story) {
      return
    }
    this.props.editReadable({
      id: this.state.id,
      author: this.state.author,
      category: this.state.category,
      body: this.state.story,
      title: this.state.title,
    })
    // test code
    if (this.props.close) {
      this.props.close()
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      author: props.author,
      category: props.category,
      title: props.title,
      story: props.story,
      categories: props.categories
    }
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
  handleAuthorChange = (event) => {
    this.setState({author: event.target.value});
  }
  handleCategoryChange = (event) => {
    if (this.state.id) {
      return
    }
    this.setState({category: event.target.value});
  }
  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }
  handleStoryChange = (event) => {
    this.setState({story: event.target.value});
  }

  render() {
    const editorStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridTemplateRows: 'auto minmax(min-content, min-content)',
      paddingTop: '12px',
      paddingBottom: '24px',
      borderBottom: '1px solid lightgray'
    }
    return (
      <div style={editorStyle}>
        <div style={{
          gridRow: '1',
          gridColumnStart: '1',
          gridColumnEnd: '5',
        }}>
          <span style={{paddingRight: '4px'}}>Authored by </span>
          <input
            type="text"
            onChange={this.handleAuthorChange}
            name={'author'}
            placeholder={'Author'}
            value={this.state.author ? this.state.author : ''}
          />
          <span style={{paddingLeft: '12px', paddingRight: '4px'}}>Category </span>
          <select name='categorySelector'
                  onChange={this.handleCategoryChange}
                  disabled={!!this.state.id}
                  style={{}}
                  value={this.state.category}>
            <option key={'none'} value={''}>None</option>
            {this.state.categories.map((category) => {
              return <option key={category.path} value={category.path}>{category.name}</option>
            })}
          </select>
          <span style={{paddingLeft: '12px', paddingRight: '4px'}}>Title </span>
          <input
            type="text"
            onChange={this.handleTitleChange}
            name={'title'}
            placeholder={'Title'}
            value={this.state.title ? this.state.title : ''}
          />
        </div>
        <div style={{
          gridRow: '3',
          gridColumnStart: '1',
          gridColumnEnd: '5',
          paddingTop: '12px',
          marginRight: '12px'
        }}>
        <textarea
          onChange={this.handleStoryChange} name={'story'} rows={'5'} placeholder={'Your story'}
          value={this.state.story ? this.state.story : ''}
          style={{
            border: '1px solid lightgray',
            overflowY: 'auto',
            width: '100%',
            outline: 'none',
            boxShadow: 'none',
            resize: 'none'
          }}>
        </textarea>
        </div>
        <div style={{gridRow: '4', gridColumnStart: '4', justifySelf: 'end', paddingRight: '6px'}}>
          <button onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onClick={this.props.close}
                  style={{align: 'right', borderWidth: '0px'}}>Close
          </button>
          <button onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onClick={this.props.id ? this.editReadable : this.addReadable}
                  style={{align: 'right', borderWidth: '0px'}}>Submit
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {allCategories} = state
  if (allCategories && allCategories.items) {
    const keys = Object.keys(allCategories.items)
    const categories = keys.reduce((categories, category) => {
      // remember push returns count of items pushed. Or use concat?
      categories.push(allCategories.items[category])
      return categories
    }, [])
    return {categories: categories}
  }
  return {categories: []}
}

function mapDispatchToProps(dispatch) {
  return {
    addReadable: (data) => dispatch(addReadable(data)),
    editReadable: (data) => dispatch(editReadable(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadableEditorView)
