import { Link } from '@mui/material'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { IconBrightness } from '../../utils/icons'
import StateManagement from '../../utils/actioncreators'
import { useSelector } from 'react-redux'

const AppBar = () => {
  //Dispatch
  const { updateBrightness } = StateManagement()

  //State
  const brightness = useSelector((state) => state.brightness)

  const navigate = useNavigate()
  //Hooks
  const [activated, setActivated] = useState('app')

  //Selectors
  const app = document.getElementById('item-1')
  const about = document.getElementById('item-2')

  //activate menu-item
  if (activated === 'app' && app) {
    app.style.borderBottom = '2px solid #1976D2'
    about.style.borderBottom = 'none'
  }

  //activate menu-item
  if (activated === 'about' && about) {
    about.style.borderBottom = '2px solid #1976D2'
    app.style.borderBottom = 'none'
  }

  const handleBrightnessChange = () => {
    let payload = brightness === 'light' ? 'dark' : 'light'
    document.body.classList.toggle('dark-mode')
    updateBrightness(payload)

    //Fixes issue with table headers hover
    for (let i = 0; i < 18; i++) {
      if (payload === 'dark') {
        if (document.getElementById(`header-month-${i}`)) {
          document.getElementById(`header-month-${i}`).style.backgroundColor =
            '#425A72'
          document.getElementById(`header-day-${i}`).style.backgroundColor =
            '#425A72'
        }
      }
      if (payload === 'light') {
        if (document.getElementById(`header-month-${i}`)) {
          document.getElementById(`header-month-${i}`).style.backgroundColor =
            '#9E9E9E'
          document.getElementById(`header-day-${i}`).style.backgroundColor =
            '#9E9E9E'
        }
      }
    }
  }

  return (
    <div>
      <div className="app-bar">
        <IconBrightness onClickFunction={handleBrightnessChange} />
        <div>
          <div className="app-bar__menu">
            <div className="app-bar__menu__item-1 menu-item" id="item-1">
              <Link
                underline="none"
                component="button"
                onClick={(e) => {
                  navigate('/')
                  setActivated('app')
                }}
              >
                <p className="menu-item-text">App</p>
              </Link>
            </div>

            <div className="app-bar__menu__item-2 menu-item" id="item-2">
              <Link
                className="app-bar__item-2"
                underline="none"
                component="button"
                onClick={(e) => {
                  navigate('/about')
                  setActivated('about')
                }}
              >
                <p className="menu-item-text">About</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppBar
