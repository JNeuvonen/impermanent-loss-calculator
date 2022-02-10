import { Stack, Link, Typography, Divider } from '@mui/material'
import { useNavigate } from 'react-router'

const AppBar = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        position: 'absolute',
        right: 30,
        top: 10,
        height: '40px',
      }}
    >
      <Stack spacing={2} direction="row">
        <Link
          underline="none"
          component="button"
          onClick={(e) => {
            navigate('/')
          }}
        >
          <Typography>App</Typography>
        </Link>
        <Link
          underline="none"
          component="button"
          onClick={(e) => {
            navigate('/about')
          }}
        >
          <Typography>About</Typography>
        </Link>
      </Stack>
      <Divider />
    </div>
  )
}

export default AppBar
