export interface Launchpad {
    readonly images: Images,
    readonly id: string,
    readonly name: string,
    readonly full_name: string,
    readonly locality: string,
    readonly launch_attempts: number,
    readonly launch_successes: number
}

export interface Images {
    readonly large: string,
}