import { Typography } from '@mui/material'
import { GetMediaQuery } from '../../hooks'

const Title = () => {
  const below850 = GetMediaQuery(850)
  let titleText = 'Impermanent Loss Calculator and Visualizer'
  if (below850) {
    titleText = 'Impermanent Loss Calculator'
  }
  return (
    <div style={{ marginBottom: '2.5vh', color: '#003f75' }}>
      <Typography variant="h5">{titleText}</Typography>
    </div>
  )
}

export default Title
