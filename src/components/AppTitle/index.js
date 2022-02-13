import { GetMediaQuery } from '../../utils/hooks'

const Title = () => {
  const below850 = GetMediaQuery(850)
  let titleText = 'Impermanent Loss Calculator and Visualizer'

  if (below850) {
    titleText = 'Impermanent Loss Calculator'
  }

  return (
    <div className="app-title">
      <h1 variant="h5" className="app-title__title">
        {titleText}
      </h1>
    </div>
  )
}

export default Title
