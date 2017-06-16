/**
 * Contains atmospheric condition values
 */
export enum AtmosphericCondition {
    /**
     * 1 – Normale
     * 2 – Pluie légère
     * 3 – Pluie forte
     * 4 – Neige - grêle
     * 5 – Brouillard - fumée
     * 6 – Vent fort - tempête
     * 7 – Temps éblouissant
     * 8 – Temps couvert
     * 9 – Autre
     */
    NORMAL          = 1,
    LIGHT_RAIN      = 2,
    HEAVY_RAIN      = 3,
    SNOW_OR_HAIL    = 4,
    FOG_OR_SMOG = 5,
    STRONG_WIND     = 6,
    DAZZLING_WEATHER= 7,
    CLOUDY_WEATHER  = 8,
    OTHERS          = 9
}
