'use strict'

import Match from '../models/interfaces/Match'

const MatchModel = require('./../models/MatchModel')
import MatchesRepositoryInterface from './interfaces/MatchesRepository'
import {string} from 'joi'



export default class MatchesRepository implements MatchesRepositoryInterface {
  private MatchModel: any

  constructor() {
    this.MatchModel = MatchModel
  }

  public find(filters): Promise<Match[]> {
    const query: { [p: string]: any } = {}

    if(filters.fromDate || filters.toDate) {
      query.startTime = {}

      if(filters.fromDate) {
        query.startTime.$gte = new Date(filters.fromDate)
      }

      if(filters.toDate) {
        query.startTime.$lte = new Date(filters.toDate)
      }
    }

    if(filters.teamName) {
      query.$or = [{ homeTeam: { $regex: filters.teamName } }, { awayTeam: { $regex: filters.teamName } }]
    }


    return this.MatchModel.find(query)
        .lean()
        .sort({ startTime: 1 })
        .limit(10)
  }

  public create(matchObject: Match): Promise<Match> {
    return this.MatchModel.create(matchObject)
  }

  public findById(matchId): Promise<Match>{
    return this.MatchModel.findById(matchId)
  }

  public updateById(matchId, data): Promise<Match> {
    return this.MatchModel.findOneAndUpdate({ _id: matchId }, { $set: data}, { new: true, lean: true })
  }

  public deleteById(matchId): Promise<void> {
    return this.MatchModel.deleteOne({ _id: matchId })
  }

  public activateUnActiveMatch(): Promise<Match[]> {
    return this.MatchModel.updateMany({ active: false, startTime: { $lte: new Date() } }, { $set: { active: true }})
  }
}
