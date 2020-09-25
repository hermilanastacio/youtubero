import * as React from 'react';
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import { Callback } from '../components/Callback';


export const withCallbackRoute = (props: React.ComponentType, type?: string) => {

    const swh = (
        <Switch>
            <Route exact path='/callback' component={Callback}/>
            <Route path="/" component={props}/>
        </Switch>
    );

    if(type === 'browser')
        return <BrowserRouter>{swh}</BrowserRouter>;

    else
        return <HashRouter>{swh}</HashRouter>;
}

//Wrapper (for component with props)
interface CallbackRouteWrapperProps{
    children?: React.ReactNode
    type?: string;
}
export const CallbackRouteWrapper: React.FC<CallbackRouteWrapperProps> = (props) => {

    const swh = (
        <Switch>
            <Route exact path='/callback' component={Callback}/>
            <Route path="/" render={() => props.children}/>
        </Switch>
    );

    if(props.type === 'browser')
        return <BrowserRouter>{swh}</BrowserRouter>;

    else
        return <HashRouter>{swh}</HashRouter>;
};

