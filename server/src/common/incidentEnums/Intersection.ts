/**
 * Created by lionel on 02/05/17.
 */
/**
 * Contains Intersection Values
 */
export enum Intersection {
    /**
     * 1 – Hors intersection
     * 2 – Intersection en X
     * 3 – Intersection en T
     * 4 – Intersection en Y
     * 5 - Intersection à plus de 4 branches
     * 6 - Giratoire
     * 7 - Place
     * 8 – Passage à niveau
     * 9 – Autre intersection
     */
    NoIntersection       = 1,
    XIntersection        = 2,
    TIntersection        = 3,
    YIntersection        = 4,
    FourPlusIntersection = 5,
    Round                = 6,
    Place                = 7,
    RailroadCrossing     = 8,
    Others               = 9
}
