import { html, render } from "lit-html"
import produce from "immer"
import store from "../model/store"
import "./launch"
import { LAUNCH_SELECTED_EVENT, SELECTED_LAUNCH_BACK } from "./launch"

const template = html`
    <launch-table></launch-table>
    <launch-component></launch-component>
`

class AppComponent extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        console.log("app component connected")
        this.render()
    }

    private render() {
        render(template, this.shadowRoot)
        const launchTableComponent = this.shadowRoot.querySelector<HTMLElement>("launch-table")
        const launchComponent = this.shadowRoot.querySelector<HTMLElement>("launch-component")
        
        launchTableComponent.addEventListener(LAUNCH_SELECTED_EVENT, (e: CustomEvent) => {
            const launch = e.detail.launch
            let nextState = produce(store.getValue(), draft => {
                draft.currSelRo = launch.id
            })
            store.next(nextState)
            launchComponent.setAttribute("selected-launch", launch.id)
            launchComponent.style.display = "block"
            launchTableComponent.style.display = "none"
            console.log("launch selected:", launch)
        })

        launchComponent.addEventListener(SELECTED_LAUNCH_BACK, (e: CustomEvent) => {
            launchComponent.style.display = "none"
            launchTableComponent.style.display = "block"
        })
    }

    }

customElements.define("ln-app-component", AppComponent)