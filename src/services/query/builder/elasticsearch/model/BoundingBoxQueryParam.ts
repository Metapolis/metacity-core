
import {QueryParam} from "./QueryParam";

/**
 * Contains all information to build query for a bounding box
 */
export class BoundingBoxQueryParam extends QueryParam {

    /**
     * Point on corner top left in rectangle
     */
    public topLeft: [number, number];

    /**
     * Point on corner bottom right in rectangle
     */
    public bottomRight: [number, number];
}