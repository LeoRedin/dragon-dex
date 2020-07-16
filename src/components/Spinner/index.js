import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import {RingLoader} from 'react-spinners'

export function Spinner() {
  return (
    <Backdrop open style={{zIndex: 1201}}>
      <RingLoader color="#1976d2" />
    </Backdrop>
  )
}
