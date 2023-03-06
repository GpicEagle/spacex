export interface Launch {
    readonly links: Links,
    readonly id: string,
    readonly date_utc: string,
    readonly name: string,
    readonly rocket: string,
    readonly launchpad: string,
    readonly success: boolean
}

export interface Patch {
    readonly large: string
}

export interface Links {
    readonly patch: Patch
}

