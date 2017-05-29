/**
 * Contains accident location info
 */
export class Location {

    /**
     * Accident's address
     */
    private address: string;

    /**
     * Accident's latitude
     */
    private latitude: number;

    /**
     * Accident's longitude
     */
    private longitude: number;

    /**
     * Accident's address setter
     */
    public setAddress(address: string) {
        this.address = address;
    }

    /**
     * Accident's address getter
     */
    public getAddress(): string {
        return this.address;
    }

    /**
     * Accident's latitude setter
     */
    public setLatitude(latitude: number) {
        this.latitude = latitude;
    }

    /**
     * Accident's latitude getter
     */
    public getLatitude(): number {
        return this.latitude;
    }

    /**
     * Accident's longitude setter
     */
    public setlongitude(longitude: number) {
        this.longitude = longitude;
    }

    /**
     * Accident's longitude getter
     */
    public getlongitude(): number {
        return this.longitude;
    }
}
