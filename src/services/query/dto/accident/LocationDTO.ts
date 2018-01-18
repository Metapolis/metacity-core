/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

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
        this.gpsType = (GPSType as any)[this.gpsType];
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
