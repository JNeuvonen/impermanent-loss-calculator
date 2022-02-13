import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { GraphOnToolTip } from '../Graphs/index'
import { GetMediaQuery } from '../../utils/hooks'

//MUI styles
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

//MUI styles
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

const CustomizedDialogs = ({
  dialogOpen,
  setDialogOpen,
  priceArray,
  T1Change,
  T2Change,
  capital,
}) => {
  const handleClose = () => {
    setDialogOpen(false)
  }

  //BP
  const mediaQueries = [1050, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550]

  //Dialog size
  let width = 750
  let height = 350

  mediaQueries.forEach((px) => {
    if (GetMediaQuery(px)) {
      width -= 41
    }
  })

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
        PaperProps={{
          sx: { minWidth: width, minHeight: height },
        }}
        className="dialog"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          % PnL
        </DialogTitle>
        <DialogContent dividers>
          <div>{GraphOnToolTip(priceArray, T1Change, T2Change, capital)}</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CustomizedDialogs
