const commentEditorViewStyles = {
  editorStyle: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: 'auto minmax(min-content, min-content)',
    paddingTop: '12px',
    paddingBottom: '24px',
  },
  commentLabelStyle: {
    paddingRight: '4px'
  },
  textareaStyle: {
    paddingTop: '12px',
    marginRight: '12px'
  },
  commentStyle: {
    border: '1px solid lightgray',
    overflowY: 'auto',
    width: '100%',
    outline: 'none',
    boxShadow: 'none',
    resize: 'none'
  },
  buttonRowStyle: {
    justifySelf: 'end',
    paddingRight: '6px'
  },
  closeButtonStyle: {
    align:'right',
    borderWidth: '0px'
  },
  commentButtonStyle: {
    align:'right',
    borderWidth: '0px'
  },
  errorMessageStyle: {
    borderWidth: '0px',
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
  }
}

export { commentEditorViewStyles }
