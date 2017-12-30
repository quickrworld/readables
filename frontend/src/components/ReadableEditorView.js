import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addReadable} from '../actions'
import {editReadable} from '../actions'
import {readableEditorViewStyles as styles} from './styles/readableEditorViewStyles'

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
      !this.state.title ||
      this.state.category === 'all') {
      let errorMessage = ''
      if(!this.state.author) {
        errorMessage = `${errorMessage} Author is required.`
      }
      if(this.state.category === 'all') {
        errorMessage = `${errorMessage} Category is required.`
      }
      if(!this.state.title) {
        errorMessage = `${errorMessage}  Title is required.`
      }
      if(!this.state.story) {
        errorMessage = `${errorMessage} Story is required.`
      }
      this.setState({ errorMessage: errorMessage.trim() })
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
    if (!this.state.author || !this.state.story || !this.state.title) {
      let errorMessage = ''
      if(!this.state.author) {
        errorMessage = `${errorMessage} Author is required.`
      }
      if(!this.state.title) {
        errorMessage = `${errorMessage} Title is required.`
      }
      if(!this.state.story) {
        errorMessage = `errorMessage} Story is required.`
      }
      this.setState({ errorMessage: errorMessage.trim() })
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
      categories: props.categories,
      errorMessage: '',
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
    return (
      <div style={styles.editorStyle}>
        <div style={{gridRow: '1', gridColumnStart: '1', gridColumnEnd: '5',}}>
          <span style={styles.authorLabelStyle}>Authored by </span>
          <input
            type="text"
            disabled={!!this.state.id}
            onChange={this.handleAuthorChange}
            name={'author'}
            placeholder={'Author'}
            value={this.state.author ? this.state.author : ''}/>
          <span style={styles.categoryLabelStyle}>Category </span>
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
          <span style={styles.titleLabelStyle}>Title </span>
          <input
            type="text"
            onChange={this.handleTitleChange}
            name={'title'}
            placeholder={'Title'}
            value={this.state.title ? this.state.title : ''}
          />
        </div>
        <div style={styles.storyBoxStyle}>
          <textarea
            onChange={this.handleStoryChange} name={'story'} rows={'5'} placeholder={'Your story'}
            value={this.state.story ? this.state.story : ''}
            style={styles.textareaStyle}>
          </textarea>
        </div>
        <div style={{gridRow: '4', gridColumnStart: '4', ...styles.buttonRowStyles}}>
          <button onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onClick={this.props.close}
                  style={styles.closeButtonStyle}>Close
          </button>
          <button onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onClick={this.props.id ? this.editReadable : this.addReadable}
                  style={styles.submitButtonStyle}>Submit
          </button>
        </div>
        {this.state.errorMessage &&
        <div style={styles.errorMessageStyle}>
          {this.state.errorMessage}
          {this.state.errorMessage &&
          <button style={styles.errorButtonStyle}
                  onClick={() => this.setState({errorMessage: ''})}>&#x24e7;</button>}
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {allCategories} = state
  if (allCategories && allCategories.items) {
    const keys = Object.keys(allCategories.items)
    const categories = keys.reduce((categories, category) => {
      // remember array.push returns count of items pushed.
      // so we must return the array variable after it is nice
      // and ready in the statement following the push operation
      // Or use concat?
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
