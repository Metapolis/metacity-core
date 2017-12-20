import { Credential } from "../domain/Credential";

/**
 * Data Access Object of {@link CredentialDao}
 */
export interface CredentialDao {

    /**
     * Retrieve credential by access key
     *
     * @param accessKey credential's identifier
     */
    findByAccessKey(accessKey: string): Promise<Credential | undefined>;
}
