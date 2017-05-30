
import { LocationPoint } from "./LocationPoint";

/**
 * Geo shape used to filter geo json
 */
export class GeoShape {

    /**
     * Left up point of shape
     */
    private leftUpPoint: LocationPoint;

    /**
     * Right down point of shape
     */
    private rightDownPoint: LocationPoint;

    /**
     * Constructs geo shape
     * @param leftUpPoint Left up point of shape
     * @param rightDownPoint Right down point of shape
     */
    constructor(leftUpPoint: LocationPoint, rightDownPoint: LocationPoint) {
        this.leftUpPoint = leftUpPoint;
        this.rightDownPoint = rightDownPoint;
    }

    /**
     * Gets Parameters that leftUpPoint appear
     *
     * @return Value of Parameters that leftUpPoint appear
     */
    public getLeftUpPointParams(): LocationPoint {
        return this.leftUpPoint;
    }

    /**
     * Gets Parameters that rightDownPoint appear
     *
     * @return Value of Parameters that rightDownPoint appear
     */
    public getRightDownPointParams(): LocationPoint {
        return this.rightDownPoint;
    }
}
