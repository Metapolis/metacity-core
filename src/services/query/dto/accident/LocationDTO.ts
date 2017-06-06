import { GPSType } from "../../../../common/enum/accident/GPSType";
import { Utils } from "../../../../common/Utils";

/**
 * Data transfer object with all details about a location
 */
export class LocationDTO {

    /**
     * Agglomeration info
     */

    private agglomeration: number;

    /**
     * Commune id
     */
    private commune: number;

    /**
     * Department id
     */
    private department: number;

    /**
     * GPS type (define how to use latitude and longitude)
     */
    private gpsType: GPSType;

    /**
     * Complete address
     */
    private address: string;

    /**
     * LocationDTO latitude
     */
    private latitude: number;

    /**
     * LocationDTO longitude
     */
    private longitude: number;

    /**
     * Constructor from json
     *
     * @param json json used to construction
     */
    constructor(json: {} = {}) {
        Object.assign(this, json);
        if (Utils.isNullOrEmpty(this.address)) {
            this.address = undefined;
        }
    }

    /**
     * Getter agglomeration
     *
     * @returns {string}
     */
    public getAgglomeration(): number {
        return this.agglomeration;
    }

    /**
     * Setter agglomeration
     *
     * @param agglomeration new agglomeration value
     */
    public setAgglomeration(agglomeration: number): void {
        this.agglomeration = agglomeration;
    }

    /**
     * Getter commune
     *
     * @returns {string}
     */
    public getCommune(): number {
        return this.commune;
    }

    /**
     * Setter commune
     *
     * @param commune new town value
     */
    public setCommune(commune: number): void {
        this.commune = commune;
    }

    /**
     * Getter department
     *
     * @returns {string}
     */
    public getDepartment(): number {
        return this.department;
    }

    /**
     * Setter department
     *
     * @param department new department value
     */
    public setDepartment(department: number): void {
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
