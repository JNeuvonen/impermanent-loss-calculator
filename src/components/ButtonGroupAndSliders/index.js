import Slider from '../Slider'
import { Button, ButtonGroup } from '@mui/material'
import { useState } from 'react'
import StateManagement from '../../utils/actioncreators'
import { useSelector } from 'react-redux'
import { GetMediaQuery } from '../../hooks'
import '../../style/css/style.css'
const SlidersGrid = () => {
  //Dispatchers
  const {
    updateTableValue,
    updateDaysOut,
    updateApyDecrease,
    updateToken1Change,
    updateToken2Change,
  } = StateManagement()

  //State
  const daysOut = useSelector((state) => state.daysOut)
  const apyDecrease = useSelector((state) => state.apyDecrease)
  const token1Change = useSelector((state) => state.token1Change)
  const token2Change = useSelector((state) => state.token2Change)

  //Hooks
  const [profit, setProfit] = useState(false)
  const [profitPerc, setProfitPerc] = useState(true)
  const [fees, setFees] = useState(false)
  const [feesPerc, setFeesPerc] = useState(false)
  const below650 = GetMediaQuery(650)

  //Component variables
  let changeText = '% Change'
  let profitText = '$ Profit'
  let feesText = '$ Accrued fees'
  let feesPercText = '% Accrued fees'

  //Breakpoint
  if (below650) {
    changeText = '% PnL'
    profitText = '$ PnL'
    feesText = '$ Fees'
    feesPercText = '% Fees'
  }

  const enableButton = (type, enabledButton, restOfButtons) => {
    enabledButton(true)
    restOfButtons.forEach((btn) => btn(false))
    updateTableValue(type)
  }

  return (
    <div className="bottom-inputs-grid">
      <div className="bottom-inputs-grid__slider1">
        {Slider(
          -100,
          1095,
          'TOKEN 1 PRICE Δ: ±',
          '%',
          updateToken1Change,
          token1Change
        )}
      </div>
      <div className="bottom-inputs-grid__slider2">
        {Slider(
          -100,
          1095,
          'TOKEN 2 PRICE Δ: ±',
          '%',
          updateToken2Change,
          token2Change
        )}
      </div>
      <div className="bottom-inputs-grid__slider3">
        {Slider(50, 1095, 'DAYS:', null, updateDaysOut, daysOut)}
      </div>
      <div className="bottom-inputs-grid__slider4">
        {Slider(
          0,
          99,
          'REDUCE APY ANNUALLY BY: ',
          '%',
          updateApyDecrease,
          apyDecrease
        )}
      </div>
      <ButtonGroup className="bottom-inputs-grid__btn-group">
        <Button
          className="bottom-inputs-grid__btn-group__btn"
          onClick={(e) => {
            enableButton('profitPerc', setProfitPerc, [
              setProfit,
              setFees,
              setFeesPerc,
            ])
          }}
          variant={profitPerc ? 'contained' : 'outlined'}
        >
          <p className="bottom-inputs-grid__btn-group__btn__btn-text">
            {changeText}
          </p>
        </Button>
        <Button
          variant={profit ? 'contained' : 'outlined'}
          className="bottom-inputs-grid__btn-group__btn"
          onClick={(e) => {
            enableButton('profit', setProfit, [
              setProfitPerc,
              setFees,
              setFeesPerc,
            ])
          }}
        >
          <p className="bottom-inputs-grid__btn-group__btn__btn-text">
            {profitText}
          </p>
        </Button>

        <Button
          variant={fees ? 'contained' : 'outlined'}
          className="bottom-inputs-grid__btn-group__btn"
          onClick={(e) => {
            enableButton('fees', setFees, [
              setProfit,
              setProfitPerc,
              setFeesPerc,
            ])
          }}
        >
          <p className="bottom-inputs-grid__btn-group__btn__btn-text">
            {feesText}
          </p>
        </Button>
        <Button
          className="bottom-inputs-grid__btn-group__btn"
          variant={feesPerc ? 'contained' : 'outlined'}
          onClick={(e) => {
            enableButton('feesPerc', setFeesPerc, [
              setProfit,
              setProfitPerc,
              setFees,
            ])
          }}
        >
          <p className="bottom-inputs-grid__btn-group__btn__btn-text">
            {feesPercText}
          </p>
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default SlidersGrid
