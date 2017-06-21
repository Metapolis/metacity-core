import { LocationPoint } from "../../../../../common/LocationPoint";
/**
 * Represents {
 *              "top_left": [46.1859966659, -1.0898875706],
 *              "bottom_right": [46.1210972935, -1.246080447]
 *            }
 */

export class BoundingBoxTerm {

    /**
     * Top left point on the box [lon, lat]
     */
    private topLeft: [number, number];

    /**
     * Bottom right point on the box [lon,lat]
     */
    private bottomRight: [number, number];

    /**
     * Class constructor
     * @param topLeft
     * @param bottomRight
     */
    constructor(topLeft: LocationPoint, bottomRight: LocationPoint) {
        this.topLeft = [topLeft.getLongitudeParams(), topLeft.getLatitudeParams()];
        this.bottomRight = [bottomRight.getLongitudeParams(), bottomRight.getLatitudeParams()];
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
