/**
 * App entry point
 */

// Polyfill
import "babel-core/polyfill"

// Libraries
import React from "react"

import Index from './page/index'

const DOM_APP_EL_ID = 'app'


React.render(<Index />, document.getElementById(DOM_APP_EL_ID))


