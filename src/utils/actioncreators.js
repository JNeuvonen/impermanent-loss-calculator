import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../state'

const StateManagement = () => {
  const dispatch = useDispatch()
  const {
    updateDaysOut,
    updateRange,
    updateToken1Weight,
    updateToken2Weight,
    updateToken1Price,
    updateToken2Price,
    updateApy,
    updateCapital,
    updatePoolLiquidity,
    updateAvgVolume,
    updatePoolSpreadPerc,
    updateMainformValues,
    updateTableValue,
    updateApyDecrease,
  } = bindActionCreators(actionCreators, dispatch)

  return {
    updateDaysOut,
    updateRange,
    updateToken1Weight,
    updateToken2Weight,
    updateToken1Price,
    updateToken2Price,
    updateApy,
    updateCapital,
    updatePoolLiquidity,
    updateAvgVolume,
    updatePoolSpreadPerc,
    updateMainformValues,
    updateTableValue,
    updateApyDecrease,
  }
}

export default StateManagement
