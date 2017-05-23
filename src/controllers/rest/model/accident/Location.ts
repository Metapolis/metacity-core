/**
 * Contains accident location info
 */
export class Location {

    /**
     * Accident's address
     */
    private address: string;

    /**
     * Accident's latitude and longitude
     */
    private latLon: [number, number];

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
     * Accident's latLon setter
     */
    public setLatLon(latLon: [number, number]) {
        this.latLon = latLon;
    }

    /**
     * Accident's latLon getter
     */
    public getLatLon(): [number, number] {
        return this.latLon;
    }
}
