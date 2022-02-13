import { Typography } from '@mui/material'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'

const About = () => {
  const brightness = useSelector((state) => state.brightness)
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  //MUI styles
  const Accordion = styled((props) => (
    <MuiAccordion
      disableGutters
      elevation={brightness === 'light' ? 12 : 24}
      square
      {...props}
    />
  ))(({ theme }) => ({
    border: brightness === 'light' ? 'none' : `1px solid black`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    backgroundColor: brightness === 'light' ? 'none' : '#2b3a4a',
    '&:before': {
      display: 'none',
    },
  }))

  //MUI styles
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props} />
  ))(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }))

  //MUI styles
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    fontWeight: 'bold',
  }))

  return (
    <div className="about">
      <h1 className="about__h1">About Impermanent Loss Calculator</h1>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <p className="about__summary">What it is about?</p>
        </AccordionSummary>
        <AccordionDetails>
          <p className="about__details">
            Impermanent Loss Visualizer is an educational tool made for DeFi
            traders and Liquidity providers. It simulates the growth of a
            liquidity pair with a given set of assumptions.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <p className="about__summary">
            What are the calculators shortcomings?
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p className="about__details">
            "Garbage in, garbage out". With a perfect clairvoyance to the future
            APY of any given liquidity pair it would not be a hard task to
            estimate performance of that liquidity pair. We of course don't have
            that clairvoyance, so we have to make assumptions. The accuracy of
            the output is dependant on the accuracy of the inputs.
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default About
