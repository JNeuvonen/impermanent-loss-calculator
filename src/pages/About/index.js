import { Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import style from '../../css/app.module.css'

const About = () => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <div className={style.about}>
      <div>
        <Typography
          variant="h5"
          gutterBottom
          style={{ position: 'relative', left: '1vh' }}
        >
          About Impermanent Loss Visualizer
        </Typography>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          className={style.accordionWidth}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              What it is about?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Impermanent Loss Visualizer is an educational tool made for DeFi
              traders and Liquidity providers. It simulates the growth of a
              liquidity pair with a given set of assumptions.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          className={style.accordionWidth}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            style={{ whiteSpace: 'nowrap' }}
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              What are the calculators shortcomings?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              "Garbage in, garbage out". With a perfect clairvoyance to the
              future APY of any given liquidity pair it would not be a hard task
              to estimate performance of that liquidity pair. We of course don't
              have that clairvoyance, so we have to make assumptions. The
              accuracy of the output is dependant on the accuracy of the inputs.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default About
