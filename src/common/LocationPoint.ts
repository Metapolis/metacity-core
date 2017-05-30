/**
 * Represents a location point with latitude and longitude
 */
export class LocationPoint {

    /**
     * Latitude
     */
    private latitude: number;

    /**
     * Longitude
     */
    private longitude: number;

    /**
     * Constructs location point
     * @param latitude location point latitude
     * @param longitude location point longitude
     */
    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    /**
     * Gets Parameters that latitude appear
     *
     * @return Value of Parameters that latitude appear
     */
    public getLatitudeParams(): number {
        return this.latitude;
    }

    /**
     * Gets Parameters that longitude appear
     *
     * @return Value of Parameters that longitude appear
     */
    public getLongitudeParams(): number {
        return this.longitude;
    }
}
