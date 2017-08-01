/**
 * Represents a collectivity
 */
export class CollectivityDTO {

    /**
     * Collectivity's identifier
     */
    private id: string;

    /**
     * Collectivity's name
     */
    private name: string;

    /**
     * Collectivity's secret
     */
    private secret: string;

    /**
     * Getter identifier
     *
     * @returns {string}
     */
    public getId(): string {
        return this.id;
    }

    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    public setId(id: string): void {
        this.id = id;
    }

    /**
     * Getter secret
     *
     * @returns {string}
     */
    public getSecret(): string {
        return this.secret;
    }

    /**
     * Setter secret
     *
     * @param secret new secret value
     */
    public setSecret(secret: string): void {
        this.secret = secret;
    }

    /**
     * Getter name
     *
     * @returns {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Setter name
     *
     * @param name new name value
     */
    public setName(name: string): void {
        this.name = name;
    }
}
