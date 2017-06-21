
import { LocationPoint } from "./LocationPoint";

/**
 * Geo shape used to filter geo json
 */
export class GeoShape {

    /**
     * Top left point of shape
     */
    private topLeft: LocationPoint;

    /**
     * Bottom right point of shape
     */
    private bottomRight: LocationPoint;

    /**
     * Constructs geo shape
     * @param topLeft Left up point of shape
     * @param bottomRight Right down point of shape
     */
    constructor(topLeft: LocationPoint, bottomRight: LocationPoint) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }

    /**
     * Gets Parameters that top left appear
     *
     * @return Value of Parameters that topLeft appear
     */
    public getTopLeft(): LocationPoint {
        return this.topLeft;
    }

    /**
     * Gets Parameters that bottomRight appear
     *
     * @return Value of Parameters that bottomRight appear
     */
    public getBottomRight(): LocationPoint {
        return this.bottomRight;
    }
}
