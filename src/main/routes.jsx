import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Metrics from '../metrics/metrics'
import About from '../about/about'

export default props => (
    <Router history={hashHistory}>
        <Route path='/metrics' component={Metrics} />
        <Route path='/about' component={About} />
        <Redirect from='*' to='/metrics' />
    </Router>
)