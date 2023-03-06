import produce from "immer"
import store from "./launches/model/store"

const LAUNCHES_URL = "https://api.spacexdata.com/v4/launches"

class LaunchesService {
    async fetchAll() {
        const response = await fetch(LAUNCHES_URL)
        const launches = await response.json()
        let nextState = produce(store.getValue(), (draft: { launches: any }) => {
            draft.launches = launches
        })
        store.next(nextState)
    }
}

const launchService = new LaunchesService()
export default launchService