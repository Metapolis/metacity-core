import { Location } from "./Location";
/**
 * Contains accident minimal info
 */
export class AccidentMinimal {

    /**
     * Accident's id
     */
    private id: number;

    /**
     * Accident's location
     */
    private location: Location;

    /**
     * Accident's id getter
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Accident's id setter
     */
    public setId(id: number) {
        this.id = id;
    }

    /**
     * Accident's location getter
     */
    public getLocation(): Location {
        return this.location;
    }

    /**
     * Accident's location setter
     */
    public setLocation(location: Location) {
        this.location = location;
    }

}
