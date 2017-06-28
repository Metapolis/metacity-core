/**
 * Definition of return object from elastic search
 *   /\
 *  /!\ It's a really ugly method but it's the trick used by elastic search to return information
 * /__\
 */
export interface AccidentJsonData {
    sources: string[];
    latLon: number[];
    meta: {
        documentType: string;
        index: string;
    };
    intersection: number;
    climatology: {
        atmosphericCondition: number;
        luminosity: number;
    };
    location: {
        address: string;
        commune: number;
        latitude: number;
        gpsType: string;
        agglomeration: number;
        department: number;
        longitude: number;
    };
    id: number;
    collisionType: number;
    timestamp: number;
    sort: number[];

}
