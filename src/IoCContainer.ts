'use strict'

const awilix = require('awilix')

import MatchesController from './controllers/MatchesController'
import MatchesRepository from './repositories/MatchesRepository'
import errorManagementService from './services/errorManagementService'
import CronJob from './CronJob'

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
})

container.register({
    MatchesController: awilix.asClass(MatchesController).singleton(),
})

container.register({
    MatchesRepository: awilix.asClass(MatchesRepository).singleton(),
    errorManagementService: awilix.asClass(errorManagementService).singleton(),
    conJob: awilix.asClass(CronJob).singleton(),
})

container.loadModules([
    [
        'src/models/**/*.js', {
            lifetime: awilix.Lifetime.TRANSIENT,
            register: awilix.asValue,
    },
    ],
], {
    formatName: name => name,
})

module.exports = container
