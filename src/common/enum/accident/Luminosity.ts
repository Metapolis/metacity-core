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
    PLAIN_DAY          = 1,
    DUSK_OR_DAWN       = 2,
    NIGHT_WITHOUT_LIGHT = 3,
    NIGHT_WITH_LIGHTS_OFF = 4,
    NIGHT_VISION_WITH_LIGHTS_ON  = 5
}
