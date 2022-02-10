import { Grid, TextField, IconButton, Typography, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import Card from '@mui/material/Card'
import InfoIcon from '@mui/icons-material/Info'
import StateManagement from '../../utils/actioncreators'
import styles from '../../css/app.module.css'
import { useMediaQuery } from '@mui/material'

const InputsForm = () => {
  const {
    updateApy,
    updateCapital,
    updateToken1Price,
    updateToken2Price,
    updatePoolLiquidity,
    updatePoolSpreadPerc,
    updateAvgVolume,
  } = StateManagement()

  const [showOptionalFields, setShowOptionalFields] = useState(false)
  let poolLiq = useSelector((state) => state.poolLiquidity)
  let avgVolume = useSelector((state) => state.avgVolume)
  let poolSpreadPerc = useSelector((state) => state.poolSpreadPerc)
  let apy = useSelector((state) => state.apy)
  let avgDailyRet = null
  let token1Label = 'Token 1 price'
  let token2Label = 'Token 2 price'
  let capitalLabel = 'Capital'
  let poolLiquidityLabel = 'Pool liquidity'
  let avg24hVolumeLabel = 'Avg. 24h volume'
  let poolSpreadLabel = 'Pool spread'

  const below1000 = useMediaQuery('(max-width:1000px)')
  const below800 = useMediaQuery('(max-width:800px)')
  let width = 10

  if (below1000) {
    token1Label = 'T1 Price'
    token2Label = 'T2 Price'
    capitalLabel = 'Cap'
    poolLiquidityLabel = 'Pool liq'
    avg24hVolumeLabel = 'Avg. Vol'
    poolSpreadLabel = 'Spread'
  }

  let inlineStyle = {
    inputFormGrid: {
      marginLeft: below800 ? 10 : 132,
    },
  }

  if (below800) {
    inlineStyle['inputFormGrid']['marginLeft'] = 0
    width = 24
  }

  const getAvgDailyRet = () => {
    return 1 + (avgVolume / poolLiq) * (poolSpreadPerc / 100)
  }
  const modifyApyInput = () => {
    if (poolLiq && avgVolume && poolSpreadPerc) {
      console.log(poolLiq, avgVolume, poolSpreadPerc)
      avgDailyRet = getAvgDailyRet()
      let apyHelper = (Math.pow(avgDailyRet, 365) - 1) * 100
      console.log(avgDailyRet, apyHelper)
      apyHelper = isNaN(apyHelper) ? 70 : apyHelper
      document.getElementById('apy-input').value = apyHelper.toFixed(2)
      updateApy(apyHelper)
    }
  }

  const modifyAvg24hVolume = () => {
    if (apy) {
      avgDailyRet = Math.pow(1 + apy / 100, 1 / 365)
    }
    if (poolLiq && poolSpreadPerc && avgDailyRet) {
      let volumeHelper = ((avgDailyRet - 1) * poolLiq) / (poolSpreadPerc / 100)
      document.getElementById('volume-input').value = volumeHelper.toFixed(0)
    }
  }

  return (
    <div className={styles.inputFormDiv}>
      <Card className={styles.inputFormCard}>
        <Grid
          container
          spacing={2}
          columns={100}
          style={inlineStyle.inputFormGrid}
        >
          <Grid item xs={width}>
            <TextField
              variant="standard"
              onChange={(e) => {
                e.preventDefault()
                if (Number(e.target.value) > 0) {
                  updateToken2Price(Number(e.target.value))
                }
              }}
              label={
                <Typography style={{ color: '#003f75' }}>
                  {token1Label}
                </Typography>
              }
              name="Token 1 price"
              defaultValue={3000}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid item xs={width}>
            <TextField
              variant="standard"
              onChange={(e) => {
                e.preventDefault()
                if (Number(e.target.value) > 0) {
                  updateToken1Price(Number(e.target.value))
                }
              }}
              label={
                <Typography style={{ color: '#003f75' }}>
                  {token2Label}
                </Typography>
              }
              name="Token 2 price"
              defaultValue={150}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid item xs={width}>
            <TextField
              variant="standard"
              onChange={(e) => {
                e.preventDefault()
                apy = e.target.value
                if (Number(apy) > 0) {
                  updateApy(apy)
                }
                modifyAvg24hVolume()
              }}
              label={<Typography style={{ color: '#003f75' }}>APY</Typography>}
              id="apy-input"
              defaultValue={70}
              name="apyInput"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid item xs={width}>
            <TextField
              variant="standard"
              onChange={(e) => {
                e.preventDefault()
                if (Number(e.target.value) > 0) {
                  updateCapital(Number(e.target.value))
                }
              }}
              label={
                <Typography style={{ color: '#003f75' }}>
                  {capitalLabel}
                </Typography>
              }
              type="number"
              defaultValue={5000}
              name="capitalInput"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>

          {!below800 && (
            <Tooltip
              title={
                <Typography>
                  Don't know APY? Estimate it with avg 24h vol, liquidity pool
                  size and spread
                </Typography>
              }
            >
              <IconButton
                onClick={(e) => {
                  e.preventDefault()
                  setShowOptionalFields(!showOptionalFields)
                }}
                style={{
                  position: 'relative',
                  top: '0.5vh',
                }}
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
          )}

          {showOptionalFields ? (
            <Grid item xs={10}>
              <TextField
                variant="standard"
                onChange={(e) => {
                  e.preventDefault()
                  poolLiq = Number(e.target.value)
                  updatePoolLiquidity(poolLiq)
                  modifyApyInput()
                }}
                label={
                  <Typography style={{ color: '#003f75' }}>
                    {poolLiquidityLabel}
                  </Typography>
                }
                name="liquidityInput"
                id="liq-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          ) : null}

          {showOptionalFields ? (
            <Grid item xs={10}>
              <TextField
                variant="standard"
                onChange={(e) => {
                  e.preventDefault()
                  avgVolume = Number(e.target.value)
                  updateAvgVolume(avgVolume)
                  modifyApyInput()
                }}
                label={
                  <Typography style={{ color: '#003f75' }}>
                    {avg24hVolumeLabel}
                  </Typography>
                }
                id="volume-input"
                name="volumeInput"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          ) : null}

          {showOptionalFields ? (
            <Grid item xs={10}>
              <TextField
                variant="standard"
                onChange={(e) => {
                  e.preventDefault()
                  poolSpreadPerc = Number(e.target.value)
                  updatePoolSpreadPerc(poolSpreadPerc)
                  modifyApyInput()
                }}
                label={
                  <Typography style={{ color: '#003f75' }}>
                    {poolSpreadLabel}
                  </Typography>
                }
                name="spreadInput"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          ) : null}
        </Grid>
      </Card>
    </div>
  )
}

export default InputsForm
