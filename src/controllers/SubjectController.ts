import { Request, Response } from 'express'
import { subjectRepository } from '../repositories/subjectRepository'

// criando um crud para disciplinas
export class SubjectController {
	async create(req: Request, res: Response) {

		// vou passar aqui o que eu vou pegar do body
		const { name } = req.body

		// fazendo a validação do campo name que vem do body
		if (!name) {
			return res.status(400).json({ message: 'O nome é obrigatório' })
		}

		// vamos trabalhar com o Data Mapper pattern que ele trabalha com repositorio ou seja tudo que nos queremos criar novas funcionalidades ou pegar informações do repositorio(banco de dados), crie uma pasta chamada repositories e um arquivo com o nome do repositorio subjectRepository.ts
		try {
			// vamos criar um repositorio no banco de dados, criando uma nova disciplina
			const newSubject = subjectRepository.create({ name })

			// salvando a minha nova disciplina no banco de dados
			await subjectRepository.save(newSubject)

			// retornando os dados da disciplina criada
			return res.status(201).json(newSubject)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}
}
