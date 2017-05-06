/**
 * Contains luminosity Values
 */
export enum Luminosity {
    /**
     * 1 – Plein jour
     * 2 – Crépuscule ou aube
     * 3 – Nuit sans éclairage public
     * 4 - Nuit avec éclairage public non allumé
     * 5 – Nuit avec éclairage public allumé
     */
    PlainDay           = 1,
    DuskOrDawn         = 2,
    NightWithoutLights = 3,
    NightWithLightsOff = 4,
    NightWithLightsOn  = 5
}
