import {Launch} from "./launch"
import {BehaviorSubject} from "rxjs"

interface Model {
    readonly launches: Array<Launch>,
    readonly currSelRo: String
}

const initialstate:Model = {
    launches: new Array<Launch>,
    currSelRo: null
}

const store = new BehaviorSubject<Model>(initialstate)
export default store