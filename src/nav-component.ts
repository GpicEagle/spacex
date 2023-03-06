import { html, render } from "lit-html"
import "./launchpads/components/lp-app-component"
import "./launches/components/ln-app-component"
import "./rockets/components/rk-app-component"

const template = html`
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SpaceX Info</title>

    <style>
        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
        }
        
        .topnav {
          overflow: hidden;
          background-color: #333;
        }
        
        .topnav a {
          float: left;
          color: #f2f2f2;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          font-size: 17px;
        }
        
        .topnav a:hover {
          background-color: #ddd;
          color: black;
        }
        
        .topnav a.active {
          background-color: #04AA6D;
          color: white;
        }
    </style>

</head>
<body>
    <div class="topnav">
        <a class="active" id="home" >Home</a>
        <a id="rockets">Rockets</a>
        <a id="launches">Launches</a>
        <a id="launchpads">Landpads</a>
      </div>
      <div id="info" style="padding-left:16px">
        
        <h2>Information</h2>
        <p>Space Exploration Technologies Corporation (SpaceX) is an American spacecraft manufacturer, launcher, and a satellite communications corporation headquartered in Hawthorne, California.
          It was founded in 2002 by Elon Musk with the stated goal of reducing space transportation costs to enable the colonization of Mars.
          The company manufactures the Falcon 9, Falcon Heavy, and Starship launch vehicles, several rocket engines, Cargo Dragon and Crew Dragon spacecraft, and Starlink communications satellites.</p>
      </div>
</body>
</html>
    <lp-app-component></lp-app-component>
    <ln-app-component></ln-app-component>
    <rk-app-component></rk-app-component>
`

class NavComponent extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        console.log("nav component connected")
        this.render()
    }

    private render() {
        render(template, this.shadowRoot)
        const info = this.shadowRoot.getElementById("info")

        const home = this.shadowRoot.getElementById("home")
        const rockets = this.shadowRoot.getElementById("rockets")
        const launches = this.shadowRoot.getElementById("launches")
        const launchpads = this.shadowRoot.getElementById("launchpads")

        const lpcomponent = this.shadowRoot.querySelector<HTMLElement>("lp-app-component")
        const lncomponent = this.shadowRoot.querySelector<HTMLElement>("ln-app-component")
        const rkcomponent = this.shadowRoot.querySelector<HTMLElement>("rk-app-component")

        lpcomponent.style.display = "none"
        lncomponent.style.display = "none"
        rkcomponent.style.display = "none"

        home.onclick = () => {
            info.style.display = "block"
            lncomponent.style.display = "none"
            rkcomponent.style.display = "none"
            lpcomponent.style.display = "none"
            home.classList.add("active")
            rockets.classList.remove("active")
            launches.classList.remove("active")
            launchpads.classList.remove("active")
        }
        rockets.onclick = () => {
            info.style.display = "none"
            lncomponent.style.display = "none"
            rkcomponent.style.display = "block"
            lpcomponent.style.display = "none"
            home.classList.remove("active")
            rockets.classList.add("active")
            launches.classList.remove("active")
            launchpads.classList.remove("active")
        }
        launches.onclick = () => {
            info.style.display = "none"
            lncomponent.style.display = "block"
            rkcomponent.style.display = "none"
            lpcomponent.style.display = "none"
            home.classList.remove("active")
            rockets.classList.remove("active")
            launches.classList.add("active")
            launchpads.classList.remove("active")
        }
        launchpads.onclick = () => {
            info.style.display = "none"
            lncomponent.style.display = "none"
            rkcomponent.style.display = "none"
            lpcomponent.style.display = "block"
            home.classList.remove("active")
            rockets.classList.remove("active")
            launches.classList.remove("active")
            launchpads.classList.add("active")
        }

    }

    }

customElements.define("nav-component", NavComponent)