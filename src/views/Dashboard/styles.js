import {makeStyles} from '@material-ui/core/styles'

const dashboardStyles = makeStyles(() => ({
  paper: {
    height: '250px',
  },
  media: {
    width: '100%',
    height: '200px',
  },
  mediaWrapper: {
    padding: '16px',
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))

export default dashboardStyles
