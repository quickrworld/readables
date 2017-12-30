const toplineMenuStyles = {
  topLineStyle: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto minmax(min-content, min-content)',
    paddingBottom: '6px',
  },
  sortLineStyle: {
    gridColumnStart: '1',
    gridColumnEnd: '2',
  },
  buttonBoxStyle: {
    gridColumnStart: '2',
    gridColumnEnd: '3',
    textAlign: 'right'
  },
  newReadableButtonStyle: {
    borderWidth: '0px',
    borderColor: 'rgb(255,255,255)',
    pointerStyle: 'pointer'
  },
  sortLinkStyle: {
    'cursor': 'pointer',
  }
}
export {toplineMenuStyles}