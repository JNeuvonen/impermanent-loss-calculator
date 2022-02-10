import Slider from '../Slider'
import Stack from '@mui/material/Stack'
import { Button, ButtonGroup, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import StateManagement from '../../utils/actioncreators'
import styles from '../../css/app.module.css'
import { GetMediaQuery } from '../../hooks'
const SlidersGrid = () => {
  const { updateTableValue } = StateManagement()
  const [profit, setProfit] = useState(false)
  const [profitPerc, setProfitPerc] = useState(true)
  const [fees, setFees] = useState(false)
  const [feesPerc, setFeesPerc] = useState(false)

  const below650 = GetMediaQuery(650)
  const below1050 = GetMediaQuery(1050)

  const fontSize = '1rem'
  let direction = 'row'
  let changeText = '% Change'
  let profitText = '$ Profit'
  let feesText = '$ Accrued fees'
  let feesPercText = '% Accrued fees'
  let marginLeft = 0
  let columnSpacing = 3.5

  if (below1050) {
    marginLeft = '1vw'
  }

  if (below650) {
    direction = 'column'
    changeText = '% PnL'
    profitText = '$ PnL'
    feesText = '$ Fees'
    feesPercText = '% Fees'
    columnSpacing = 0
    marginLeft = '10vw'
  }

  const enableButton = (type, enabledButton, restOfButtons) => {
    enabledButton(true)
    restOfButtons.forEach((btn) => btn(false))
    updateTableValue(type)
  }

  return (
    <div className={styles.buttonGroupBar}>
      <Stack
        direction={direction}
        spacing={columnSpacing}
        marginLeft={marginLeft}
      >
        {Slider(50, 1095, 'DAYS:', null)}
        {Slider(0, 99, 'REDUCE APY ANNUALLY BY: ', '%')}
      </Stack>
      {below650 ? (
        <div>
          <ButtonGroup
            orientation="vertical"
            style={{ position: 'relative', marginLeft: '22vw' }}
          >
            <Button
              onClick={(e) => {
                enableButton('profitPerc', setProfitPerc, [
                  setProfit,
                  setFees,
                  setFeesPerc,
                ])
              }}
              className={styles.buttonGroupButton}
              variant={profitPerc ? 'contained' : 'outlined'}
            >
              <Typography
                style={{
                  color: profitPerc ? 'white' : 'black',
                  fontSize,
                }}
              >
                {changeText}
              </Typography>
            </Button>
            <Button
              variant={fees ? 'contained' : 'outlined'}
              className={styles.buttonGroupButton}
              onClick={(e) => {
                enableButton('fees', setFees, [
                  setProfit,
                  setProfitPerc,
                  setFeesPerc,
                ])
              }}
            >
              <Typography
                style={{
                  fontSize,
                  color: fees ? 'white' : 'black',
                  whiteSpace: 'nowrap',
                }}
              >
                {feesText}
              </Typography>
            </Button>
          </ButtonGroup>
          <ButtonGroup orientation="vertical">
            <Button
              variant={profit ? 'contained' : 'outlined'}
              className={styles.buttonGroupButton}
              onClick={(e) => {
                enableButton('profit', setProfit, [
                  setProfitPerc,
                  setFees,
                  setFeesPerc,
                ])
              }}
            >
              <Typography
                style={{ color: profit ? 'white' : 'black', fontSize }}
              >
                {profitText}
              </Typography>
            </Button>

            <Button
              variant={feesPerc ? 'contained' : 'outlined'}
              className={styles.buttonGroupButton}
              onClick={(e) => {
                enableButton('feesPerc', setFeesPerc, [
                  setProfit,
                  setProfitPerc,
                  setFees,
                ])
              }}
            >
              <Typography
                style={{
                  fontSize,
                  color: feesPerc ? 'white' : 'black',
                  whiteSpace: 'nowrap',
                }}
              >
                {feesPercText}
              </Typography>
            </Button>
          </ButtonGroup>
        </div>
      ) : (
        <ButtonGroup>
          <Button
            onClick={(e) => {
              enableButton('profitPerc', setProfitPerc, [
                setProfit,
                setFees,
                setFeesPerc,
              ])
            }}
            className={styles.buttonGroupButton}
            variant={profitPerc ? 'contained' : 'outlined'}
          >
            <Typography
              style={{
                color: profitPerc ? 'white' : 'black',
                fontSize,
              }}
            >
              {changeText}
            </Typography>
          </Button>
          <Button
            variant={profit ? 'contained' : 'outlined'}
            className={styles.buttonGroupButton}
            onClick={(e) => {
              enableButton('profit', setProfit, [
                setProfitPerc,
                setFees,
                setFeesPerc,
              ])
            }}
          >
            <Typography style={{ color: profit ? 'white' : 'black', fontSize }}>
              {profitText}
            </Typography>
          </Button>

          <Button
            variant={fees ? 'contained' : 'outlined'}
            className={styles.buttonGroupButton}
            onClick={(e) => {
              enableButton('fees', setFees, [
                setProfit,
                setProfitPerc,
                setFeesPerc,
              ])
            }}
          >
            <Typography
              style={{
                fontSize,
                color: fees ? 'white' : 'black',
                whiteSpace: 'nowrap',
              }}
            >
              {feesText}
            </Typography>
          </Button>
          <Button
            variant={feesPerc ? 'contained' : 'outlined'}
            className={styles.buttonGroupButton}
            onClick={(e) => {
              enableButton('feesPerc', setFeesPerc, [
                setProfit,
                setProfitPerc,
                setFees,
              ])
            }}
          >
            <Typography
              style={{
                fontSize,
                color: feesPerc ? 'white' : 'black',
                whiteSpace: 'nowrap',
              }}
            >
              {feesPercText}
            </Typography>
          </Button>
        </ButtonGroup>
      )}
    </div>
  )
}

export default SlidersGrid
