import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ToolTipText from '../Tooltips/index'
import {
  getHeadersForImpLossTable,
  getCapitalAfterIL,
  getColorAlgoValue,
  getPriceChangesForRange,
  getValueToThousands,
  getDarkenedColor,
} from '../../utils/functions/returns'
import GraphDialog from '../Dialog/index.js'
import { GetMediaQuery } from '../../utils/hooks'
import { StyledTd } from '../../style/theme/index'
import '../../style/css/style.css'

const ImpLossTable = () => {
  //State
  let daysOut = useSelector((state) => state.daysOut)
  const token1Price = useSelector((state) => state.token1Price)
  const token2Price = useSelector((state) => state.token2Price)
  const token1Weight = useSelector((state) => state.token1Weight)
  const token2Weight = useSelector((state) => state.token2Weight)
  const tableValue = useSelector((state) => state.tableValue)
  const apyDecrease = useSelector((state) => state.apyDecrease)
  const capital = useSelector((state) => state.capital)
  const apy = useSelector((state) => state.apy)
  const t1Change = useSelector((state) => state.token1Change)
  const t2Change = useSelector((state) => state.token2Change)
  const brightness = useSelector((state) => state.brightness)

  //Hooks
  const [t1ForDialog, setT1ForDialog] = useState(null)
  const [t2ForDialog, setT2ForDialog] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [priceArray, setPriceArray] = useState([])

  //Reverse T1/T2 column if T2 > T1
  let reversedPrice = false
  if ((!t1Change && t2Change) || t2Change > t1Change) {
    reversedPrice = true
  }

  //Vars
  let tokens1AtStart = null
  let tokens2AtStart = null
  let t1ChangeHelper = t1Change || t1Change === 0 ? t1Change : 150
  let t2ChangeHelper = t2Change || t2Change === 0 ? t2Change : 30
  t1ChangeHelper = t1ChangeHelper < -100 ? -100 : t1ChangeHelper
  t2ChangeHelper = t2ChangeHelper < -100 ? -100 : t2ChangeHelper

  //Columns for table
  let columns = 17

  const mediaQueries = [
    1050, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350,
  ]

  //Disable tooltips on mobile devices
  const below1050 = GetMediaQuery(1050)
  let toolTipsOn = true
  if (below1050) {
    toolTipsOn = false
  }

  //Reduce table columns based on viewport width
  mediaQueries.forEach((px) => {
    if (GetMediaQuery(px)) {
      columns -= 1
    }
  })

  //Headers for table
  const headers = getHeadersForImpLossTable(daysOut, columns)

  //Cells for table based on T1 and T2 price change
  const cells = getPriceChangesForRange(t1ChangeHelper, t2ChangeHelper)

  const handleDialogOpen = (j) => {
    if (brightness === 'dark') {
      document.getElementById(`header-month-${j}`).style.backgroundColor =
        '#425A72'
      document.getElementById(`header-day-${j}`).style.backgroundColor =
        '#425A72'
    }
    if (brightness === 'light') {
      document.getElementById(`header-month-${j}`).style.backgroundColor =
        '#9E9E9E'
      document.getElementById(`header-day-${j}`).style.backgroundColor =
        '#9E9E9E'
    }

    setDialogOpen(true)
  }

  //MUI styles
  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,

      maxWidth: '70rem',
      maxHeight: '35rem',
    },
  }))

  //Get token count at start
  if (
    token1Price &&
    token2Price &&
    token2Weight &&
    token1Weight &&
    capital &&
    apy
  ) {
    tokens1AtStart = (capital * (token1Weight / 100)) / token1Price
    tokens2AtStart = (capital * (token2Weight / 100)) / token2Price
  }

  //Var for table
  let daysIncrement = daysOut / (headers.monthsFmt.length - 1)

  return (
    <div className="table-div">
      <table cellSpacing={0} className="il-table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>

            {headers['monthsFmt'].map((item, index) => {
              return (
                <th
                  align="center"
                  id={`header-month-${index}`}
                  key={index}
                  className="il-table__date-th"
                >
                  <p>{item}</p>
                </th>
              )
            })}
          </tr>
        </thead>
        <thead>
          <tr>
            <th align="center" className="il-table__th">
              Δ T1
            </th>
            <th align="center" className="il-table__th">
              Δ T2
            </th>
            <th align="center" className="il-table__th">
              {reversedPrice ? 'T2/T1' : 'T1/T2'}
            </th>
            {headers['daysFmt'].map((item, index) => {
              return (
                <th
                  key={index}
                  align="center"
                  className="il-table__date-th"
                  id={`header-day-${index}`}
                >
                  <p>{item}</p>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {cells.map((item_1, i) => {
            return (
              <tr key={i} className="il-table__tr">
                <td align="center" className="il-table__td side-header">
                  {item_1.T1.toFixed(0) + '%'}
                </td>
                <td align="center" className="il-table__td side-header">
                  {item_1.T2.toFixed(0) + '%'}
                </td>
                <td align="center" className="il-table__td side-header">
                  {item_1.T1T2.toFixed(0) + '%'}
                </td>

                {headers['daysFmt'].map((item_2, j) => {
                  const cellPercChange = item_1.T1T2 / 100

                  let cellPercChangeHelper = 1
                  if (cellPercChange > 0) {
                    cellPercChangeHelper = cellPercChange + 1
                  }
                  if (cellPercChange < 0) {
                    cellPercChangeHelper = 1 - Math.abs(cellPercChange)
                  }

                  const daysToTarget = j * daysIncrement

                  const profitForLp = getCapitalAfterIL(
                    capital,
                    cellPercChangeHelper,
                    daysToTarget,
                    apy,
                    item_1.T1 / 100,
                    item_1.T2 / 100,
                    tokens1AtStart,
                    tokens2AtStart,
                    token1Price,
                    token2Price,
                    apyDecrease
                  )
                  let endValue = null
                  let colorHelper =
                    item_1.T1T2 <= -99 ? -100 : profitForLp['profitPerc']
                  if (tableValue === 'profitPerc') {
                    endValue =
                      item_1.T1T2 <= -99
                        ? -100
                        : profitForLp['profitPerc'].toFixed(0)
                  } else if (tableValue === 'profit') {
                    endValue = profitForLp['profit'].toFixed(0)
                  } else if (tableValue === 'fees') {
                    endValue = profitForLp['fees'].toFixed(0)
                  } else if (tableValue === 'feesPerc') {
                    endValue = profitForLp['feesPerc'].toFixed()
                  } else if (tableValue === 'accruedTokens') {
                    endValue =
                      profitForLp['t1Accruals'].toFixed(1) +
                      '/' +
                      profitForLp['t2Accruals'].toFixed(1)
                    if (item_1.T1T2 === Infinity) {
                      if (item_1.T1 === -100) {
                        endValue = 'Inf/0'
                      }

                      if (item_1.T2 === -100) {
                        endValue = '0/Inf'
                      }
                    }

                    if (item_1.T1T2 === -100) {
                      if (item_1.T1 <= -99.5) {
                        endValue = 'Inf/0'
                      }

                      if (item_1.T2 < 0 - 99.5) {
                        endValue = '0/Inf'
                      }
                    }
                  }

                  //Get cell background color based on cellvalue
                  let color = getColorAlgoValue(colorHelper.toFixed(0))
                  let darkenedColor = getDarkenedColor(color)
                  const hoverColor =
                    endValue >= 0
                      ? 'linear-gradient(315deg, #00b712 0%, #5aff15 74%);'
                      : 'linear-gradient(147deg, #990000 0%, #ff0000 74%);'

                  return toolTipsOn ? (
                    <StyledTooltip
                      key={j}
                      title={ToolTipText(
                        capital,
                        cellPercChangeHelper,
                        item_1.T1T2 / 100,
                        item_1.T1 / 100,
                        item_1.T2 / 100,
                        headers['monthsFmt'][0],
                        headers['daysFmt'][0],
                        headers['monthsFmt'][j],
                        headers['daysFmt'][j],
                        tokens1AtStart,
                        tokens2AtStart,
                        token1Price,
                        token2Price,
                        profitForLp['profitPerc'],
                        reversedPrice,
                        profitForLp['priceArray']
                      )}
                    >
                      <StyledTd
                        align="center"
                        color={color.backgroundColor}
                        hoverColor={darkenedColor}
                        onMouseEnter={() => {
                          if (brightness === 'light') {
                            document.getElementById(
                              `header-month-${j}`
                            ).style.backgroundColor = `#d1d1d1`
                            document.getElementById(
                              `header-day-${j}`
                            ).style.backgroundColor = `#d1d1d1`
                          }

                          if (brightness === 'dark') {
                            document.getElementById(
                              `header-day-${j}`
                            ).style.backgroundColor = '#0A0E12'
                            document.getElementById(
                              `header-month-${j}`
                            ).style.backgroundColor = '#0A0E12'
                          }
                        }}
                        onMouseLeave={() => {
                          if (brightness === 'light') {
                            document.getElementById(
                              `header-month-${j}`
                            ).style.backgroundColor = '#9E9E9E'
                            document.getElementById(
                              `header-day-${j}`
                            ).style.backgroundColor = '#9E9E9E'
                          }

                          if (brightness === 'dark') {
                            document.getElementById(
                              `header-month-${j}`
                            ).style.backgroundColor = '#425A72'
                            document.getElementById(
                              `header-day-${j}`
                            ).style.backgroundColor = '#425A72'
                          }
                        }}
                        onClick={(e) => {
                          e.preventDefault()
                          handleDialogOpen(j)

                          setPriceArray(profitForLp['priceArray'])
                          setT1ForDialog(item_1.T1 / 100)
                          setT2ForDialog(item_1.T2 / 100)
                        }}
                      >
                        <p className="il-table__td">
                          {tableValue === 'profit' || tableValue === 'fees'
                            ? getValueToThousands(endValue)
                            : endValue}
                          {tableValue === 'profitPerc' ||
                          tableValue === 'feesPerc'
                            ? '%'
                            : null}
                        </p>
                      </StyledTd>
                    </StyledTooltip>
                  ) : (
                    <StyledTd
                      align="center"
                      color={color.backgroundColor}
                      hoverColor={hoverColor}
                      key={j}
                      onClick={(e) => {
                        e.preventDefault()
                        handleDialogOpen()
                        setPriceArray(profitForLp['priceArray'])
                        setT1ForDialog(item_1.T1 / 100)
                        setT2ForDialog(item_1.T2 / 100)
                      }}
                    >
                      <p className="il-table__td">
                        {tableValue === 'profit' || tableValue === 'fees'
                          ? getValueToThousands(endValue)
                          : endValue}
                        {tableValue === 'profitPerc' ||
                        tableValue === 'feesPerc'
                          ? '%'
                          : null}
                      </p>
                    </StyledTd>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {dialogOpen ? (
        <GraphDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          priceArray={priceArray}
          T1Change={t1ForDialog}
          T2Change={t2ForDialog}
          capital={capital}
        />
      ) : null}
    </div>
  )
}

export default ImpLossTable
