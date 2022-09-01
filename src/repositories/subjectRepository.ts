import { AppDataSource } from '../data-source'
import { Subject } from '../entities/Subject'

// vai pegar o que precisamos da entidade Subject
export const subjectRepository = AppDataSource.getRepository(Subject)
