import produce from "immer"
import store from "./launchpads/model/store"

const LAUNCHPAD_URL = "https://api.spacexdata.com/v4/launchpads"

class LaunchpadService {
    async fetchAll() {
        const response = await fetch(LAUNCHPAD_URL)
        const launchpads = await response.json()
        let nextState = produce(store.getValue(), (draft: { launchpads: any }) => {
            draft.launchpads = launchpads
        })
        store.next(nextState)
    }
}

const launchpadService = new LaunchpadService()
export default launchpadService