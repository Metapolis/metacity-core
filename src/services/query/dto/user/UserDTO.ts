/**
 * Represent a user
 */
export class UserDTO {

    /**
     * User's identifier
     */
    private id: number;

    /**
     * User's first name
     */
    private firstName: string;

    /**
     * User's last name
     */
    private lastName: string;

    /**
     * User's email
     */
    private email: string;

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
     * Getter lastName
     *
     * @returns {string}
     */
    public getFirstName(): string {
        return this.firstName;
    }

    /**
     * Setter lastName
     *
     * @param firstName new first name value
     */
    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    /**
     * Getter lastName
     *
     * @returns {string}
     */
    public getLastName(): string {
        return this.lastName;
    }

    /**
     * Setter lastName
     *
     * @param lastName new first name value
     */
    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    /**
     * Getter email
     *
     * @returns {string}
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Setter email
     *
     * @param email new first name value
     */
    public setEmail(email: string): void {
        this.email = email;
    }
}
