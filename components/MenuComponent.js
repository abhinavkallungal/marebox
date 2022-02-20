import Social from './Social';
import {
  Menu as MenuIcon,
} from '@material-ui/icons';
import { Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';

const MenuComponent = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log('null');
    setAnchorEl(null);
  };

  return (
    <>
      <MenuIcon
        id="basic-button"
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        style={{ marginTop: `50px` }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={handleClose}
          style={{
            backgroundColor: `${process.env.NEXT_PUBLIC_THEME_COLOR}`,
          }}
        >
          <Social/>
        </MenuItem>
      </Menu>
    </>
  );
}


export default MenuComponent;
