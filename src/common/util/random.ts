import { randomBytes } from 'crypto'

export const generateRandomNumber = (
  min: number,
  max: number
): number => Math.floor(Math.random() * (max - (min + 1))) + min

export const generateRandomString = (numOfBytes = 6) => randomBytes(numOfBytes).toString('base64')
