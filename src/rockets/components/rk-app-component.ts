import { html, render } from "lit-html"
import produce from "immer"
import store from "../model/store"
import "./rocket"
import { ROCKET_SELECTED_EVENT, SELECTED_ROCKET_BACK } from "./rocket"

const template = html`
    <rocket-table></rocket-table>
    <rocket-component></rocket-component>
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
        const rocketTableComponent = this.shadowRoot.querySelector<HTMLElement>("rocket-table")
        const rocketComponent = this.shadowRoot.querySelector<HTMLElement>("rocket-component")
        
        rocketTableComponent.addEventListener(ROCKET_SELECTED_EVENT, (e: CustomEvent) => {
            const rocket = e.detail.rocket
            let nextState = produce(store.getValue(), draft => {
                draft.currSelRo = rocket.id
            })
            store.next(nextState)
            rocketComponent.setAttribute("selected-rocket", rocket.id)
            rocketComponent.style.display = "block"
            rocketTableComponent.style.display = "none"
            console.log("rocket selected:", rocket)
        })

        rocketComponent.addEventListener(SELECTED_ROCKET_BACK, (e: CustomEvent) => {
            rocketComponent.style.display = "none"
            rocketTableComponent.style.display = "block"
        })
    }

    }

customElements.define("rk-app-component", AppComponent)