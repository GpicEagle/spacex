import {Launchpad} from "./launchpads"
import {BehaviorSubject} from "rxjs"

interface Model {
    readonly launchpads: Array<Launchpad>,
    readonly currSelRo: String
}

const initialstate:Model = {
    launchpads: new Array<Launchpad>,
    currSelRo: null
}

const store = new BehaviorSubject<Model>(initialstate)
export default store