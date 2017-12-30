const commentViewStyles = {
  topLineStyle: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: 'auto minmax(min-content, min-content)',
    paddingBottom: '6px',
  },
  commentHeadingStyle: {
    gridColumnStart: '1',
    gridColumnEnd: '4',
    color: 'rgb(79, 79, 79)',
    alignContent: 'center',
    paddingTop: '12px'
  },
  commentVoteLineStyle: {
    whiteSpace: 'nowrap',
    color: 'rgb(79, 79, 79)'
  },
  buttonRowStyle: {
    gridColumnStart: '4',
    gridColumnEnd: '5',
    textAlign: 'right',
    alignContent: 'center',
    paddingTop: '12px'
  },
  editIconStyle: {
    fontSize: '12pt',
    color: 'rgb(79, 79, 79)'
  },
  commentStoryStyle: {
    gridColumnStart: '1',
    gridColumnEnd: '3',
    padding: '0px 0px 12px 0px',
    fontSize: '14px',
    borderBottom: '1px solid lightgray',
    color: 'rgb(79, 79, 79)'
  },
  deleteButtonStyle: {
    borderWidth: '0px'
  },
  editButtonStyle: {
    borderWidth: '0px'
  },
  commentEditorBox: {
    marginBottom: '12px',
    borderBottom: '1px solid lightgray',
  },
  upvoteStyle: {
    paddingLeft:'4px',
    paddingRight:'4px'
  }
}

export { commentViewStyles }