import { QueryParam } from "./QueryParam";
import { LocationPoint } from "../../../../../common/LocationPoint";

/**
 * Contains all information to build query for a bounding box
 */
export class BoundingBoxQueryParam extends QueryParam {

    /**
     * Point on corner top left in rectangle
     */
    public topLeft: LocationPoint;

    /**
     * Point on corner bottom right in rectangle
     */
    public bottomRight: LocationPoint;

    /**
     * Constructor
     *
     * @param field search field name
     * @param topLeft corner top left
     * @param bottomRight corner bottom right
     */
    constructor(field?: string, topLeft?: LocationPoint, bottomRight?: LocationPoint) {
        super();
        this.field = field;
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }
}
