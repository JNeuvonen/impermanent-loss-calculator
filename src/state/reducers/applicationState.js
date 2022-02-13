const reducer = (state, action) => {
  switch (action.type) {
    case 'updateToken1Price':
      return { ...state, token1Price: action.payload }

    case 'updateToken2Price': {
      return { ...state, token2Price: action.payload }
    }

    case 'updateToken1Weight':
      return { ...state, token1Weight: action.payload }

    case 'updateToken2Weight': {
      return { ...state, token2Weight: action.payload }
    }

    case 'updateDaysOut':
      return { ...state, daysOut: action.payload }

    case 'updateStdDev':
      return { ...state, stdDev: action.payload }

    case 'updateRange':
      return { ...state, range: action.payload }

    case 'updateCapital':
      return { ...state, capital: action.payload }
    case 'updateApy':
      return { ...state, apy: action.payload }

    case 'updatePoolLiquidity': {
      return { ...state, poolLiquidity: action.payload }
    }

    case 'updateAvgVolume': {
      return { ...state, avgVolume: action.payload }
    }

    case 'updatePoolSpreadPerc': {
      return { ...state, poolSpreadPerc: action.payload }
    }

    case 'updateTableValue': {
      return { ...state, tableValue: action.payload }
    }

    case 'updateApyDecrease': {
      return { ...state, apyDecrease: action.payload }
    }

    case 'updateToken1Change': {
      return { ...state, token1Change: action.payload }
    }

    case 'updateToken2Change': {
      return { ...state, token2Change: action.payload }
    }

    case 'updateBrightness': {
      return { ...state, brightness: action.payload }
    }

    case 'updateMainformValues': {
      return {
        ...state,
        apy: action.payload.apy,
        token1Price: action.payload.t1Price,
        token2Price: action.payload.t2Price,
        token1Weight: action.payload.t1Weight,
        token2Weight: action.payload.t2Weight,
        capital: action.payload.capital,
      }
    }

    default: {
      return {
        token1Price: 3000,
        token2Price: 150,
        token1Weight: 50,
        token2Weight: 50,
        capital: 5000,
        apy: 70,
        daysOut: 365,
        stdDev: null,
        range: 150,
        poolLiquidity: null,
        avgVolume: null,
        poolSpreadPerc: null,
        tableValue: 'profitPerc',
        apyDecrease: 0,
        token1Change: 150,
        token2Change: 30,
        brightness: 'light',
      }
    }
  }
}

export default reducer
