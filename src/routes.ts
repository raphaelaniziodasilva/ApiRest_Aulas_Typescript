// importando o router para poder criar as rotas
import { Router } from 'express'
import { RoomController } from './controllers/RoomController'
import { SubjectController } from './controllers/SubjectController'

// criando o router
const routes = Router()

// criando disciplina, instanciando a classe SubjectController e dentro dela pegando o metodo create para passar como controlador desse EndPoint
routes.post('/subject', new SubjectController().create)

// criando sala, instanciando a classe RoomController e dentro dela pegando o metodo create para passar como controlador desse EndPoint
routes.post('/room', new RoomController().create)

routes.get('/room', new RoomController().list)

// criando video e adicionando na aula, instanciando a classe RoomController e dentro dela pegando o metodo createVideo para passar como controlador desse EndPoint
routes.post('/room/:idRoom/create', new RoomController().createVideo)

// criando uma disciplina e adicionando na aula
routes.post('/room/:idRoom/subject', new RoomController().roomSubject)

// exportando o routes para poder chamar elas la no index.ts    
export default routes
