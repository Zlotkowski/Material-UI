import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {makeStyles} from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from '../../assets/logo.svg'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ElevationScroll(props) {
    const {children} = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2rem"
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "2rem"
        }
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "6rem"
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5rem"
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: "0px"
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    },
    drawIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    drawerIcon: {
        height: "50px",
        width: "50px"
    },
    drawer: {
        backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },
    drawerItemSelected: {
        "& .MuiListItemText-root": {
            opacity: 1
        },
        opacity: 1
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1
    }
}));

function Header(props) {
    const {numTab, setNumTab, selectedIndex, setSelectedIndex} = props;
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);

    const changeTab = (event, newValue) => {
        setNumTab(newValue);
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const handleMenuItemClick = (event, index) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(index);
    };

    const menuOptions = [
        {name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0},
        {name: "Custom Software Development", link: "/customsoftware", activeIndex: 1, selectedIndex: 1},
        {name: "iOS/Android App Development", link: "/mobileapps", activeIndex: 1, selectedIndex: 2},
        {name: "Website Development", link: "/websites", activeIndex: 1, selectedIndex: 3}
    ];

    const routes = [
        {name: "Home", link: "/", activeIndex: 0},
        {
            name: "Services",
            link: "/services",
            activeIndex: 1,
            ariaOwns: anchorEl ? "simple-menu" : undefined,
            ariaPopup: anchorEl ? "true" : undefined,
            mouseOver: (event) => handleOpenMenu(event)
        },
        {name: "The Revolution", link: "/revolution", activeIndex: 2},
        {name: "About Us", link: "/about", activeIndex: 3},
        {name: "Contact Us", link: "/contact", activeIndex: 4}
    ];

    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (numTab !== route.activeIndex) {
                        setNumTab(route.activeIndex)
                        if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
                            setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                case '/estimate':
                    props.setNumTab(5);
                    break;
                default:
                    break;
            }
        })

    }, [numTab, menuOptions, selectedIndex, routes, props, setNumTab, setSelectedIndex]);

    const tabs = (
        <React.Fragment>
            <Tabs value={numTab} className={classes.tabContainer} onChange={changeTab}
                  indicatorColor={"secondary"}>
                {routes.map((route, index) => (
                    <Tab key={`${route}${index}`} className={classes.tab} component={Link} to={route.link}
                         label={route.name}
                         aria-owns={route.ariaOwns} aria-haspopup={route.ariaPopup} onMouseOver={route.mouseOver}/>
                ))}
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button} component={Link}
                    onClick={() => props.setNumTab(5)} to="/estimate">Free
                Estimate</Button>
            <Menu id="simple-menu"
                  classes={{paper: classes.menu}}
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  MenuListProps={{onMouseLeave: handleCloseMenu}}
                  elevation={0}
                  style={{zIndex: 1302}}
                  keepMounted
            >
                {menuOptions.map((option, index) => (
                    <MenuItem key={`${option}${index}`} component={Link} to={option.link}
                              classes={{root: classes.menuItem}} onClick={(event) => {
                        handleMenuItemClick(event, index);
                        setNumTab(1);
                        handleCloseMenu();
                    }} selected={(index) === selectedIndex && numTab === 1}>{option.name}</MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )


    const drawer = (<React.Fragment>
        <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer}
                         onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)}
                         classes={{paper: classes.drawer}}>
            <div className={classes.toolbarMargin}/>
            <List disablePadding>
                {routes.map((route, activeIndex) => (
                    <ListItem
                        key={`${route}${activeIndex}`}
                        divider
                        button
                        component={Link} to={route.link}
                        selected={numTab === route.activeIndex}
                        classes={{selected: classes.drawerItemSelected}}
                        onClick={() => {
                            setOpenDrawer(false);
                            setNumTab(route.activeIndex)
                        }}>
                        <ListItemText
                            className={classes.drawerItem}
                            disableTypography>{route.name}</ListItemText>
                    </ListItem>
                ))}
                <ListItem onClick={() => {
                    setOpenDrawer(false);
                    setNumTab(5);
                }}
                          divider
                          button
                          component={Link} to="/estimate"
                          selected={numTab === 5}
                          classes={{root: classes.drawerItemEstimate, selected: classes.drawerItemSelected}}
                >
                    <ListItemText className={classes.drawerItem} disableTypography>
                        Free Estimate
                    </ListItemText>
                </ListItem>
            </List>
        </SwipeableDrawer>
        <IconButton className={classes.drawIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
            <MenuIcon className={classes.drawerIcon}/>
        </IconButton>
    </React.Fragment>);

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position={"fixed"} color={"primary"} className={classes.appbar}>
                    <Toolbar disableGutters={true}>
                        <Button component={Link} to="/" disableRipple className={classes.logoContainer}
                                onClick={() => setNumTab(0)}>
                            <img src={logo} alt="company logo" className={classes.logo}/>
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}/>
        </React.Fragment>
    );
}

export default Header;