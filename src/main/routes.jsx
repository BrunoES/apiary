import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Metrics from '../metrics/metrics'

export default props => (
    <Router history={hashHistory}>
        <Route path='/metrics' component={Metrics} />
        <Redirect from='*' to='/metrics' />
    </Router>
)