const readableViewWithCommentsStyles = {
  topLineStyle: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto minmax(min-content, min-content)',
    paddingBottom: '6px',
  },
  titleStyle: {
    gridColumnStart: '1',
    gridColumnEnd: '2',
    fontSize: '18px',
    color: 'rgb(79, 79, 79)'
  },
  editIconStyle: {
    fontSize: '12pt',
    color: 'rgb(79, 79, 79)',
    borderWidth: '0px'
  },
  voteStyle: {
    whiteSpace: 'nowrap',
    color: 'rgb(79, 79, 79)'
  },
  headlineStyle: {
    gridColumnStart: '1',
    gridColumnEnd: '3',
    color: 'rgb(79, 79, 79)'
  },
  storyStyle: {
    gridColumnStart: '1',
    gridColumnEnd: '3',
    padding: '12px 0px 12px 0px',
    fontSize: '14px',
    borderBottom: '1px solid lightgray',
    color: 'rgb(79, 79, 79)'
  },
  editorBoxStyle: {
    borderBottom: '1px solid lightgray',
    marginBottom: '12px'
  },
  buttonStyle: {
    borderWidth: '0px'
  },
  upvoteStyle: {
    paddingLeft: '4px',
    paddingRight:'4px'
  },
  navlinkStyle: {
    textDecoration: 'none',
    color: 'rgba(47,61,72,1)'
  },
  navlinkActiveStyle: {
    textDecoration: 'none'
  },
  messageBoxStyle: {
    border: '1px solid lightgray',
    margin: '20px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: 'rgba(0,0,0,0.5) 0px 2px 4px 0px'
  },
  headingStyle: {
    fontSize:'20px'
  }
}

export {readableViewWithCommentsStyles}
