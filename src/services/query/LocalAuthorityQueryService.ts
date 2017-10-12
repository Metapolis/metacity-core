import { LocalAuthorityDTO } from "./dto/localauthority/LocalAuthorityDTO";

/**
 * Contains method to perform localAuthority query
 */
export interface LocalAuthorityQueryService {
    /**
     * Retrieve localAuthority by domain
     *
     * @param domain localAuthority's identifier
     *
     * @returns {Promise<LocalAuthorityDTO>}
     */
    getLocalAuthority(domain: string): Promise<LocalAuthorityDTO>;
}
