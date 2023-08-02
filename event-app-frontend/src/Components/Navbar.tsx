import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from "@mui/material/Link";
import {useNavigate} from "react-router-dom";

const pages = ['Create an event', 'Saved events', 'Suggestions', 'Group suggestions'];
const settings = ['Profile', 'Logout'];


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const handleMenuItemClick = (setting: string) => {
        handleCloseNavMenu();
        if (setting === 'Logout') {
            navigate("/")
            localStorage.removeItem('session');
        } else if (setting === 'Profile') {
            navigate("/profile")
        } else if (setting === 'Account') {
            navigate("/account")
        } else {
            // Handle the click of other settings items
            // ...
        }
    };

    return (
        <div style={{position: 'relative'}}>
            <AppBar position="static" sx={{backgroundColor: '#6b549c', height: "60px", marginTop: "-10px"}}>
                <Container maxWidth={false}>
                    <img
                        src="../navbar.png"
                        alt="Overlay Photo"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '60px',
                            opacity: 0.15,
                            objectFit: 'cover',
                            objectPosition: 'top'
                        }}
                    />
                    <Toolbar disableGutters>
                        <Link href="/home">
                            <img
                                src="../logo.png"
                                alt="Your Photo"
                                style={{width: '120px', height: '30px'}}
                            />
                        </Link>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link underline="none"
                                              style={{textDecoration: 'none', color: 'inherit'}}>
                                            {page.charAt(0).toUpperCase() + page.slice(1).toLowerCase()}
                                        </Link>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                > <Link href={`/${page.toLowerCase().split(" ").join("-")}`} underline="none"
                                        style={{textDecoration: 'none', color: 'inherit'}}>
                                    {page.charAt(0).toUpperCase() + page.slice(1).toLowerCase()}
                                </Link>
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{
                                    mt: '40px',
                                    fontFamily: 'Montserrat, Roboto, Arial, sans-serif'
                                }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                                        <Link underline="none"
                                              style={{textDecoration: 'none', color: 'inherit'}}>
                                            {setting.charAt(0).toUpperCase() + setting.slice(1).toLowerCase()}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default ResponsiveAppBar;
