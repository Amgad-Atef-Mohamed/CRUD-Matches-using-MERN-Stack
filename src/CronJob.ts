'use strict'

const cron = require('node-cron')
import * as chalk from 'chalk'

export default class CronJob {
  private MatchesRepository: any

  constructor(otps) {
    this.MatchesRepository = otps.MatchesRepository
  }

  start () {
    try {
      console.log(chalk.green('[Cron-Jon] Running every 15 M'))
      cron.schedule('0,15,30,45 * * * *', async () => {
        await this.MatchesRepository.activateUnActiveMatch()
        console.log('Activated Matches successful')
      }, {
        scheduled: true,
        timezone: 'Asia/Riyadh'
      });
    }
    catch (e) {
      console.error(e);
    }
  }
};
