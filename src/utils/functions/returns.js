import { months } from '../constants/returns'

export function getHeadersForImpLossTable(days, columns) {
  const currTs = new Date().getTime()
  const targetTs = currTs + days * 86400000
  const startFormatted = new Date(currTs)
  const startYear = startFormatted.getUTCFullYear()

  const msIncrement = (targetTs - currTs) / columns
  let prevYear = startYear
  let daysFmt = []
  let monthsFmt = []
  let timeStamps = []

  for (let i = currTs; i <= targetTs; i += msIncrement) {
    const helper = new Date(i)
    let newYear = ''
    if (helper.getUTCFullYear() > prevYear) {
      prevYear = helper.getUTCFullYear()
      newYear = String(prevYear).substring(2, 4)
    }
    const day = String(helper.getUTCDate())
    const month = months[helper.getUTCMonth()]
    timeStamps.push(i)
    const dateFmt = month + ' ' + newYear
    daysFmt.push(day)
    monthsFmt.push(dateFmt)
  }

  return { daysFmt, monthsFmt, timeStamps }
}

export function getPriceChangesForRange(T1Range, T2Range) {
  let reverse = false
  if (T2Range > T1Range) {
    let helper = T1Range
    T1Range = T2Range
    T2Range = helper
    reverse = true
  }
  const T1Bottom = Math.min(100, T1Range)
  const T2Bottom = Math.min(100, T2Range)
  const T1Distance = T1Range + T1Bottom
  const T2Distance = T2Range + T2Bottom
  const T1Increment = T1Distance / 23
  const T2Increment = T2Distance / 23
  let T1Val = T1Range
  let T2Val = T2Range
  let T1ValHelper = (T1Range + 100) / 100
  let T2ValHelper = (T2Range + 100) / 100
  let T1Price = 1000
  let T2Price = 1000

  let priceChanges = []

  for (let i = 0; i <= 23; i++) {
    let T1T2Val = ((T1ValHelper * T1Price) / (T2Price * T2ValHelper) - 1) * 100
    let tick = {}
    if (T1T2Val < -99.95) {
      T1T2Val = -100
    }
    tick['T1T2'] = T1T2Val
    if (reverse) {
      tick['T2'] = T1Val
      tick['T1'] = T2Val
    } else {
      tick['T1'] = T1Val
      tick['T2'] = T2Val
    }
    T1Val -= T1Increment
    T2Val -= T2Increment
    T1ValHelper -= T1Increment / 100
    T2ValHelper -= T2Increment / 100

    priceChanges.push(tick)
  }

  return priceChanges
}

export function getImpermanentLoss(k) {
  return (2 * Math.sqrt(k)) / (1 + k) - 1
}

export function getPercProfitForLP(change, t1Change, t2Change) {
  let il = getImpermanentLoss(change)
  t1Change++
  t2Change++

  return (
    -50 * Math.abs(il) * (t1Change + t2Change) +
    50 * t1Change +
    50 * t2Change -
    100
  )
}

export function getColorAlgoValue(cellValue) {
  const redIncrementPos = (255 - 36) / 300
  const greenIncrementPos = (255 - 150) / 300
  const blueIncrementPos = (255 - 2) / 300
  const redIncrementNeg = (255 - 216) / 100
  const greenIncrementNeg = 255 / 100
  const blueIncrementNeg = (255 - 45) / 100

  if (cellValue >= 0) {
    if (cellValue >= 300) {
      cellValue = 300
    }
    return {
      backgroundColor: `rgb(${Math.floor(
        255 - cellValue * redIncrementPos
      )}, ${Math.floor(255 - cellValue * greenIncrementPos)}, ${Math.floor(
        255 - cellValue * blueIncrementPos
      )})`,
    }
  }

  cellValue = Math.abs(cellValue)
  if (cellValue === 100) {
    return { backgroundColor: 'rgb(204, 39, 39)' }
  }

  return {
    backgroundColor: `rgb(${Math.floor(
      255 - cellValue * redIncrementNeg
    )}, ${Math.floor(255 - cellValue * greenIncrementNeg)}, ${Math.floor(
      255 - cellValue * blueIncrementNeg
    )})`,
  }
}

export function getCapitalAfterIL(
  startCapital,
  change,
  days,
  apy,
  t1Change,
  t2Change,
  t1OwnedAtStart,
  t2OwnedAtStart,
  t1PriceAtStart,
  t2PriceAtStart,
  apyDecrease
) {
  if (days === 0) {
    days = 1
  }

  const gain = (getPercProfitForLP(change, t1Change, t2Change) + 100) / 100
  const targetCapital = gain * startCapital
  const increment = (targetCapital - startCapital) / days
  t1Change = t1Change >= 0 ? t1Change + 1 : 1 - Math.abs(t1Change)
  t2Change = t2Change >= 0 ? t2Change + 1 : 1 - Math.abs(t2Change)
  t1Change = t1Change === 0 ? 1 : t1Change
  t2Change = t2Change === 0 ? 1 : t2Change
  const t1PriceIncrement = Math.pow(t1Change, 1 / days)
  const t2PriceIncrement = Math.pow(t2Change, 1 / days)

  let t1Price = t1PriceAtStart
  let t2Price = t2PriceAtStart
  let t1Accruals = 0
  let t2Accruals = 0
  let currCapital = startCapital
  let priceArray = []
  let avgDailyRet = Math.pow(apy / 100 + 1, 1 / 365)
  const apyDecrement = Math.pow(1 - apyDecrease / 100, 1 / 365)

  let fees = startCapital

  if (change === 0) {
    return {
      profitPerc: -100,
      priceArray,
      profit: -startCapital,
      fees: 0,
      feesPerc: 0,
      t1Accruals: 0,
      t2Accruals: 0,
    }
  }

  if (days === 1) {
    currCapital += increment
    currCapital = isNaN(currCapital) ? 0 : currCapital
    priceArray.push(currCapital)
    return {
      profitPerc: (currCapital / startCapital - 1) * 100,
      priceArray,
      profit: currCapital - startCapital,
      fees: 0,
      feesPerc: 0,
      t1Accruals: 0,
      t2Accruals: 0,
    }
  }

  if (t1Change <= -0.99 && t2Change <= -0.99) {
    for (let i = 0; i < days; i++) {
      priceArray.push(0)
    }
    return {
      profitPerc: (0 / startCapital - 1) * 100,
      priceArray,
      profit: -startCapital,
      fees: 0,
      feesPerc: 0,
      t1Accruals: 0,
      t2Accruals: 0,
    }
  }

  for (let i = 0; i < days; i++) {
    currCapital += increment
    t1Price *= t1PriceIncrement
    t2Price *= t2PriceIncrement

    const helper = currCapital
    const feesHelper = currCapital
    const t1BeforeCompound = currCapital / 2 / t1Price
    const t2BeforeCompound = currCapital / 2 / t2Price
    currCapital *= avgDailyRet
    const t1AfterCompound = t1BeforeCompound * avgDailyRet
    const t2AfterCompound = t2BeforeCompound * avgDailyRet
    let avgDailyRetHelper = avgDailyRet - 1
    avgDailyRetHelper = avgDailyRetHelper * apyDecrement
    avgDailyRet = 1 + avgDailyRetHelper

    t1Accruals += t1AfterCompound - t1BeforeCompound
    t2Accruals += t2AfterCompound - t2BeforeCompound
    const compound = currCapital - feesHelper
    fees += compound
    let il = Math.abs(getImpermanentLoss(currCapital / helper))
    currCapital -= currCapital * il
    currCapital = isNaN(currCapital) ? 0 : currCapital
    priceArray.push(currCapital)
  }

  const profit = currCapital - startCapital
  const profitPerc = (currCapital / startCapital - 1) * 100
  fees = fees - startCapital
  const feesPerc = (fees / startCapital) * 100

  return {
    profitPerc,
    priceArray,
    profit,
    fees,
    feesPerc,
    t1Accruals,
    t2Accruals,
  }
}

export function getDecimals(price) {
  let decimals = 0

  if (price > 500) {
  } else if (price > 10) {
    decimals = 1
  } else if (price > 1) {
    decimals = 2
  } else {
    decimals = 3
  }

  return decimals
}

export function getGreenOrRedColor(item1, item2, defaultColor) {
  let color = defaultColor
  if (item1 > item2) {
    color = 'green'
  }

  if (item2 > item1) {
    color = 'red'
  }

  return color
}

export function getPlusAtBeginningOfValue(val, decimals) {
  let ret = val
  if (val > 0) {
    ret = '+' + String(val.toFixed(decimals))
  }
  if (val <= 0) {
    ret = String(val.toFixed(decimals))
  }
  return ret
}

export function getDarkenedColor(color) {
  let splittedRbgString = String(color['backgroundColor'].split('rgb(')[1])

  splittedRbgString = splittedRbgString.substring(
    0,
    splittedRbgString.length - 1
  )
  splittedRbgString = splittedRbgString.split(', ')

  let r = Number(splittedRbgString[0])
  let g = Number(splittedRbgString[1])
  let b = Number(splittedRbgString[2])

  r -= r * 0.5
  g -= g * 0.5
  b -= b * 0.5

  return `rgb(${r}, ${g}, ${b})`
}

export function getValueToThousands(val) {
  let ret = val

  if (Math.abs(val) >= 100000) {
    return (ret = (ret / 1000).toFixed(0) + 'k')
  }

  return (ret = (ret / 1000).toFixed(1) + 'k')
}
