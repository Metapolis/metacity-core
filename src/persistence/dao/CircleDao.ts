import { ActivityCircle } from "../domain/ActivityCircle";

/**
 * Data Access Object of {@link CircleDao}
 */
export interface CircleDao {

    /**
     * Save or update a circle
     *
     * @param {ActivityCircle} circle to save
     *
     */
    saveOrUpdate(circle: ActivityCircle): void | undefined;
}
