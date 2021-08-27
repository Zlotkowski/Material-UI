import React, {useEffect, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {makeStyles} from "@material-ui/styles";
import logo from '../../assets/logo.svg'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import {MenuItem} from "@material-ui/core";

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
        marginBottom: "3em"
    },
    logo: {
        height: "8em",
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
        height: "45px"
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
    }
}));

function Header(props) {
    const classes = useStyles();
    const [numTab, setNumTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const changeTab = (event, value) => {
        setNumTab(value);
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
        {name: "Services", link: "/services"},
        {name: "Custom Software Development", link: "/customsoftware"},
        {name: "Mobile App Development", link: "/mobileapps"},
        {name: "Website Development", link: "/websites"}
    ]

    useEffect(() => {
        switch (window.location.pathname) {
            case "/":
                if (numTab !== 0) {
                    setNumTab(0);
                }
                break;
            case "/services":
                if (numTab !== 1) {
                    setNumTab(1);
                    setSelectedIndex(0);
                }
                break;
            case "/customsoftware":
                if (numTab !== 1) {
                    setNumTab(1);
                    setSelectedIndex(1);
                }
                break;
            case "/mobileapps":
                if (numTab !== 1) {
                    setNumTab(1);
                    setSelectedIndex(2);
                }
                break;
            case "/websites":
                if (numTab !== 1) {
                    setNumTab(1);
                    setSelectedIndex(3);
                }
                break;
            case "/revolution":
                if (numTab !== 2) {
                    setNumTab(2);
                }
                break;
            case "/about":
                if (numTab !== 3) {
                    setNumTab(3);
                }
                break;
            case "/contact":
                if (numTab !== 4) {
                    setNumTab(4);
                }
                break;
            case "/estimate":
                if (numTab !== 5) {
                    setNumTab(5);
                }
                break;
            default:
                break;
        }
    }, [numTab]);

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position={"fixed"} color={"primary"}>
                    <Toolbar disableGutters={true}>
                        <Button component={Link} to="/" disableRipple className={classes.logoContainer}
                                onClick={() => setNumTab(0)}>
                            <img src={logo} alt="company logo" className={classes.logo}/>
                        </Button>
                        <Tabs value={numTab} className={classes.tabContainer} onChange={changeTab}
                              indicatorColor={"secondary"}>
                            <Tab label="Home" className={classes.tab} component={Link} to="/"/>
                            <Tab aria-owns={anchorEl ? "simple-menu" : undefined}
                                 aria-haspopup={anchorEl ? "true" : undefined}
                                 label="Services"
                                 className={classes.tab}
                                 component={Link} to="/services"
                                 onMouseOver={(event) => handleOpenMenu(event)}
                            />
                            <Tab label="The Revolution" className={classes.tab} component={Link} to="/revolution"/>
                            <Tab label="About Us" className={classes.tab} component={Link} to="/about"/>
                            <Tab label="Contact Us" className={classes.tab} component={Link} to="/contact"/>
                        </Tabs>
                        <Button variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
                        <Menu id="simple-menu"
                              classes={{paper: classes.menu}}
                              anchorEl={anchorEl}
                              open={openMenu}
                              onClose={handleCloseMenu}
                              MenuListProps={{onMouseLeave: handleCloseMenu}}
                              elevation={0}
                        >
                            {menuOptions.map((option, index) => (
                                <MenuItem key={option.name} component={Link} to={option.link}
                                          classes={{root: classes.menuItem}} onClick={(event) => {
                                    handleMenuItemClick(event, index);
                                    setNumTab(1);
                                    handleCloseMenu();
                                }} selected={(index) === selectedIndex && numTab === 1}>{option.name}</MenuItem>
                            ))}
                        </Menu>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}/>
        </React.Fragment>
    );
}

export default Header;