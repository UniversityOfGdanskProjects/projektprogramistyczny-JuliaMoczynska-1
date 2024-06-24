import Keycloak from 'keycloak-connect';
import session from 'express-session';
import keycloakConfig from '../keycloak-config.json' assert { type: 'json' };

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

export {memoryStore, keycloak};