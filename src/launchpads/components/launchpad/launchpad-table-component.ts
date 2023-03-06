import { html, render } from "lit-html"
import { LAUNCHPAD_SELECTED_EVENT } from "."
import { Launchpad } from "../../model/launchpads"
import launchpadService from "../../../launchpad-service"
import store from "../../model/store"
import { distinctUntilChanged, map } from "rxjs"

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <table class="w3-table-all w3-hoverable" style="font-family:Arial">
        <thead>
            <tr class="w3-grey">
                <th>Picture</th><th>Id</th><th>Name</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`
const rowTemplate = (launchpad: Launchpad) => html`
    <td><img src="${launchpad.images.large}" alt="${launchpad.name}" width="120" class="w3-round"></td><td>${launchpad.id}</td><td>${launchpad.name}</td>
`
class LaunchpadTableComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        console.log("connected launchpadtable")
        launchpadService.fetchAll()
        store
            .pipe(
                map(model => model.launchpads),
                distinctUntilChanged()
            )
            .subscribe(launchpad => {
                this.render(launchpad)
            })
    }
    private render(launchpads: Array<Launchpad>) {
        render(tableTemplate, this.shadowRoot)

        const tbody = this.shadowRoot.querySelector("tbody")
        launchpads.forEach(launchpad => {
            const row = tbody.insertRow()
            row.onclick = () => {
                const event = new CustomEvent(LAUNCHPAD_SELECTED_EVENT, {detail: {launchpad}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(launchpad), row)
        });
    }
}

customElements.define("launchpad-table", LaunchpadTableComponent)