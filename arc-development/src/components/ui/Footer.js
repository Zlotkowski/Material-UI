import React from 'react';
import {Link} from "react-router-dom"
import {Grid, makeStyles} from "@material-ui/core";
import footerAdornment from "../../assets/Footer Adornment.svg";
import Hidden from "@material-ui/core/Hidden";
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.common.blue,
        width: "100%",
        zIndex: 1302,
        position: "relative"
    },
    adornment: {
        width: "25em",
        verticalAlign: "Bottom",
        [theme.breakpoints.down("md")]: {
            width: "21em"
        },
        [theme.breakpoints.down("xs")]: {
            width: "15em"
        }
    },
    mainContainer: {
        position: "absolute"
    },
    link: {
        color: "white",
        fontFamily: "Arial",
        fontSize: "0.75rem",
        fontWeight: "bold",
        textDecoration: "none"
    },
    gridItem: {
        margin: "3em"
    },
    icon: {
        height: "4em",
        width: "4em",
        [theme.breakpoints.down("xs")]: {
            height: "2.5em",
            width: "2.5em"
        }
    },
    socialContainer: {
        position: "absolute",
        marginTop: "-6em",
        right: "1.5em",
        [theme.breakpoints.down("xs")]: {
            right: "0.6em"
        }
    }
}))

function Footer(props) {
    const {setNumTab, setSelectedIndex} = props;
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Hidden mdDown>
                <Grid container justifyContent="center" className={classes.mainContainer}>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/" onClick={() => setNumTab(0)}
                                  className={classes.link}>Home</Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/services" onClick={() => {
                                setNumTab(1);
                                setSelectedIndex(0)
                            }}
                                  className={classes.link}>Services</Grid>
                        </Grid>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/customsoftware" onClick={() => {
                                setNumTab(1);
                                setSelectedIndex(1)
                            }} className={classes.link}>Custom
                                Software
                                Development</Grid>
                        </Grid>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/mobileapps" onClick={() => {
                                setNumTab(1);
                                setSelectedIndex(2)
                            }}
                                  className={classes.link}>Mobile App
                                Development</Grid>
                        </Grid>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/websites" onClick={() => {
                                setNumTab(1);
                                setSelectedIndex(3)
                            }}
                                  className={classes.link}>Website Development</Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/revolution" onClick={() => setNumTab(2)}
                                  className={classes.link}>The Revolution</Grid>
                        </Grid>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/revolution" onClick={() => setNumTab(2)}
                                  className={classes.link}>Vision</Grid>
                        </Grid>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/revolution" onClick={() => setNumTab(2)}
                                  className={classes.link}>Technology</Grid>
                        </Grid>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/revolution" onClick={() => setNumTab(2)}
                                  className={classes.link}>Process</Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/about" onClick={() => setNumTab(3)}
                                  className={classes.link}>About
                                as</Grid>
                        </Grid>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/about" onClick={() => setNumTab(3)}
                                  className={classes.link}>History</Grid>
                        </Grid>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/about" onClick={() => setNumTab(3)}
                                  className={classes.link}>Team</Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/contact" onClick={() => setNumTab(4)}
                                  className={classes.link}>Contact
                                Us</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            <img src={footerAdornment} alt="black decorative slash"
                 className={classes.adornment}/>
            <Grid className={classes.socialContainer} container justifyContent="flex-end" spacing={2}>
                <Grid item component={"a"} href="https://www.facebook.com" rel="noopener noreferrer" target="_blank">
                    <img src={facebook} alt="facebook logo" className={classes.icon}/>
                </Grid>
                <Grid item component={"a"} href="https://www.twitter.com" rel="noopener norefere" target="_blank">
                    <img src={twitter} alt="twitter logo" className={classes.icon}/>
                </Grid>
                <Grid item component={"a"} href="https://www.instagram.com" rel="noopener norefere" target="_blank">
                    <img src={instagram} alt="instagram logo" className={classes.icon}/>
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer;