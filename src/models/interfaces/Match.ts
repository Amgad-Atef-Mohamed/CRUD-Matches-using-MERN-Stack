'use strict'

export interface Message {
    _id: string
    homeTeam: string
    awayTeam: string
    startTime: Date
    endTime: Date
    duration: number
    homeTeamScore: number
    awayTeamScore: number
    active: boolean
    league: string
    createdAt: Date
    updatedAt: Date
}

export default Message
