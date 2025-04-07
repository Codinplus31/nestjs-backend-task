import { Handler } from '@vendia/serverless-express'
import serverlessExpress from '@vendia/serverless-express'
import { bootstrap } from './main'
import { Callback, Context } from 'aws-lambda'

let cachedHandler: Handler

export const handler = async (event: any, context: Context, callback: Callback) => {
  if (!cachedHandler) {
    const app = await bootstrap()
    cachedHandler = serverlessExpress({ app })
  }
  return cachedHandler(event, context, callback)
}
