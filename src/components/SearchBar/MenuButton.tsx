import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SearchIcon from '@mui/icons-material/Search';
import "./MenuButton.css"
import {useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const MenuButton = () => {
    const [menuExpended, setMenuExpended] = useState(false)
    const navigate = useNavigate()

    const handleOpenMenu = () => {
        setMenuExpended(true)
    }
    const handleCloseMenu = () => {
        setMenuExpended(false)
    }

    const list = () => (
        <Box
            sx={{width: 250}}
            onClick={handleCloseMenu}
            onKeyDown={handleCloseMenu}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{navigate('/')}}>
                        <ListItemIcon>
                            <SearchIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Search'/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{navigate('/bookmarks')}}>
                        <ListItemIcon>
                            <BookmarksIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Bookmarks'/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <div>
            <React.Fragment key={'left'}>
                <Button onClick={handleOpenMenu}>
                    <MenuIcon/>
                </Button>
                <Drawer anchor='left' open={menuExpended} onClose={handleCloseMenu}>
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
};

export default MenuButton;