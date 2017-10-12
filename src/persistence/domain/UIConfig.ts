import { Location } from "./Location";

/**
 * UI config description
 */
export class UIConfig {

    /**
     * UI primary color
     */
    private primaryColor: string;

    /**
     * UI secondary color
     */
    private secondaryColor: string;

    /**
     * UI logo
     */
    private logo: string;

    /**
     * Location embedded in UI config
     */
    private location: Location;

    /**
     * Getter primary color
     *
     * @returns {string}
     */
    public getPrimaryColor(): string {
        return this.primaryColor;
    }

    /**
     * Setter secondary color
     *
     * @param {string} primaryColor
     */
    public setPrimaryColor(primaryColor: string): void {
        this.primaryColor = primaryColor;
    }

    /**
     * Getter secondary color
     *
     * @returns {string}
     */
    public getSecondaryColor(): string {
        return this.secondaryColor;
    }

    /**
     * Setter secondary color
     * @param {string} secondaryColor
     */
    public setSecondaryColor(secondaryColor: string): void {
        this.secondaryColor = secondaryColor;
    }

    /**
     * Getter logo
     *
     * @returns {string}
     */
    public getLogo(): string {
        return this.logo;
    }

    /**
     * Setter logo
     *
     * @param {string} logo
     */
    public setLogo(logo: string): void {
        this.logo = logo;
    }

    /**
     * Getter Location
     *
     * @returns {Location}
     */
    public getLocation(): Location {
        return this.location;
    }

    /**
     * Setter Location
     *
     * @param {Location} location
     */
    public setLocation(location: Location): void {
        this.location = location;
    }
}
