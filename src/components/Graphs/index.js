import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
} from 'recharts'
import { months } from '../../constants/returns'
import { getPlusAtBeginningOfValue } from '../../utils/returns'
import { GetMediaQuery } from '../../hooks'

export const GraphOnToolTip = (priceArray, T1Change, T2Change, capital) => {
  let data = []
  const halfOfCapital = 100 / 2
  const T1DailyRet = Math.pow(T1Change + 1, 1 / priceArray.length)
  const T2DailyRet = Math.pow(T2Change + 1, 1 / priceArray.length)
  let valueOf5050 = 100
  let valueOf100T1 = 100
  let valueOf100T2 = 100
  let halfForT1 = halfOfCapital
  let halfForT2 = halfOfCapital
  let min = Infinity
  let max = -Infinity
  let interval = Math.ceil(priceArray.length / 8)
  const dateNow = new Date()
  const dateNowInMs = dateNow.getTime()
  const targetInMs = dateNowInMs + priceArray.length * 86400000
  const incrementTwo = (targetInMs - dateNowInMs) / priceArray.length
  let year = dateNow.getUTCFullYear()

  const breakpoints = [1050, 1000, 950, 900, 850, 800]
  let width = 700
  let height = 250
  let strokeWidth = 1.2

  breakpoints.forEach((px) => {
    if (GetMediaQuery(px)) {
      width -= 41
      height = Math.floor(width * 0.357)
      strokeWidth -= 0.25
    }
  })

  for (let i = 0; i < priceArray.length; i++) {
    let tick = {}
    halfForT1 = halfForT1 * T1DailyRet
    halfForT2 = halfForT2 * T2DailyRet
    valueOf5050 = halfForT1 + halfForT2
    valueOf100T1 = valueOf100T1 * T1DailyRet
    valueOf100T2 = valueOf100T2 * T2DailyRet
    min = Math.min(
      valueOf5050,
      (priceArray[i] / capital) * 100,
      valueOf100T1,
      valueOf100T2,
      min
    )
    max = Math.max(
      valueOf5050,
      (priceArray[i] / capital) * 100,
      valueOf100T1,
      valueOf100T2,
      max
    )

    tick['valueOfLP'] = (priceArray[i] / capital) * 100
    tick['valueOf5050'] = valueOf5050
    tick['valueOf100T1'] = valueOf100T1
    tick['valueOf100T2'] = valueOf100T2

    let currYear = ''
    const helper = new Date(dateNowInMs + incrementTwo * i)
    if (helper.getUTCFullYear() > year) {
      let nextYear = helper.getUTCFullYear()
      currYear = ' ' + nextYear
    }
    const day = String(helper.getUTCDate())
    const month = months[helper.getUTCMonth()]
    tick['x'] = day + ' ' + month + currYear
    data.push(tick)
  }

  const leftYAxisFormatter = (number) => {
    return getPlusAtBeginningOfValue(number - 100, 0) + '%'
  }

  return (
    <div>
      {data.length > 1 ? (
        <ComposedChart width={width} height={height} data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="blue" stopOpacity={0.8} />
              <stop offset="99%" stopColor="#8096e0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="x" fontSize={11} interval={interval} />
          <YAxis
            yAxisId="left"
            orientation="left"
            tickFormatter={leftYAxisFormatter}
            stroke="grey"
            fontSize={12}
            domain={[min * 0.99, max * 1.01]}
          />
          <Area
            strokeWidth={strokeWidth}
            type="monotone"
            yAxisId="left"
            dataKey="valueOfLP"
            name="Value of LP"
            stroke="#334be8"
            fillOpacity={0.5}
            fill="url(#colorUv)"
          ></Area>
          <Line
            type="monotone"
            yAxisId="left"
            dataKey="valueOf5050"
            stroke="#000000"
            name="50% 50%"
            dot={false}
            strokeWidth={strokeWidth}
          />

          <Line
            type="monotone"
            yAxisId="left"
            dataKey="valueOf100T1"
            stroke="red"
            name="100% T1"
            dot={false}
            strokeWidth={strokeWidth}
          />

          <Line
            type="monotone"
            yAxisId="left"
            dataKey="valueOf100T2"
            stroke="green"
            name="100% T2"
            dot={false}
            strokeWidth={strokeWidth}
          />
          <Legend />

          <Tooltip formatter={leftYAxisFormatter} />
        </ComposedChart>
      ) : (
        'Only one data point available. Look for a date further away.'
      )}
    </div>
  )
}

export default GraphOnToolTip
