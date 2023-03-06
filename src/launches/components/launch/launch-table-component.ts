import { html, render } from "lit-html"
import { LAUNCH_SELECTED_EVENT } from "."
import { Launch } from "../../model/launch"
import launchService from "../../../launch-service"
import store from "../../model/store"
import { distinctUntilChanged, map } from "rxjs"

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <table class="w3-table-all w3-hoverable" style="font-family:Arial">
        <thead>
            <tr class="w3-grey">
                <th>Bild</th><th>Id</th><th>Name</th><th>Datum</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`
const rowTemplate = (launch: Launch) => html`
<td><img src="${launch.links.patch.large}" alt="${launch.name}" width="50" class="w3-round"></td><td>${launch.id}</td><td>${launch.name}</td><td>${launch.date_utc}</td>
`
class LaunchTableComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        console.log("connected launchtable")
        launchService.fetchAll()
        store
            .pipe(
                map(model => model.launches),
                distinctUntilChanged()
            )
            .subscribe(launch => {
                this.render(launch)
            })
    }
    private render(launches: Array<Launch>) {
        render(tableTemplate, this.shadowRoot)

        const tbody = this.shadowRoot.querySelector("tbody")
        launches.forEach(launch => {
            const row = tbody.insertRow()
            row.onclick = () => {
                const event = new CustomEvent(LAUNCH_SELECTED_EVENT, {detail: {launch}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(launch), row)
        });
    }
}

customElements.define("launch-table", LaunchTableComponent)