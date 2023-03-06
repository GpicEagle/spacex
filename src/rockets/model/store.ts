import {Rocket} from "./rockets"
import {BehaviorSubject} from "rxjs"

interface Model {
    readonly rockets: Array<Rocket>,
    readonly currSelRo: String
}

const initialstate:Model = {
    rockets: new Array<Rocket>,
    currSelRo: null
}

const store = new BehaviorSubject<Model>(initialstate)
export default store