//import "./launchpads/components/lp-app-component"
//import "./launches/components/ln-app-component"
//import "./rockets/components/rk-app-component"
import "./nav-component"

const title = document.querySelector("title")
title.textContent = "Rocket Table"
const body = document.querySelector("body")
const launchpadComponent = document.createElement("nav-component")
body.appendChild(launchpadComponent)