/**
 * Contains Collision Type Values
 */
export enum CollisionType {
    /**
     * 1 – Deux véhicules - frontale
     * 2 – Deux véhicules – par l’arrière
     * 3 – Deux véhicules – par le coté
     * 4 – Trois véhicules et plus – en chaîne
     * 5 – Trois véhicules et plus  - collisions multiples
     * 6 – Autre collision
     * 7 – Sans collision
     */
    TWO_CARS_FRONTAL                 = 1,
    TWO_CARS_BACKSIDE                = 2,
    TWO_CARS_ON_SIDE                 = 3,
    THREE_AND_MORE_IN_CHAIN          = 4,
    THREE_AND_MORE_MULTIPLE_COLLISION= 5,
    OTHERS                           = 6,
    WITHOUT_COLLISION                 = 7
}
