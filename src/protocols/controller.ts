import { Request, Response } from 'express'

export interface Controller {
  create: (req: Request, res: Response) => Promise<Response>
  update: (req: Request, res: Response) => Promise<Response>
  findAll: (req: Request, res: Response) => Promise<Response>
  findOne: (req: Request, res: Response) => Promise<Response>
  delete: (req: Request, res: Response) => Promise<Response>
  done: (req: Request, res: Response) => Promise<Response>
  late: (req: Request, res: Response) => Promise<Response>
  today: (req: Request, res: Response) => Promise<Response>
  week: (req: Request, res: Response) => Promise<Response>
  month: (req: Request, res: Response) => Promise<Response>
  year: (req: Request, res: Response) => Promise<Response>
}
