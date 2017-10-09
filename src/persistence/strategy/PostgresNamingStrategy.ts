import { DefaultNamingStrategy, NamingStrategyInterface } from "typeorm";

/**
 * Naming strategy for postgreSQL
 */
export class PostgresNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

    /**
     * Override
     */
    public columnName(propertyName: string, customName: string): string {
        return customName ? customName : propertyName.split(/(?=[A-Z])/).join("_").toLowerCase();
    }

    /**
     * Override
     */
    public relationName(propertyName: string): string {
        return propertyName.split(/(?=[A-Z])/).join("_").toLowerCase();
    }
}
