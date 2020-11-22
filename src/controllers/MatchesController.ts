import { Request, Response } from 'express'
import * as Joi from 'Joi'

import BaseController from './BaseController'
import Match from './../models/interfaces/Match'

/**
 * @class MatchesController
 * @extends BaseController
 */
export default class MatchesController extends BaseController {
  private errorManagementService: any
  private MatchesRepository: any

  constructor(otps) {
    super()

    this.errorManagementService = otps.errorManagementService
    this.MatchesRepository = otps.MatchesRepository
  }

  public applyRoutes() {
    this.router.get('/', this.list.bind(this))
    this.router.post('/', this.create.bind(this))
    this.router.get('/:matchId', this.findById.bind(this))
    this.router.patch('/:matchId', this.updateById.bind(this))
    this.router.delete('/:matchId', this.deleteById.bind(this))

    return this.router
  }

  /**
   * list The Marches handler.
   *
   * @class MatchesController
   * @method list
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return {Promise<Response>}
   */
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const matches: Match[] = await this.MatchesRepository.find(req.query)

      return super.render(res, 200, matches)
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }

  /**
   * Create new Match handler.
   *
   * @class MatchesController
   * @method create
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return {Promise<Response>}
   */
  public async create(req: Request, res: Response): Promise<Response> {
    try {

      const schema = Joi.object({
        homeTeam: Joi.string().required(),
        awayTeam: Joi.string().required(),
        homeTeamScore: Joi.number().min(0).required(),
        awayTeamScore: Joi.number().min(0).required(),
        active: Joi.boolean().required(),
        league: Joi.string().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
      })

      const { error } = schema.validate(req.body, { allowUnknown: false })

      if(error) {
        return res.status(400).send({ message: error.details.map(i => i.message).join(',') })
      }

      const matchObject: Match = await this.MatchesRepository.create(req.body)

      return super.render(res, 201, matchObject)
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }

  /**
   * find Match By It`s Id handler.
   *
   * @class MatchesController
   * @method findById
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return {Promise<Response>}
   */
  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const match: Match = await this.MatchesRepository.findById(req.params.matchId)

      return super.render(res, 200, match)
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }

  /**
   * update Match By It`s Id handler.
   *
   * @class MatchesController
   * @method updateById
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return {Promise<Response>}
   */
  public async updateById(req: Request, res: Response): Promise<Response> {
    try {
      const schema = Joi.object({
        homeTeam: Joi.string().required(),
        awayTeam: Joi.string().required(),
        homeTeamScore: Joi.number().min(0).required(),
        awayTeamScore: Joi.number().min(0).required(),
        active: Joi.boolean().required(),
        league: Joi.string().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
      })

      const { error } = schema.validate(req.body, { allowUnknown: false })

      if(error) {
        return res.status(400).send({ message: error.details.map(i => i.message).join(',') })
      }



      const updatedMatch: Match = await this.MatchesRepository.updateById(req.params.matchId, req.body)

      return super.render(res, 200, updatedMatch)
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }


  /**
   * delete Match By It`s Id handler. handler.
   *
   * @class AuthenticationController
   * @method delete
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return {Promise<Response>}
   */
  public async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      await this.MatchesRepository.deleteById(req.params.matchId)

      return super.render(res, 201)
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }
}
