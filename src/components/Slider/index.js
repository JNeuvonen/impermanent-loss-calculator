import { Slider } from '@mui/material'

export const SliderWrapper = (min, max, text, perc, updaterFunc, sliderVal) => {
  const handleChange = (e, newValue) => {
    e.preventDefault()
    updaterFunc(newValue)
  }

  return (
    <div>
      <span className="bottom-inputs-grid__sliders__slider-txt">
        {text + ' '}
        <span style={{ fontWeight: 'bold' }}> {sliderVal}</span>
        {perc}
      </span>

      <Slider
        aria-label="Default"
        value={sliderVal}
        valueLabelDisplay="auto"
        className="bottom-inputs-grid__slider"
        min={min}
        max={max}
        onChange={handleChange}
        sx={{ color: '#0a88f4' }}
      />
    </div>
  )
}

export default SliderWrapper
