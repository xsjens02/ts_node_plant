import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { configure as configureServices} from './ConfigServices.js';
import { configure as configureDatabases} from './ConfigDatabases.js';
import { configure as configureRepositories} from './ConfigRepositories.js';
import { configure as configureCDN } from './ConfigCDN.js';
import { configure as configureUseCases} from './ConfigUseCases.js';
import { configure as configureHandlers} from './ConfigHandlers.js';
import { configure as configureControllers} from './ConfigControllers.js'; 

export async function initApp() {
    configureServices();
    await configureDatabases();
    configureRepositories();
    configureCDN();
    configureUseCases();
    configureHandlers();
    configureControllers();
}