const commentHeaderStyles = {
  contentHeaderStyle: {
    backgroundColor: 'rgb(28,38,47)',
    boxShadow: 'rgba(0,0,0,0.5) 0px 2px 4px 0px',
    zIndex: '10',
    alignContent: 'baseline',
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontSize: '18px',
    color: 'rgb(255,255,255)',
    padding: '17px 12px 12px 12px',
    fontWeight: 200,
    display: 'grid',
    gridTemplateColumns: '1fr, 1fr, 1fr'
  },
  errorButtonStyle: {
    fontSize: '14px',
    padding: '4px 12px 12px 12px',
    alignContent: 'center',
    border: '0px',
    backgroundColor: 'rgba(255,255,255,0)',
    color: 'white'
  },
  errorMessageStyle: {
    fontSize: '14px',
    color: 'red',
    gridColumnStart:'3',
    gridColumnEnd:'4',
    textAlign: 'right'
  },
  categoryLabelStyle: {
    textAlign: 'center'
  }
}

export { commentHeaderStyles }