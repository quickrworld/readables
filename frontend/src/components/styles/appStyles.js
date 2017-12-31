const appStyles = {
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
    fontSize: '20px',
    color: 'rgba(255,255,255,.9)',
    padding: '10px 12px 5px 24px',
    fontWeight: 200,
  }
}

export { appStyles }
