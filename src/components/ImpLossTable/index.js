import { Typography, Input } from '@mui/material'
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
  getPlusAtBeginningOfValue,
} from '../../utils/returns'
import { makeStyles } from '@mui/styles'
import GraphDialog from '../Dialog/index.js'
import styles from '../../css/app.module.css'
import { GetMediaQuery } from '../../hooks'
import { StyledTd, StyledTr } from '../../theme/index'

const ImpLossTable = () => {
  let daysOut = useSelector((state) => state.daysOut)
  const token1Price = useSelector((state) => state.token1Price)
  const token2Price = useSelector((state) => state.token2Price)
  const token1Weight = useSelector((state) => state.token1Weight)
  const token2Weight = useSelector((state) => state.token2Weight)
  const tableValue = useSelector((state) => state.tableValue)
  const apyDecrease = useSelector((state) => state.apyDecrease)
  const capital = useSelector((state) => state.capital)
  const apy = useSelector((state) => state.apy)

  const [t1Change, setT1Change] = useState()
  const [t2Change, setT2Change] = useState()
  const [t1ForDialog, setT1ForDialog] = useState(null)
  const [t2ForDialog, setT2ForDialog] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [priceArray, setPriceArray] = useState([])

  let reversedPrice = false
  if ((!t1Change && t2Change) || t2Change > t1Change) {
    reversedPrice = true
  }

  let tokens1AtStart = null
  let tokens2AtStart = null
  let t1ChangeHelper = t1Change || t1Change === 0 ? t1Change : 150
  let t2ChangeHelper = t2Change || t2Change === 0 ? t2Change : 30
  t1ChangeHelper = t1ChangeHelper < -100 ? -100 : t1ChangeHelper
  t2ChangeHelper = t2ChangeHelper < -100 ? -100 : t2ChangeHelper

  let columns = 18

  const mediaQueries = [
    1050, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450,
  ]

  const below1050 = GetMediaQuery(1050)
  let toolTipsOn = true

  if (below1050) {
    toolTipsOn = false
  }

  mediaQueries.forEach((px) => {
    if (GetMediaQuery(px)) {
      columns -= 1
    }
  })

  const headers = getHeadersForImpLossTable(daysOut, columns)
  const cells = getPriceChangesForRange(t1ChangeHelper, t2ChangeHelper)

  const useStyles = makeStyles((theme) => ({
    tableRow: {
      '&:hover': {
        backgroundImage: 'linear-gradient(315deg, #af8c9d 0%, #adadad 50%);',
      },
    },
  }))

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const LightTooltip = styled(({ className, ...props }) => (
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

  let daysIncrement = daysOut / (headers.monthsFmt.length - 1)

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

  const classes = useStyles()

  return (
    <div>
      <table
        aria-label="a dense table"
        className={styles.impermanentLossTable}
        cellSpacing={0}
      >
        <thead>
          <tr>
            <th
              align="center"
              style={{ whiteSpace: 'nowrap', background: 'white' }}
            >
              Δ T1
            </th>
            <th
              align="center"
              style={{ whiteSpace: 'nowrap', background: 'white' }}
            >
              Δ T2
            </th>
            <th
              align="center"
              style={{ background: 'white', whiteSpace: 'none' }}
            >
              {reversedPrice ? 'T2/T1' : 'T1/T2'}
            </th>

            {headers['monthsFmt'].map((item, index) => {
              return (
                <th
                  align="center"
                  id={`header-${index}`}
                  key={index}
                  className={classes.tableCell}
                  style={{
                    backgroundColor: '#a3a3a3',
                    borderBottom: '1.3px solid black',
                  }}
                >
                  <Typography fontSize={12.5}>{item}</Typography>
                </th>
              )
            })}
          </tr>
        </thead>
        <thead>
          <tr style={{ background: 'white' }}>
            <th style={{ width: '1vw' }}>
              <Input
                name="t1input"
                label="Standard"
                placeholder="±150%"
                onChange={(e) => {
                  e.preventDefault()
                  setT1Change(Number(e.target.value))
                }}
                variant="standard"
              />
            </th>
            <th style={{ width: '1vw' }}>
              <Input
                name="t2input"
                label="Standard"
                placeholder="±30%"
                onChange={(e) => {
                  e.preventDefault()
                  setT2Change(Number(e.target.value))
                }}
                variant="standard"
              />
            </th>
            <th
              align="center"
              style={{
                backgroundColor: 'white',
                border: 'none',
              }}
            >
              {'🤑'}
            </th>
            {headers['daysFmt'].map((item, index) => {
              return (
                <th
                  key={index}
                  align="center"
                  style={{
                    backgroundColor: '#f0f0f0',
                    borderBottom: '1.3px solid #a3a3a3',
                  }}
                >
                  <Typography>{item}</Typography>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {cells.map((item_1, i) => {
            let colorT1 =
              item_1.T1 === 0 ? 'black' : item_1.T1 > 0 ? 'green' : 'red'

            let colorT2 =
              item_1.T2 === 0 ? 'black' : item_1.T2 > 0 ? 'green' : 'red'

            let colorT1T2 =
              item_1.T1T2 === 0 ? 'black' : item_1.T1T2 > 0 ? 'green' : 'red'

            return (
              <StyledTr key={i}>
                <td
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    color: colorT1,
                    position: 'relative',
                  }}
                >
                  {getPlusAtBeginningOfValue(item_1.T1, 0) + '%'}
                </td>
                <td
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    color: colorT2,

                    position: 'relative',
                  }}
                >
                  {getPlusAtBeginningOfValue(item_1.T2, 0) + '%'}
                </td>
                <td
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    color: colorT1T2,
                    height: '10px',
                    width: '10px',
                    position: 'relative',
                  }}
                >
                  {getPlusAtBeginningOfValue(item_1.T1T2, 0) + '%'}
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

                  let color = getColorAlgoValue(colorHelper.toFixed(0))

                  const hoverColor =
                    endValue >= 0
                      ? 'linear-gradient(315deg, #00b712 0%, #5aff15 74%);'
                      : 'linear-gradient(147deg, #990000 0%, #ff0000 74%);'

                  return toolTipsOn ? (
                    <LightTooltip
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
                        hoverColor={hoverColor}
                        onClick={(e) => {
                          e.preventDefault()
                          handleDialogOpen()
                          setPriceArray(profitForLp['priceArray'])
                          setT1ForDialog(item_1.T1 / 100)
                          setT2ForDialog(item_1.T2 / 100)
                        }}
                      >
                        <Typography style={{ fontSize: 12 }}>
                          {endValue}
                          {tableValue === 'profitPerc' ||
                          tableValue === 'feesPerc'
                            ? '%'
                            : null}
                        </Typography>
                      </StyledTd>
                    </LightTooltip>
                  ) : (
                    <StyledTd
                      align="center"
                      color={color.backgroundColor}
                      hoverColor={hoverColor}
                      onClick={(e) => {
                        e.preventDefault()
                        handleDialogOpen()
                        setPriceArray(profitForLp['priceArray'])
                        setT1ForDialog(item_1.T1 / 100)
                        setT2ForDialog(item_1.T2 / 100)
                      }}
                    >
                      <Typography style={{ fontSize: 12 }}>
                        {endValue}
                        {tableValue === 'profitPerc' ||
                        tableValue === 'feesPerc'
                          ? '%'
                          : null}
                      </Typography>
                    </StyledTd>
                  )
                })}
              </StyledTr>
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
