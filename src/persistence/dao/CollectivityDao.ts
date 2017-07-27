import { Collectivity } from "../domain/Collectivity";

export interface CollectivityDao {

    /**
     * Retrieve collectivity by id
     *
     * @param id identifier to find
     */
    findById(id: string): Promise<Collectivity> | undefined;
}
