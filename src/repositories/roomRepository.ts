import { AppDataSource } from '../data-source'
import { Room } from '../entities/Room'

// vai pegar o que precisamos da entidade Room
export const roomRepository = AppDataSource.getRepository(Room)
