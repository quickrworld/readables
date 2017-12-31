const readableViewStyles = {
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
    gridColumnStart: '2',
    gridColumnEnd: '3',
    textAlign: 'right',
    alignContent: 'center'
  },
  editLabelStyle: {
    fontSize: '12pt',
    color: 'rgb(79, 79, 79)'
  },
  voteStyle: {
    whiteSpace: 'nowrap',
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
  headlineStyle: {
    gridColumnStart: '1',
    gridColumnEnd: '3',
    color: 'rgb(79, 79, 79)'
  },
  navlinkStyle: {
    textDecoration: 'none',
    color: 'rgba(79,79,79,1)'
  },
  navlinkActiveStyle: {
    color: 'rgba(79,79,79,1)',
    textDecoration: 'none',
  },
  readableEditorViewStyle: {
    borderBottom: '1px solid lightgray',
    marginBottom: '12px'
  }
}
export {readableViewStyles}