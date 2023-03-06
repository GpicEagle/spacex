import { html, render } from "lit-html"
import store from "../../model/store"
import { Launch } from "../../model/launch"
import { SELECTED_LAUNCH_BACK } from "."

const rowTemplate = (launch: Launch) => html`
    <br>
    <img class="w3-round w3-hover-grayscale" src="${launch.links.patch.large}" alt="${launch.name}" height="300">
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
                <td>ID:</td> <td>${launch.id}</td>
            </tr>
            <tr>
                <td>Name:</td> <td>${launch.name}</td>
            </tr>
            <tr>
                <td>Date:</td> <td>${launch.date_utc}</td>
            </tr>
            <tr>
                <td>Rocket:</td> <td>${launch.rocket}</td>
            </tr>
            <tr>
                <td>Launchpad:</td> <td>${launch.launchpad}</td>
            </tr>
            <tr>
                <td>Success:</td> <td>${launch.success}</td>
            </tr>
        </tbody>
    </table>
    <br>
    <Button class="w3-btn w3-black">Zurück</Button>
`

class LaunchComponent extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        store.subscribe(model =>{
            const curr = store.value.currSelRo;
            store.value.launches.forEach(launch => {
                if(curr == launch.id){
                    this.render(launch)
                }
            });
        })
    }
    private render(launch: Launch) {
        render(rowTemplate(launch),this.shadowRoot)
        const backButton = this.shadowRoot.querySelector<HTMLElement>("Button")
        backButton.onclick = () => {
            const event = new CustomEvent(SELECTED_LAUNCH_BACK)
            this.dispatchEvent(event)
        }
    }
}

customElements.define("launch-component", LaunchComponent)