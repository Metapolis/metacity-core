/**
 * This part launch application
 */
import "reflect-metadata";
import { App } from "./App";
import { Config } from "./Config";
import { Properties } from "ts-json-properties";

const app = new App();
app.bootstrap();
