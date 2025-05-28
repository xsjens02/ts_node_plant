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

/**
 * Initializes the application by configuring all core components.
 * 
 * The sequence of configuration is:
 * 1. Services - shared services
 * 2. Databases - database connections and setup (async)
 * 3. Repositories - data access layers
 * 4. CDN - content delivery network services
 * 5. UseCases - business logic managers
 * 6. Handlers - authorization and request handlers
 * 7. Controllers - API and WebSocket controllers
 */
export async function initApp() {
    configureServices();
    await configureDatabases(); // async init for DB connections
    configureRepositories();
    configureCDN();
    configureUseCases();
    configureHandlers();
    configureControllers();
}