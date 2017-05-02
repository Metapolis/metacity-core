/**
 * Created by lionel on 02/05/17.
 */
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
    Normal          = 1,
    LightRain       = 2,
    HeavyRain       = 3,
    SnowOrHail      = 4,
    FogOrSmoke      = 5,
    StrongWind      = 6,
    DazzlingWeather = 7,
    CloudyWeather   = 8,
    Others          = 9
}
