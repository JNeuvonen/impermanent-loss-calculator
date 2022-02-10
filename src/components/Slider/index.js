import { Slider, Box } from '@mui/material'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import StateManagement from '../../utils/actioncreators'
import styles from '../../css/app.module.css'

export const SliderWrapper = (min, max, text, perc) => {
  const { updateDaysOut, updateRange, updateApyDecrease } = StateManagement()
  const daysOut = useSelector((state) => state.daysOut)
  const range = useSelector((state) => state.range)
  const apyDecrease = useSelector((state) => state.apyDecrease)
  let sliderVal = null

  let updaterFunc = null
  if (text === 'DAYS:') {
    sliderVal = daysOut
    updaterFunc = updateDaysOut
    if (!sliderVal) {
      sliderVal = 365
    }
  }

  if (text === 'REDUCE APY ANNUALLY BY: ') {
    sliderVal = apyDecrease
    updaterFunc = updateApyDecrease
    if (!sliderVal) {
      sliderVal = 0
    }
  }

  if (text === 'CHART RANGE: ±') {
    sliderVal = range
    updaterFunc = updateRange
    if (!sliderVal) {
      sliderVal = 150
    }
  }

  const handleChange = (e, newValue) => {
    e.preventDefault()
    updaterFunc(newValue)
  }
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Typography style={{ fontSize: '1rem' }}>{text} </Typography>
        <Typography
          style={{ fontWeight: 'bold', marginLeft: 5, fontSize: '1rem' }}
        >
          {sliderVal}
          {perc}
        </Typography>
      </div>

      <Box className={styles.sliderBox}>
        <Slider
          aria-label="Default"
          value={sliderVal}
          valueLabelDisplay="auto"
          min={min}
          max={max}
          onChange={handleChange}
        />
      </Box>
    </div>
  )
}

export default SliderWrapper
