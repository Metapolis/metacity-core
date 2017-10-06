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
    findById(id: string): Promise<LocalAuthority> | undefined;
}
