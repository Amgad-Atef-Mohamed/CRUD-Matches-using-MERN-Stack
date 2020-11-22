'use strict'

import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  homeTeam: { type: String },
  awayTeam: { type: String },
  startTime: { type: Date },
  endTime: { type: Date },
  duration: { type: Number },
  homeTeamScore: { type: Number },
  awayTeamScore: { type: Number },
  active: { type: Boolean },
  league: { type: String },
}, {
  timestamps: true,
})

// indexes
schema.index({ homeTeam: 1 })
schema.index({ awayTeam: 1 })
schema.index({ startTime: 1, endTime: 1 })

schema.on('index',  (err) => {
  if (err) {
    console.log(err)
  }
})

module.exports = mongoose.model('Matches', schema)
