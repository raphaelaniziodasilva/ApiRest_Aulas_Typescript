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
			const newRoom = roomRepository.create({ name, description })

			// salvando a nova aula no banco de dados
			await roomRepository.save(newRoom)

			// retornando os dados da aula criada
			return res.status(201).json(newRoom)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	// criando o video para a aula e adicionando na aula PARAMOS EM 1:38:00
	async createVideo(req: Request, res: Response) {

		// pegando do body 
		const { title, url } = req.body

		// pegando do parametro de rota
		const { idRoom } = req.params

		try { // verficando se a aula ja existe
			const room = await roomRepository.findOneBy({ id: Number(idRoom) })
			if (!room) {
				return res.status(404).json({ message: 'Aula não existe' })
			}

			// adicionando um video para a aula
			const newVideo = videoRepository.create({
				title,
				url,

				// passano o relacionamento que eu quero criar para o video
				room, 
			})

			await videoRepository.save(newVideo)

			return res.status(201).json(newVideo)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	// criando disciplina e adicionando na aula
	async roomSubject(req: Request, res: Response) {
		const { subject_id } = req.body
		const { idRoom } = req.params

		try {
			const room = await roomRepository.findOneBy({ id: Number(idRoom) })

			if (!room) {
				return res.status(404).json({ message: 'Aula não existe' })
			}

			const subject = await subjectRepository.findOneBy({
				id: Number(subject_id),
			})

			if (!subject) {
				return res.status(404).json({ message: 'Disciplina não existe' })
			}

			const roomUpdate = {
				...room,
				subjects: [subject],
			}

			await roomRepository.save(roomUpdate)

			return res.status(204).send()
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	async list(req: Request, res: Response) {
		try {
			const rooms = await roomRepository.find({
				relations: {
					subjects: true,
					videos: true,
				},
			})

			return res.json(rooms)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}
}
