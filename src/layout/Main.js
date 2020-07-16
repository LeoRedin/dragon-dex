import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Link from '@material-ui/core/Link'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'

import {logout} from 'store/modules/auth/actions'

import layoutStyles from './styles'

export default function Layout({children, history}) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const dispatch = useDispatch()
  const classes = layoutStyles()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const dragons = useSelector((state) => state.dragons.list)

  const DrawerContent = () => (
    <List className={classes.defaultList}>
      <ListItem component="a" href="/add-dragon">
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
        >
          Adicionar
          <AddIcon />
        </Button>
      </ListItem>

      {dragons.length > 0 ? (
        dragons.map((dragon) => (
          <ListItem
            key={dragon.id}
            component="a"
            href={`/dragons/${dragon.id}`}
            button
          >
            <ListItemText primary={dragon.name} />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="Sem Dragões :(" />
        </ListItem>
      )}
    </List>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, mobileOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link
              href="/"
              className={classes.homeLink}
              onClick={() => history?.push('/dashboard')}
            >
              DragonDex
            </Link>
          </Typography>
          <Button
            variant="text"
            className={classes.exitButton}
            onClick={() => dispatch(logout())}
          >
            sair
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <DrawerContent hist={history} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper),
            }}
            open
          >
            <Toolbar />
            <DrawerContent hist={history} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </main>
    </div>
  )
}
