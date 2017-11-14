/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Circle } from "./Circle";

/**
 * Represents a user
 */
@Entity()
export class User {

    /**
     * User's identifier
     */
    @PrimaryGeneratedColumn({type: "bigint"})
    private id: number;

    /**
     * User's first name
     */
    @Column({nullable: false})
    private firstName: string;

    /**
     * User's last name
     */
    @Column({nullable: false})
    private lastName: string;

    /**
     * User's password
     */
    @Column({nullable: false})
    private password: string;

    /**
     * User's last connection
     */
    @Column({nullable: true, type: "bigint"})
    private lastConnection: number;

    /**
     * User's avatar URL
     */
    @Column({nullable: true})
    private avatarUrl: string;

    /**
     * User's email
     */
    @Column({nullable: false, unique: true})
    private email: string;

    /**
     * User's circles
     *
     * You have to use getter and setter
     */
    @ManyToMany((type) => Circle, (circle) => "users")
    private circles: Promise<Circle[]>;

    /**
     * Getter identifier
     *
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter lastConnection
     *
     * @returns {number}
     */
    public getLastConnection(): number {
        return this.lastConnection;
    }

    /**
     * Setter lastConnection
     *
     * @param lastConnection new lastConnection value
     */
    public setLastConnection(lastConnection: number): void {
        this.lastConnection = lastConnection;
    }

    /**
     * Getter lastName
     *
     * @returns {string}
     */
    public getFirstName(): string {
        return this.firstName;
    }

    /**
     * Setter lastName
     *
     * @param firstName new lastName value
     */
    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    /**
     * Getter password
     *
     * @returns {string}
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Setter password
     *
     * @param password new password value
     */
    public setPassword(password: string): void {
        this.password = password;
    }

    /**
     * Getter email address
     *
     * @returns {string}
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Setter email address
     *
     * @param {string} email
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Getter lastName
     *
     * @returns {string}
     */
    public getLastName(): string {
        return this.lastName;
    }

    /**
     * Setter lastName
     * @param {string} lastName
     */
    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    /**
     * Getter avatarUrl
     *
     * @returns {string}
     */
    public getAvatarURL(): string {
        return this.avatarUrl;
    }

    /**
     * Setter avatarUrl
     *
     * @param {string} avatarURL
     */
    public setAvatarURL(avatarURL: string): void {
        this.avatarUrl = avatarURL;
    }

    /**
     * Getter circles
     *
     * @returns {Circle[]}
     */
    public getCircles(): Promise<Circle[]> {
        return this.circles;
    }

    /**
     * Setter circle
     *
     * @param circles new circle value
     */
    public setCircles(circles: Promise<Circle[]>): void {
        this.circles = circles;
    }

    /**
     * Return all roles of a user (retrieve these in all circle)
     *
     * @returns {Promise<string[]>}
     */
    public async getRoles(): Promise<string[]> {
        let roles: string[] = [];
        for (const circle of await this.circles) {
            roles = roles.concat(circle.getRoles());
        }

        return roles;
    }
}
