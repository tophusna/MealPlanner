import React, { Component } from 'react'
import { Button, Menu, MenuItem, AppBar, Toolbar, Typography, ButtonGroup } from '@material-ui/core'
import { getUserById } from '../../actions/actions'
import './style.css'

export class NavBar extends Component {
  state = {
    anchorEl: null,
    uid: null,
    username: 'Profile'
  }

  componentDidUpdate() {
    if (this.props.uid !== this.state.uid) {
      this.getName(this.props.uid).then(res => {
        this.setState({
          uid: this.props.uid,
          username: res
        })
      })
    }
  }

  handleMenuOpen = event => {
    this.setState({
      anchorEl: event.target
    })
  }

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  getName = (uid) => {
    if (!uid) {
      return Promise.resolve('Profile')
    }
    return getUserById(uid).then(res => {
      return res.username
    })
  }

  render () {
    const getRightSide = () => {
      if (!this.props.uid) {
        return (
          <ButtonGroup style={{ marginLeft: 'auto' }} >
            <Button onClick={() => window.open('/signup', '_self')}>Sign Up</Button>
            <Button onClick={() => window.open('/login', '_self')}>Log In</Button>
          </ButtonGroup> 
        )
      } else {
        return (
          <div style={{ marginLeft: 'auto' }}>
            <Button id='menuAnchor' aria-controls='user-menu' aria-haspopup='true' onClick={this.handleMenuOpen}><i className='material-icons left'>person</i><h6>{this.state.username}</h6></Button>
            <Menu
              id='user-menu'
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem><a href='/calendar'><i className='material-icons left'>person</i>My Profile</a></MenuItem>
              <MenuItem><a href='/calendar'><i className='material-icons left'>list</i>My Shopping List</a></MenuItem>
              <MenuItem><a href='/calendar'><i className='material-icons left'>mode_edit</i>My Ingredients</a></MenuItem>
              <MenuItem><a href='/logout'><i className='material-icons left'>exit_to_app</i>Log Out</a></MenuItem>
            </Menu>
          </div>
        )
      }
    }

    return (
      <AppBar position='static'>
        <Toolbar className='nav-wrapper'> 
          <a href='/' id='logo' className='brand-logo'><Typography variant='h4'>Grocery App</Typography></a>
          { getRightSide() }
        </Toolbar>
      </AppBar>
    )
  }
}

export default NavBar
