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
    METROPOLE= "M" as any,
    ANTILLE  = "A" as any,
    GUYANNE  = "G" as any,
    REUNION  = "R" as any,
    MAYOTTE  = "Y" as any

}
