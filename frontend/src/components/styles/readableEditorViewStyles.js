const readableEditorViewStyles = {
  editorStyle: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: 'auto minmax(min-content, min-content)',
    paddingTop: '12px',
    paddingBottom: '24px',
    borderBottom: '1px solid lightgray'
  },
  authorLabelStyle: {
    paddingRight: '4px'
  },
  categoryLabelStyle: {
    paddingLeft: '12px',
    paddingRight: '4px'
  },
  titleLabelStyle: {
    paddingLeft: '12px',
    paddingRight: '4px'
  },
  storyBoxStyle: {
    gridRow: '3',
    gridColumnStart: '1',
    gridColumnEnd: '5',
    paddingTop: '12px',
    marginRight: '12px'
  },
  textareaStyle: {
    border: '1px solid lightgray',
    overflowY: 'auto',
    width: '100%',
    outline: 'none',
    boxShadow: 'none',
    resize: 'none'
  },
  buttonRowStyles: {
    justifySelf: 'end', paddingRight: '6px'
  },
  errorMessageStyle: {
    gridRow: '4',
    gridColumnStart: '1',
    gridColumnEnd: '3',
    padding: '0px, 6px, 0px, 6px',
    color: 'red'
  },
  errorButtonStyle: {
    fontSize: '12px',
    alignContent: 'center',
    border: '0px',
    color: 'red',
    paddingBottom:'0px',
    paddingTop:'0px'
  },
  closeButtonStyle: {
    align: 'right',
    borderWidth: '0px'
  },
  submitButtonStyle: {
    align: 'right',
    borderWidth: '0px'
  }
}

export { readableEditorViewStyles }