import { Request, Response } from 'express'
import { roomRepository } from '../repositories/roomRepository'
import { subjectRepository } from '../repositories/subjectRepository'
import { videoRepository } from '../repositories/videoRepository'

// criando um crud para aula
export class RoomController {

	// criando uma aula
	async create(req: Request, res: Response) {
		
		// pegando do body 
		const { name, description } = req.body

		// não se esqueça de criar na pasta do repositories o arquivo romRepository

		try { // vamos criar um repositorio no banco de dados, criando uma nova aula
			const newRoom = roomRepository.create(
			{ 	name, 
				description 
			})

			// salvando a nova aula no banco de dados
			await roomRepository.save(newRoom)

			// retornando os dados da aula criada
			return res.status(201).json(newRoom)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	// criando o video para a aula e adicionando na aula
	async createVideo(req: Request, res: Response) {

		// pegando do body 
		const { title, url } = req.body

		// pegando do parametro de rota aonde vamos ter que passar o id da aula para poder adicionar o video a ela
		const { idRoom } = req.params

		try { // verficando se a aula ja existe
			const room = await roomRepository.findOneBy({ id: Number(idRoom) })
			if (!room) {
				return res.status(404).json({ message: 'Aula não existe' })
			}

			// criando o video e adicionando o video para a aula
			const newVideo = videoRepository.create({
				title,
				url,

				// passano o relacionamento que eu quero criar para o video
				room, 
			})

			// salvando o video no banco de dados
			await videoRepository.save(newVideo)

			// retornando os dados do video criado
			return res.status(201).json(newVideo)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	// adicionando uma disciplina na aula
	async roomSubject(req: Request, res: Response) {

		// subject_id vai ser o id da disciplina que vai ser adicionado
		const { subject_id } = req.body

		// pegando do parametro de rota aonde vamos ter que passar o id da aula para poder adicionar a disciplina a ela
		const { idRoom } = req.params

		try {
			// verificando se o romm: aula existe
			const room = await roomRepository.findOneBy({ id: Number(idRoom) })
			if (!room) {
				return res.status(404).json({ message: 'Aula não existe' })
			}

			// pegando a disciplina do repository: banco de dados
			const subject = await subjectRepository.findOneBy({
				id: Number(subject_id),
			})

			// se a discipina não existir não consigo adicionar nada 
			if (!subject) {
				return res.status(404).json({ message: 'Disciplina não existe' })
			}

			// adicinando a disciplina na aula
			const roomUpdate = {
				// pegando todo o objeto que tem dentro de  romm
				...room,

				// aperte ctrl + espaço para trazer a lista do que quer adicionar

				subjects: [subject], // array para poder adicionar varias disciplinas para a aula
			}

			// adicionando a disciplina no banco de dados
			await roomRepository.save(roomUpdate)

			return res.status(200).json(room)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	// listando todas as aulas e videos
	async list(req: Request, res: Response) {
		try {
			// pegando todas as aulas
			const rooms = await roomRepository.find({

				// vou dizer quais relacionamentos que eu quero trazer dessa aula 	
				relations: { 						
					subjects: true,
					videos: true,
				
				},
			})

			return res.status(200).json(rooms)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}
}
