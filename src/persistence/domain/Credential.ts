import { Column, Entity, PrimaryColumn } from "typeorm";

/**
 * Credential use to authenticate element on api
 */
@Entity()
export class Credential {

    /**
     * Credential's access key
     */
    @PrimaryColumn()
    private accessKey: string;

    /**
     * Credential's secret
     */
    @Column({nullable: false, length: 250})
    private secret: string;

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
     * Getter accessKey
     *
     * @returns {string}
     */
    public getAccessKey(): string {
        return this.accessKey;
    }

    /**
     * Setter accessKey
     *
     * @param accessKey new accessKey value
     */
    public setAccessKey(accessKey: string): void {
        this.accessKey = accessKey;
    }
}
