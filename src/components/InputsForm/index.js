import { Grid, TextField, IconButton, Typography, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import Card from '@mui/material/Card'
import InfoIcon from '@mui/icons-material/Info'
import StateManagement from '../../utils/actioncreators'

import { useMediaQuery } from '@mui/material'
import '../../style/css/style.css'

const InputsForm = () => {
  //Dispatchers
  const {
    updateApy,
    updateCapital,
    updateToken1Price,
    updateToken2Price,
    updatePoolLiquidity,
    updatePoolSpreadPerc,
    updateAvgVolume,
  } = StateManagement()

  //Hooks
  const [showOptionalFields, setShowOptionalFields] = useState(false)

  //State
  let poolLiq = useSelector((state) => state.poolLiquidity)
  let avgVolume = useSelector((state) => state.avgVolume)
  let poolSpreadPerc = useSelector((state) => state.poolSpreadPerc)
  let brightness = useSelector((state) => state.brightness)
  let apy = useSelector((state) => state.apy)

  //Component variables
  let avgDailyRet = null
  let token1Label = 'Token 1 price'
  let token2Label = 'Token 2 price'
  let capitalLabel = 'Capital'
  let poolLiquidityLabel = 'Pool liquidity'
  let avg24hVolumeLabel = 'Avg. 24h volume'
  let poolSpreadLabel = 'Pool spread'

  const below1000 = useMediaQuery('(max-width:1000px)')

  //Media query
  if (below1000) {
    token1Label = 'T1 Price'
    token2Label = 'T2 Price'
    capitalLabel = 'Cap'
    poolLiquidityLabel = 'Pool liq'
    avg24hVolumeLabel = 'Avg. Vol'
    poolSpreadLabel = 'Spread'
  }

  //Return average daily return based on inputs
  const getAvgDailyRet = () => {
    return 1 + (avgVolume / poolLiq) * (poolSpreadPerc / 100)
  }

  //Update APY after one of: pool liquidity, avg volume or pool spread is changed
  const modifyApyInput = () => {
    if (poolLiq && avgVolume && poolSpreadPerc) {
      avgDailyRet = getAvgDailyRet()
      let apyHelper = (Math.pow(avgDailyRet, 365) - 1) * 100
      apyHelper = isNaN(apyHelper) ? 70 : apyHelper
      document.getElementById('apy-input').value = apyHelper.toFixed(2)
      updateApy(apyHelper)
    }
  }

  //Update 24h volume after apy is changed
  const modifyAvg24hVolume = () => {
    if (apy) {
      avgDailyRet = Math.pow(1 + apy / 100, 1 / 365)
    }
    if (poolLiq && poolSpreadPerc && avgDailyRet) {
      let volumeHelper = ((avgDailyRet - 1) * poolLiq) / (poolSpreadPerc / 100)
      document.getElementById('volume-input').value = volumeHelper.toFixed(0)
    }
  }

  //MUI input field styles
  const inputFieldProps = {
    fontSize: '1.7rem',
    color: brightness === 'light' ? 'black' : '#fff',
  }

  return (
    <div className="inputs">
      <TextField
        onChange={(e) => {
          e.preventDefault()
          if (Number(e.target.value) > 0) {
            updateToken2Price(Number(e.target.value))
          }
        }}
        className="inputs__input-field"
        label={<p className="inputs__input-field__label">{token1Label}</p>}
        name="Token 1 price"
        variant="filled"
        defaultValue={3000}
        InputProps={{
          style: inputFieldProps,
          startAdornment: (
            <InputAdornment position="start">
              <p className="inputs__input-field__adornment">$</p>
            </InputAdornment>
          ),
        }}
        type="number"
      ></TextField>

      <TextField
        onChange={(e) => {
          e.preventDefault()
          if (Number(e.target.value) > 0) {
            updateToken1Price(Number(e.target.value))
          }
        }}
        label={<p className="inputs__input-field__label">{token2Label}</p>}
        name="Token 2 price"
        className="inputs__input-field"
        defaultValue={150}
        type="number"
        variant="filled"
        InputProps={{
          style: inputFieldProps,
          startAdornment: (
            <InputAdornment position="start">
              {' '}
              <p className="inputs__input-field__adornment">$</p>
            </InputAdornment>
          ),
        }}
      ></TextField>

      <TextField
        onChange={(e) => {
          e.preventDefault()
          apy = e.target.value
          if (Number(apy) > 0) {
            updateApy(apy)
          }
          modifyAvg24hVolume()
        }}
        label={<p className="inputs__input-field__label">APY</p>}
        id="apy-input"
        defaultValue={70}
        name="apyInput"
        className="inputs__input-field"
        variant="filled"
        InputProps={{
          style: inputFieldProps,
          startAdornment: (
            <InputAdornment position="start">
              <p className="inputs__input-field__adornment">%</p>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                title={
                  <p className="inputs__input-field__tooltip">
                    Don't know APY? Estimate it with avg 24h vol, liquidity pool
                    size and spread
                  </p>
                }
              >
                <IconButton
                  className="inputs__input-field__icon"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowOptionalFields(!showOptionalFields)
                  }}
                >
                  <InfoIcon
                    fontSize="large"
                    style={{
                      fill: brightness === 'light' ? '#7a7a7a' : '#fff',
                    }}
                  />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      ></TextField>

      <TextField
        onChange={(e) => {
          e.preventDefault()
          if (Number(e.target.value) > 0) {
            updateCapital(Number(e.target.value))
          }
        }}
        label={<p className="inputs__input-field__label">{capitalLabel}</p>}
        type="number"
        defaultValue={5000}
        name="capitalInput"
        variant="filled"
        className="inputs__input-field"
        InputProps={{
          style: inputFieldProps,
          startAdornment: (
            <InputAdornment position="start">
              <p className="inputs__input-field__adornment">$</p>
            </InputAdornment>
          ),
        }}
      ></TextField>

      {showOptionalFields ? (
        <TextField
          onChange={(e) => {
            e.preventDefault()
            poolLiq = Number(e.target.value)
            updatePoolLiquidity(poolLiq)
            modifyApyInput()
          }}
          label={
            <p className="inputs__input-field__label">{poolLiquidityLabel}</p>
          }
          name="liquidityInput"
          id="liq-input"
          className="inputs__input-field"
          variant="filled"
          InputProps={{
            style: inputFieldProps,
            startAdornment: (
              <InputAdornment position="start">
                {' '}
                <p className="inputs__input-field__adornment">$</p>
              </InputAdornment>
            ),
          }}
        ></TextField>
      ) : null}

      {showOptionalFields ? (
        <TextField
          onChange={(e) => {
            e.preventDefault()
            avgVolume = Number(e.target.value)
            updateAvgVolume(avgVolume)
            modifyApyInput()
          }}
          label={
            <p className="inputs__input-field__label">{avg24hVolumeLabel}</p>
          }
          id="volume-input"
          name="volumeInput"
          className="inputs__input-field"
          variant="filled"
          InputProps={{
            style: inputFieldProps,
            startAdornment: (
              <InputAdornment position="start">
                <p className="inputs__input-field__adornment">$</p>
              </InputAdornment>
            ),
          }}
        ></TextField>
      ) : null}

      {showOptionalFields ? (
        <TextField
          onChange={(e) => {
            e.preventDefault()
            poolSpreadPerc = Number(e.target.value)
            updatePoolSpreadPerc(poolSpreadPerc)
            modifyApyInput()
          }}
          label={
            <p className="inputs__input-field__label">{poolSpreadLabel}</p>
          }
          name="spreadInput"
          variant="filled"
          className="inputs__input-field"
          InputProps={{
            style: inputFieldProps,
            startAdornment: (
              <InputAdornment position="start">
                <p className="inputs__input-field__adornment">%</p>
              </InputAdornment>
            ),
          }}
        ></TextField>
      ) : null}
    </div>
  )
}

export default InputsForm
