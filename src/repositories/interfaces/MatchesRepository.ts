'use strict'

import Match from './../../models/interfaces/Match'

interface Filters {
  fromDate?: Date
  toDate?: Date
  teamName?: string
}

export interface MessagesRepository {
  find(filters: Filters): Promise<Match[]>
  create(messageObject: Match): Promise<Match>
  findById(matchId: string): Promise<Match>
  updateById(matchId: string, data: Match): Promise<Match>
  deleteById(matchId: string): Promise<void>
}

export default MessagesRepository
