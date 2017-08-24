import { CollectivityDTO } from "./dto/collectivity/CollectivityDTO";
/**
 * Contains method to perform collectivity query
 */
export interface CollectivityQueryService {

    /**
     * Retrieve collectivity by domain
     *
     * @param domain collectivity's identifier
     *
     * @returns {Promise<CollectivityDTO>}
     */
    findCollectivity(domain: string): Promise<CollectivityDTO>;
}