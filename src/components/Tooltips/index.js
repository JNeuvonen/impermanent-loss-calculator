import { Typography } from '@mui/material'
import {
  getDecimals,
  getGreenOrRedColor,
  getPlusAtBeginningOfValue,
} from '../../utils/returns'

const ImpLossTabToolTip = (
  capital,
  change,
  T1T2Change,
  T1Change,
  T2Change,
  startMonth,
  startDay,
  endMonth,
  endDay,
  T1AtStart,
  T2AtStart,
  T1PriceAtStart,
  T2PriceAtStart,
  endValue,
  reverse,
  priceArray
) => {
  let fontSize = 12.5

  const T1PriceAtEnd = (T1Change + 1) * T1PriceAtStart
  const T2PriceAtEnd = (T2Change + 1) * T2PriceAtStart
  const T1PriceChange = (T1PriceAtEnd / T1PriceAtStart) * 100
  const T2PriceChange = (T2PriceAtEnd / T2PriceAtStart) * 100
  const capitalAtEnd = capital * (endValue / 100 + 1)
  const T1HeldAtEnd = capitalAtEnd / 2 / T1PriceAtEnd
  const T2HeldAtEnd = capitalAtEnd / 2 / T2PriceAtEnd

  const getTokenEndPrice = (type) => {
    let endPrice = type === 'T1' ? T1PriceChange - 100 : T2PriceChange - 100
    const color = getGreenOrRedColor(endPrice, 0, 'black')
    endPrice = getPlusAtBeginningOfValue(endPrice, 0)

    return (
      <Typography
        style={{ fontSize: fontSize, color: color, fontWeight: 'bold' }}
      >
        {endPrice}%
      </Typography>
    )
  }

  const getCapitalAtEnd = () => {
    const color = getGreenOrRedColor(capitalAtEnd, capital, 'black')
    const decimals = getDecimals(capitalAtEnd)
    return (
      <Typography
        style={{ fontSize: fontSize, color: color, fontWeight: 'bold' }}
      >
        {capitalAtEnd.toFixed(decimals)}$
      </Typography>
    )
  }

  const getTokensOwnedAtEnd = (type) => {
    const tokensAtEnd = type === 'T1' ? T1HeldAtEnd : T2HeldAtEnd
    const tokensAtStart = type === 'T1' ? T1AtStart : T2AtStart
    const color = getGreenOrRedColor(tokensAtEnd, tokensAtStart, 'black')
    const decimals = getDecimals(tokensAtEnd)
    const retIsNan = isNaN(tokensAtEnd)
    if (retIsNan) {
      return <Typography>💩</Typography>
    }
    return (
      <Typography style={{ fontSize: fontSize, fontWeight: 'bold', color }}>
        {tokensAtEnd.toFixed(decimals)}
      </Typography>
    )
  }

  const getChangeInTokensHeld = (type) => {
    const tokensAtEnd = type === 'T1' ? T1HeldAtEnd : T2HeldAtEnd

    const tokensAtStart = type === 'T1' ? T1AtStart : T2AtStart

    let ret = (tokensAtEnd / tokensAtStart - 1) * 100

    let color = getGreenOrRedColor(ret, 0, 'black')
    const retIsNan = isNaN(ret)
    ret = getPlusAtBeginningOfValue(ret, 0) + '%'

    if (retIsNan) {
      ret = Infinity
      color = 'green'
    }

    return (
      <Typography style={{ fontSize: fontSize, fontWeight: 'bold', color }}>
        {ret}
      </Typography>
    )
  }

  const getPerfVs5050 = () => {
    //console.log(T1AtStart, T2AtStart, T1PriceAtEnd, T2PriceAtEnd, capital)
    let perfOf5050 =
      ((T1AtStart * T1PriceAtEnd + T2AtStart * T2PriceAtEnd) / capital) * 100 -
      100

    let ret = endValue - perfOf5050

    const color = getGreenOrRedColor(ret, 0, 'black')

    ret = getPlusAtBeginningOfValue(ret, 0)

    return (
      <Typography style={{ fontSize: fontSize, fontWeight: 'bold', color }}>
        {ret}%
      </Typography>
    )
  }

  const getPerfVs100 = (amountAtStart, priceAtEnd) => {
    let perfOf100 = ((amountAtStart * priceAtEnd * 2) / capital) * 100 - 100
    let ret = endValue - perfOf100
    const color = getGreenOrRedColor(ret, 0, 'black')
    ret = getPlusAtBeginningOfValue(ret, 0)
    const retIsNan = isNaN(ret)

    if (retIsNan) {
      return (
        <Typography style={{ fontSize: fontSize, fontWeight: 'bold', color }}>
          0
        </Typography>
      )
    }
    return (
      <Typography style={{ fontSize: fontSize, fontWeight: 'bold', color }}>
        {ret}%
      </Typography>
    )
  }

  const headers1 = [
    'Capital',
    '% T1 Change',
    '% T2 Change',
    'T1 Owned',
    'T2 Owned',
  ]

  const headers2 = [
    '% T1 Owned',
    '% T2 Owned',
    'Vs 50/50',
    'Vs 100% T1',
    'Vs 100% T2',
  ]

  return (
    <div style={{ width: '100%', minHeight: '100%' }}>
      <div
        style={{
          width: '100%',
        }}
      >
        <table cellSpacing={15}>
          <thead>
            <tr>
              {headers1.map((item) => {
                return (
                  <th key={item}>
                    <Typography fontSize={fontSize}>{item}</Typography>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{getCapitalAtEnd()}</td>
              <td>{getTokenEndPrice('T1')}</td>
              <td>{getTokenEndPrice('T2')}</td>
              <td>{getTokensOwnedAtEnd('T1')}</td>
              <td>{getTokensOwnedAtEnd('T2')}</td>
            </tr>
          </tbody>
        </table>
        <table cellSpacing={15}>
          <thead>
            <tr>
              {headers2.map((item) => {
                return (
                  <th key={item}>
                    <Typography fontSize={fontSize}>{item}</Typography>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{getChangeInTokensHeld('T1')}</td>
              <td>{getChangeInTokensHeld('T2')}</td>
              <td>{getPerfVs5050()}</td>
              <td>{getPerfVs100(T1AtStart, T1PriceAtEnd)}</td>
              <td>{getPerfVs100(T2AtStart, T2PriceAtEnd)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ImpLossTabToolTip
