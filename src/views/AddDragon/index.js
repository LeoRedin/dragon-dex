import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {Spinner} from 'components'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import {addDragon} from 'store/modules/dragons/actions'

import dragonStyle from './styles'

export function AddDragon() {
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('')

  const dragons = useSelector((state) => state.dragons.list)

  const dispatch = useDispatch()
  const classes = dragonStyle()

  const loading = useSelector((state) => state.dragons.loading)

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(addDragon(name, type))
  }

  React.useEffect(() => {
    setName('')
    setType('')
  }, [dragons])

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Adicionar novo Dragão
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
            Criar
          </Button>
        </form>
      </div>
      {loading && <Spinner />}
    </Container>
  )
}
