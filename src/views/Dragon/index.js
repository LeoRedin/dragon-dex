import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {Spinner} from 'components'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import {updateDragon, deleteDragon} from 'store/modules/dragons/actions'

import dragonStyle from './styles'

export function Dragon({
  match: {
    params: {id: dragonId},
  },
}) {
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('')

  const dispatch = useDispatch()
  const classes = dragonStyle()

  const [dragon] = useSelector((state) =>
    state.dragons.list.filter((one) => one.id === dragonId),
  )
  const loading = useSelector((state) => state.dragons.loading)
  React.useEffect(() => {
    if (!dragon) return

    const {name: dragonName, type: dragonType} = dragon

    setName(dragonName)
    setType(dragonType)
  }, [dragon])

  if (!dragon) return <Spinner />

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(updateDragon(dragonId, name, type))
  }

  const handleDelete = () => dispatch(deleteDragon(dragonId))

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {name}
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="type"
            label="Tipo"
            name="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Atualizar
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleDelete}
          >
            Deletar
          </Button>
        </form>
      </div>
      {loading && <Spinner />}
    </Container>
  )
}
