import { html, render } from "lit-html"
import produce from "immer"
import store from "../model/store"
import "./launchpad"
import { LAUNCHPAD_SELECTED_EVENT, SELECTED_LAUNCHPAD_BACK } from "./launchpad"

const template = html`
    <launchpad-table></launchpad-table>
    <launchpad-component></launchpad-component>
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
        const launchpadTableComponent = this.shadowRoot.querySelector<HTMLElement>("launchpad-table")
        const launchpadComponent = this.shadowRoot.querySelector<HTMLElement>("launchpad-component")
        
        launchpadTableComponent.addEventListener(LAUNCHPAD_SELECTED_EVENT, (e: CustomEvent) => {
            const launchpad = e.detail.launchpad
            let nextState = produce(store.getValue(), draft => {
                draft.currSelRo = launchpad.id
            })
            store.next(nextState)
            launchpadComponent.setAttribute("selected-launchpad", launchpad.id)
            launchpadComponent.style.display = "block"
            launchpadTableComponent.style.display = "none"
            console.log("launchpad selected:", launchpad)
        })

        launchpadComponent.addEventListener(SELECTED_LAUNCHPAD_BACK, (e: CustomEvent) => {
            launchpadComponent.style.display = "none"
            launchpadTableComponent.style.display = "block"
        })
    }

    }

customElements.define("lp-app-component", AppComponent)