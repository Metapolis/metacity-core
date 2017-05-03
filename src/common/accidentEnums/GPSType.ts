/**
 * Contains luminosity Values
 */
export enum GPSType {
    /**
     * M – Metropole
     * A – Antille
     * G – Guyane
     * R – Reunion
     * Y - Mayotte
     */
    // the as any is a big trick to use string with enum
    Metropole = "M" as any,
    Antille = "A" as any,
    Guyane = "G" as any,
    Reunion = "R" as any,
    Mayotte = "Y" as any

}
