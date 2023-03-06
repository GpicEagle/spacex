import { html, render } from "lit-html"
import { ROCKET_SELECTED_EVENT } from "."
import { Rocket } from "../../model/rockets"
import rocketService from "../../../rocket-service"
import store from "../../model/store"
import { distinctUntilChanged, map } from "rxjs"

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <table class="w3-table-all w3-hoverable" style="font-family:Arial">
        <thead>
            <tr class="w3-grey">
                <th>Bild</th><th>Id</th><th>Name</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`
const rowTemplate = (rocket: Rocket) => html`
    <td><img src="${rocket.flickr_images}" alt="${rocket.name}" width="150" class="w3-round"></td><td>${rocket.id}</td><td>${rocket.name}</td>
`
class RocketTableComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        console.log("connected rockettable")
        rocketService.fetchAll()
        store
            .pipe(
                map(model => model.rockets),
                distinctUntilChanged()
            )
            .subscribe(rockets => {
                this.render(rockets)
            })
    }
    private render(rockets: Array<Rocket>) {
        render(tableTemplate, this.shadowRoot)

        const tbody = this.shadowRoot.querySelector("tbody")
        rockets.forEach(rocket => {
            const row = tbody.insertRow()
            row.onclick = () => {
                const event = new CustomEvent(ROCKET_SELECTED_EVENT, {detail: {rocket}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(rocket), row)
        });
    }
}

customElements.define("rocket-table", RocketTableComponent)