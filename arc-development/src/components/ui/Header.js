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
    }
}));

function Header(props) {
    const classes = useStyles();
    const [numTab, setNumTab] = useState(0)

    const changeTab = (e, value) => {
        setNumTab(value)
    }

    useEffect(() => {
        if (window.location.pathname === "/" && numTab !== 0) {
            setNumTab(0)
        } else if (window.location.pathname === "/services" && numTab !== 1) {
            setNumTab(1)
        } else if (window.location.pathname === "/revolution" && numTab !== 2) {
            setNumTab(2)
        } else if (window.location.pathname === "/about" && numTab !== 3) {
            setNumTab(3)
        } else if (window.location.pathname === "/contact" && numTab !== 4) {
            setNumTab(4)
        } else if (window.location.pathname === "/estimate" && numTab !== 5) {
            setNumTab(5)
        }
    }, [numTab])

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
                            <Tab label="Services" className={classes.tab} component={Link} to="/services"/>
                            <Tab label="The Revolution" className={classes.tab} component={Link} to="/revolution"/>
                            <Tab label="About Us" className={classes.tab} component={Link} to="/about"/>
                            <Tab label="Contact Us" className={classes.tab} component={Link} to="/contact"/>
                        </Tabs>
                        <Button variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}/>
        </React.Fragment>
    );
}

export default Header;