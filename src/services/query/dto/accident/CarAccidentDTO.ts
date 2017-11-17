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

import { ClimatologyDTO } from "./ClimatologyDTO";
import { LocationDTO } from "./LocationDTO";
import { CollisionType } from "../../../../common/enum/accident/CollisionType";
import { Intersection } from "../../../../common/enum/accident/Intersection";

/**
 * Data transfer object with all details about a car accident
 */
export class CarAccidentDTO {

    /**
     * Accident sources
     */
    private sources: string[];

    /**
     * Car accident's Identifier
     */
    private id: number;

    /**
     * Car accident's timestamp
     */
    private timestamp: number;

    /**
     * Car accident's collision type
     */
    private collisionType: CollisionType;

    /**
     * Car accident's intersection
     */
    private intersection: Intersection;

    /**
     * Car accident's climatology
     */
    private climatology: ClimatologyDTO;

    /**
     * Car accident's location
     */
    private location: LocationDTO;

    /**
     * Allow default constructor
     */

    /**
     * Constructor from JSON
     *
     * @param json json used to construction
     */
    constructor(json: {} = {}) {
        Object.assign(this, json);
        this.climatology = new ClimatologyDTO(this.climatology);
        this.location = new LocationDTO(this.location);
    }

    /**
     * Getter sources
     *
     * @returns {string[]}
     */
    public getSources(): string[] {
        return this.sources;
    }

    /**
     * Setter sources
     *
     * @param sources new sources value
     */
    public setSources(sources: string[]): void {
        this.sources = sources;
    }

    /**
     * Getter identifier
     *
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter timestamp
     *
     * @returns {number}
     */
    public getTimestamp(): number {
        return this.timestamp;
    }

    /**
     * Setter timestamp
     *
     * @param timestamp new timestamp value
     */
    public setTimestamp(timestamp: number): void {
        this.timestamp = timestamp;
    }

    /**
     * Getter collision type
     *
     * @returns {CollisionType}
     */
    public getCollisionType(): CollisionType {
        return this.collisionType;
    }

    /**
     * Setter collision type
     *
     * @param collisionType new collision type value
     */
    public setCollisionType(collisionType: CollisionType): void {
        this.collisionType = collisionType;
    }

    /**
     * Getter intersection
     *
     * @returns {Intersection}
     */
    public getIntersection(): Intersection {
        return this.intersection;
    }

    /**
     * Setter intersection
     *
     * @param intersection new intersection value
     */
    public setIntersection(intersection: Intersection): void {
        this.intersection = intersection;
    }

    /**
     * Getter climatology
     *
     * @returns {ClimatologyDTO}
     */
    public getClimatology(): ClimatologyDTO {
        return this.climatology;
    }

    /**
     * Setter climatology
     *
     * @param climatology new climatology value
     */
    public setClimatology(climatology: ClimatologyDTO): void {
        this.climatology = climatology;
    }

    /**
     * Getter location
     *
     * @returns {LocationDTO}
     */
    public getLocation(): LocationDTO {
        return this.location;
    }

    /**
     * Setter location
     *
     * @param location new location value
     */
    public setLocation(location: LocationDTO): void {
        this.location = location;
    }
}
