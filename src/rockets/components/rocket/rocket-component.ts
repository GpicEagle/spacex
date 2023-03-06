import { html, render } from "lit-html"
import store from "../../model/store"
import { Rocket } from "../../model/rockets"
import { SELECTED_ROCKET_BACK } from "."

const rowTemplate = (rocket: Rocket) => html`
    <br>
    <img class="w3-round w3-hover-grayscale" src="${rocket.flickr_images}" alt="${rocket.name}" height="300">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <br>
    <table class="w3-table-all w3-hoverable" style="font-family:Arial">
        <thead>
            <tr class="w3-grey">
                <th>Key</th><th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>ID:</td> <td>${rocket.id}</td>
            </tr>
            <tr>
                <td>Name:</td> <td>${rocket.name}</td>
            </tr>
            <tr>
                <td>Active:</td> <td>${rocket.active}</td>
            </tr>
            <tr>
                <td>Cost per launch:</td> <td>${rocket.cost_per_launch}</td>
            </tr>
            <tr>
                <td>Country:</td> <td>${rocket.country}</td>
            </tr>
        </tbody>
    </table>
    <br>
    <Button class="w3-btn w3-black">Zurück</Button>
`

class RocketComponent extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        store.subscribe(model =>{
            const curr = store.value.currSelRo;
            store.value.rockets.forEach(rocket => {
                if(curr == rocket.id){
                    this.render(rocket)
                }
            });
        })
    }
    private render(rocket: Rocket) {
        render(rowTemplate(rocket),this.shadowRoot)
        const backButton = this.shadowRoot.querySelector<HTMLElement>("Button")
        backButton.onclick = () => {
            const event = new CustomEvent(SELECTED_ROCKET_BACK)
            this.dispatchEvent(event)
        }
    }
}

customElements.define("rocket-component", RocketComponent)