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
    constructor(topLeft: [number, number], bottomRight: [number, number]) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
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
