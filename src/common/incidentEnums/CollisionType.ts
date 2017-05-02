/**
 * Created by lionel on 02/05/17.
 */
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
    TwoCarsFrontal                = 1,
    TwoCarsBackside               = 2,
    TwoCarsOnSide                 = 3,
    ThreeAndMoreInChain           = 4,
    ThreeAndMoreMultipleCollision = 5,
    Others                        = 6,
    WithoutCollision              = 7
}
