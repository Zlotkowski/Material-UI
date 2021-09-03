import Header from "./ui/Header";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./ui/Theme";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Footer from "./ui/Footer";
import {useState} from "react";
import LandingPage from "./LandingPage";
import Services from "./Services";
import CustomSoftware from "./CustomSoftware";
import MobileApps from "./MobileApps";

function App() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [numTab, setNumTab] = useState(0);
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header numTab={numTab} setNumTab={setNumTab} selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}/>
                <Switch>
                    <Route
                        exact path="/" render={props => (
                        <LandingPage{...props} setNumTab={setNumTab} setSelectedIndex={setSelectedIndex}/>)}/>
                    <Route exact path="/services" render={props => (
                        <Services{...props} setNumTab={setNumTab} setSelectedIndex={setSelectedIndex}/>)}/>
                    <Route exact path="/customsoftware" render={props => (
                        <CustomSoftware{...props} setNumTab={setNumTab} setSelectedIndex={setSelectedIndex}/>)}/>
                    <Route exact path="/mobileapps" render={props => (
                        <MobileApps{...props} setNumTab={setNumTab} setSelectedIndex={setSelectedIndex}/>)}/>/>
                    <Route exact path="/websites" component={() => <div>Websites</div>}/>
                    <Route exact path="/revolution" component={() => <div>Revolution</div>}/>
                    <Route exact path="/about" component={() => <div>About</div>}/>
                    <Route exact path="/contact" component={() => <div>Contact</div>}/>
                    <Route exact path="/estimate" component={() => <div>Estimate</div>}/>
                </Switch>
                <Footer numTab={numTab} setNumTab={setNumTab} selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}/>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;