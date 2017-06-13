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
    NO_INTERSECTION        = 1,
    X_INTERSECTION         = 2,
    T_INTERSECTION         = 3,
    Y_INTERSECTION         = 4,
    FOUR_PLUS_INTERSECTION = 5,
    ROUND                  = 6,
    PLACE                  = 7,
    RAILROAD_CROSSING      = 8,
    OTHERS                 = 9
}
