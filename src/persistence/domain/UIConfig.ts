import { Column} from "typeorm";
import { Location } from "./Location";

/**
 * Ui config description
 */
export class UIConfig {

    /**
     * Ui primary color
     */
    @Column({nullable: false, type: "text"})
    private primaryColor: string;

    /**
     * Ui secondary color
     */
    @Column({nullable: false, type: "text"})
    private secondaryColor: string;

    /**
     * Ui logo
     */
    @Column({nullable: false, type: "text"})
    private logo: string;

    /**
     * Location embedded in Ui config
     */
    @Column((type: object) => Location)
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
