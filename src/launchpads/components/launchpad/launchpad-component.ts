import { html, render } from "lit-html"
import store from "../../model/store"
import { Launchpad } from "../../model/launchpads"
import { SELECTED_LAUNCHPAD_BACK } from "."

const rowTemplate = (launchpad: Launchpad) => html`
    <br>
    <img class="w3-round w3-hover-grayscale" src="${launchpad.images.large}" alt="${launchpad.name}" height="300">
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
                <td>ID:</td> <td>${launchpad.id}</td>
            </tr>
            <tr>
                <td>Name:</td> <td>${launchpad.name}</td>
            </tr>
            <tr>
                <td>Full Name:</td> <td>${launchpad.full_name}</td>
            </tr>
            <tr>
                <td>Launch Attempts:</td> <td>${launchpad.launch_attempts}</td>
            </tr>
            <tr>
                <td>Launch Successes:</td> <td>${launchpad.launch_successes}</td>
            </tr>
        </tbody>
    </table>
    <br>
    <Button class="w3-btn w3-black">Zurück</Button>
`

class LaunchpadComponent extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        store.subscribe(model =>{
            const curr = store.value.currSelRo;
            store.value.launchpads.forEach(launchpad => {
                if(curr == launchpad.id){
                    this.render(launchpad)
                }
            });
        })
    }
    private render(launchpad: Launchpad) {
        render(rowTemplate(launchpad),this.shadowRoot)
        const backButton = this.shadowRoot.querySelector<HTMLElement>("Button")
        backButton.onclick = () => {
            const event = new CustomEvent(SELECTED_LAUNCHPAD_BACK)
            this.dispatchEvent(event)
        }
    }
}

customElements.define("launchpad-component", LaunchpadComponent)