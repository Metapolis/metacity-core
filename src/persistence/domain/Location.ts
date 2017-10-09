/**
 * Location description
 */
export class Location {

    /**
     * Location's latitude
     */
    private latitude: number;

    /**
     * Location's latitude
     */
    private longitude: number;

    /**
     * Location's zoom factor
     */
    private zoomFactor: number;

    /**
     * Getter latitude
     *
     * @returns {number}
     */
    public getLatitude(): number {
       return this.latitude;
    }

    /**
     * Setter latitude
     *
     * @param {number} latitude
     */
    public setLatitude(latitude: number): void {
        this.latitude = latitude;
    }

    /**
     * Getter longitude
     *
     * @returns {number}
     */
    public getLongitude(): number {
        return this.longitude;
    }

    /**
     * Setter longitude
     *
     * @param {number} longitude
     */
    public setLongitude(longitude: number): void {
        this.longitude = longitude;
    }

    /**
     * Getter zoom factor
     *
     * @returns {number}
     */
    public getZoomFactor(): number {
        return this.zoomFactor;
    }

    /**
     * Setter zoom factor
     *
     * @param {number} zoomFactor
     */
    public setZoomFactor(zoomFactor: number): void {
        this.zoomFactor = zoomFactor;
    }
}
