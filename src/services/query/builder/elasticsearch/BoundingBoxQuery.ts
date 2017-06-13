import { Query } from "./Query";
import { BoundingBoxTerm } from "./model/BoundingBoxTerm";

/**
 * Contains bounding box query
 */

export class BoundingBoxQuery implements Query {
    /**
     * Bounding box map
     * @type {Map<string, BoundingBoxTerm>}
     */
    private geoBoundingBox: Map<string, BoundingBoxTerm> = new Map<string, BoundingBoxTerm>();

    /**
     * Constructor of the map
     * @param field
     * @param topLeft
     * @param bottomRight
     */
    constructor(field: string, topLeft: [number, number], bottomRight: [number, number]) {
        const boundingBoxTerm = new BoundingBoxTerm(topLeft, bottomRight);
        this.geoBoundingBox.set(field, boundingBoxTerm);
    }

    /**
     * Render map
     * @returns {string}
     */
    public render(): string {
        let strQuery = "{" +
            "\"geo_bounding_box\" : {";
        for ( let key of this.geoBoundingBox.keys() ){
            strQuery += "\"" + key + "\": " + this.geoBoundingBox.get(key).render();
        }
        strQuery += "}}";
        return strQuery;
    }
}
