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
    public joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
        return tableName.split(/(?=[A-Z])/).join("_").toLowerCase() + "_" + propertyName.split(/(?=[A-Z])/).join("_").toLowerCase();
    }

    /**
     * Override
     */
    public joinColumnName(relationName: string, referencedColumnName: string): string {
        return relationName.split(/(?=[A-Z])/).join("_").toLowerCase() + "_" + referencedColumnName.split(/(?=[A-Z])/).join("_").toLowerCase();
    }

    /**
     * Override
     */
    public foreignKeyName(tableName: string, columnNames: string[], referencedTableName: string, referencedColumnNames: string[]): string {
        return referencedTableName.split(/(?=[A-Z])/).join("_").toLowerCase() + "_" + referencedColumnNames.join("_").split(/(?=[A-Z])/).join("_").toLowerCase();
    }
}
