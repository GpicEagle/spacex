import produce from "immer"
import store from "./rockets/model/store"

const ROCKET_URL = "https://api.spacexdata.com/v4/rockets"

class RocketService {
    async fetchAll() {
        const response = await fetch(ROCKET_URL)
        const rockets = await response.json()
        let nextState = produce(store.getValue(), (draft: { rockets: any }) => {
            draft.rockets = rockets
        })
        store.next(nextState)
    }
}

const rocketService = new RocketService()
export default rocketService