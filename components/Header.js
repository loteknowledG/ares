import React, { useState, useCallback, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from 'react-storefront-amp/AmpAppBar'
import CartButton from 'react-storefront/CartButton'
import Search from './search/Search'
import Logo from '../components/assets/react-storefront-logo.svg'
import { Container, Typography } from '@material-ui/core'
import Menu from 'react-storefront-amp/menu/AmpMenu'
import MenuButton from 'react-storefront/menu/MenuButton'
import Link from 'react-storefront/link/Link'
import SessionContext from 'react-storefront/session/SessionContext'
import get from 'lodash/get'
import LazyHydrate from 'react-storefront/LazyHydrate'


const useStyles = makeStyles(theme => ({
  title: {},
  brandText: {
    flexGrow: 1,
    fontFamily: 'monospace',
    fontSize: '88%',
    whiteSpace: 'pre',
      
  },
  
  logo: {
    position: 'absolute',
    left: 10,
    top: 0,
    [theme.breakpoints.down('xs')]: {
      left: '50%',
      top: 6,
      marginLeft: -60,
    },
  },
 
  neon: {
    color: 'whitesmoke',
    textShadow:
      '0 0 3px #9D33FF,' +
      '0 0 5px #9D33FF,' +
      '0 0 10px #9D33FF,' +
      '0 0 20px #9D33FF,' +
      '0 0 40px #9D33FF,' +
      '0 0 50px #9D33FF'   
  },
  toolbar: {
    padding: 0,
    margin: 0,
  },
  container: {
    
    backgroundColor: 'deeppink',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
}))

export default function Header({ menu }) {
  const classes = useStyles()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hydrateMenu, setHydrateMenu] = useState(false)
  const handleMenuClose = useCallback(() => setMenuOpen(false), [])
  const handleMenuButtonClick = useCallback(() => {
    setMenuOpen(menuOpen => !menuOpen)
    setHydrateMenu(true)
  }, [])
  const { session } = useContext(SessionContext)
  return (
    <>
      <AppBar>
        <Container maxWidth="lg" className={classes.container}>
          <Typography
              className={`${classes.brandText} ${classes.neon}`}
              color="primary"><b>
&nbsp;____      _________  _________  __________ ___  _____<br/>
/   /_____/    O    \/__     __\/   /_____/|   |/____/<br/>  
\___\_____\_________/`13|___|37'\___\23407'|___|\____\<br/>
&nbsp;`BBBBBBBB'`BBBBBBB'     `B'     `BBBBBBBB'`BBB' `BBB'<br/>
          </b></Typography>
          <Search />
          <CartButton quantity={get(session, 'itemsInCart')} />
          <MenuButton open={menuOpen} onClick={handleMenuButtonClick} />
        </Container>
      </AppBar>
      <LazyHydrate id="menu" hydrated={hydrateMenu}>
        <Menu
          anchor="right"
          root={menu}
          open={menuOpen}
          onClose={handleMenuClose}
          // renderItem={item => <div>{item.text} (custom)</div>}
          // renderItemContent={item => <div>{item.text} (custom content)</div>}
          // renderBack={item => <div>{item.text} back</div>}
          // renderHeader={item => <div>{item.text} header</div>}
          // renderFooter={item => <div>{item.text} footer</div>}
        />
      </LazyHydrate>
    </>
  )
}
