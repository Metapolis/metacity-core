import { Collectivity } from "../domain/Collectivity";

/**
 * Data Access Object of {@link CollectivityDao}
 */
export interface CollectivityDao {

    /**
     * Retrieve collectivity by id
     *
     * @param id identifier to find
     */
    findById(id: string): Promise<Collectivity> | undefined;
}
