import { GPSType } from "../../../../common/accidentEnums/GPSType";

/**
 * Contains all details about a location
 */
export class Location {

    /**
     * Agglomeration name
     */
    private agglomeration: string;

    /**
     * Town name
     */
    private town: string;

    /**
     * Department name
     */
    private department: string;

    /**
     * GPS type (define how to use latitude and longitude)
     */
    private gpsType: GPSType;

    /**
     * Complete address
     */
    private address: string;

    /**
     * Location latitude
     */
    private latitude: number;

    /**
     * Location longitude
     */
    private longitude: number;

    /**
     * Getter agglomeration
     *
     * @returns {string}
     */
    public getAgglomeration(): string {
        return this.agglomeration;
    }

    /**
     * Setter agglomeration
     *
     * @param agglomeration new agglomeration value
     */
    public setAgglomeration(agglomeration: string): void {
        this.agglomeration = agglomeration;
    }

    /**
     * Getter town
     *
     * @returns {string}
     */
    public getTown(): string {
        return this.town;
    }

    /**
     * Setter town
     *
     * @param town new town value
     */
    public setTown(town: string): void {
        this.town = town;
    }

    /**
     * Getter department
     *
     * @returns {string}
     */
    public getDepartment(): string {
        return this.department;
    }

    /**
     * Setter department
     *
     * @param department new department value
     */
    public setDepartment(department: string): void {
        this.department = department;
    }

    /**
     * Getter gpsType
     *
     * @returns {GPSType}
     */
    public getGpsType(): GPSType {
        return this.gpsType;
    }

    /**
     * Setter gpsType
     *
     * @param gpsType new gpsType value
     */
    public setGpsType(gpsType: GPSType): void {
        this.gpsType = gpsType;
    }

    /**
     * Getter address
     *
     * @returns {string}
     */
    public getAddress(): string {
        return this.address;
    }

    /**
     * Setter address
     *
     * @param address new address value
     */
    public setAddress(address: string): void {
        this.address = address;
    }

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
     * @param latitude new latitude value
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
     * @param longitude new longitude value
     */
    public setLongitude(longitude: number): void {
        this.longitude = longitude;
    }

}
