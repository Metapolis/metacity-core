import { LocationPoint } from "../../../../../common/LocationPoint";
/**
 * Represents {
 *              "top_left": [46.1859966659, -1.0898875706],
 *              "bottom_right": [46.1210972935, -1.246080447]
 *            }
 */

export class BoundingBoxTerm {

    /**
     * Top left point on the box
     */
    private topLeft: [number, number];

    /**
     * Bottom right point on the box
     */
    private bottomRight: [number, number];

    /**
     * Class constructor
     * @param topLeft
     * @param bottomRight
     */
    constructor(topLeft: LocationPoint, bottomRight: LocationPoint) {
        this.topLeft[0] = topLeft.getLatitudeParams();
        this.topLeft[1] = topLeft.getLongitudeParams();
        this.bottomRight[0] = bottomRight.getLatitudeParams();
        this.bottomRight[1] = bottomRight.getLongitudeParams();
    }

    /**
     * Generate the json for the bounding box term
     * @returns {string}
     */
    public render(): string {
        const jsonQuery = {
            top_left: this.topLeft,
            bottom_right: this.bottomRight
        };
        return JSON.stringify(jsonQuery);
    }

}
