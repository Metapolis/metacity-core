/**
 * Represents a localAuthority
 */
export class LocalAuthorityDTO {

    /**
     * LocalAuthority's identifier
     */
    private id: number;

    /**
     * LocalAuthority's name
     */
    private name: string;

    /**
     * LocalAuthority's secret
     */
    private secret: string;

    /**
     * Getter identifier
     *
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    public setId(id: number): void {
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
