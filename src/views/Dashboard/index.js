import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import {withStyles} from '@material-ui/core/styles'

import {setDragonsRequest} from 'store/modules/dragons/actions'
import {formatDate, lorem, getRandomColor, invertColor} from 'utils/utils'

import dashboardStyles from './styles'

export function Dashboard() {
  const dragons = useSelector((state) => state.dragons.list)
  const dispatch = useDispatch()

  const classes = dashboardStyles()

  const noDragons = !dragons || dragons.length <= 0

  React.useEffect(() => {
    if (noDragons) dispatch(setDragonsRequest())
  }, [])

  return dragons.map((dragon) => {
    const color = getRandomColor()
    const inverseColor = invertColor(color, true)

    const MyCardHeader = withStyles({
      title: {
        color: inverseColor,
      },
      subheader: {
        color: inverseColor,
      },
    })(CardHeader)

    return (
      <Grid item xs={12} md={6} lg={4} key={`Dragon - ${dragon.id}`}>
        <Link className={classes.link} href={`/dragons/${dragon.id}`}>
          <Card
            style={{
              backgroundColor: color,
            }}
          >
            <MyCardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {dragon.name.charAt(0)}
                </Avatar>
              }
              title={`Nome: ${dragon.name} | Tipo: ${dragon.type}`}
              subheader={`Criado em: ${formatDate(dragon.createdAt)}`}
            />
            <div className={classes.mediaWrapper}>
              <CardMedia
                className={classes.media}
                image="https://via.placeholder.com/200x200"
                title={`Dragão ${dragon.name}`}
              />
            </div>
            <CardContent>
              <Typography
                style={{color: inverseColor}}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {dragon.histories.length > 0
                  ? dragon.histories.map((history) => history)
                  : lorem}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    )
  })
}
