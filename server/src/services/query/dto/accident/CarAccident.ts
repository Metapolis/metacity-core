import { Climatology } from "./Climatology";
import { Location } from "./Location";
import { CollisionType } from "../../../../common/accidentEnums/CollisionType";
import { Intersection } from "../../../../common/accidentEnums/Intersection";

/**
 * Contains all details about a car accident
 */
export class CarAccident {

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
    private climatology: Climatology;

    /**
     * Car accident's location
     */
    private location: Location;

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
     * @returns {Climatology}
     */
    public getClimatology(): Climatology {
        return this.climatology;
    }

    /**
     * Setter climatology
     *
     * @param climatology new climatology value
     */
    public setClimatology(climatology: Climatology): void {
        this.climatology = climatology;
    }

    /**
     * Getter location
     *
     * @returns {Location}
     */
    public getLocation(): Location {
        return this.location;
    }

    /**
     * Setter location
     *
     * @param location new location value
     */
    public setLocation(location: Location): void {
        this.location = location;
    }
}
