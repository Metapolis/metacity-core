import { LocalAuthority } from "../domain/LocalAuthority";

/**
 * Data Access Object of {@link LocalAuthorityDao}
 */
export interface LocalAuthorityDao {

    /**
     * Retrieve localAuthority by id
     *
     * @param id identifier to find
     */
    findById(id: number): Promise<LocalAuthority | undefined>;

    /**
     * Retrieve localAuthority by credential access key
     *
     * @param accessKey credential's identifier
     */
    findByCredentialAccessKey(accessKey: string): Promise<LocalAuthority | undefined>;
}
