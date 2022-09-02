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

// criando video e adicionando na aula, instanciando a classe RoomController e dentro dela pegando o metodo createVideo para passar como controlador desse EndPoint
// No postaman vamos ter dizer qual e o id da aula que vai receber o video
routes.post('/room/:idRoom/create', new RoomController().createVideo)

// criando uma disciplina e adicionando na aula, instanciando a classe RoomController e dentro dela pegando o metodo roomSubject para passar como controlador desse EndPoint
// No postaman vamos ter dizer qual e o id da aula que vai receber a disciplina
routes.post('/room/:idRoom/subject', new RoomController().roomSubject)

// listando todas as aulas, instanciando a classe RoomController e dentro dela pegando o metodo list para passar como controlador desse EndPoint
routes.get('/room', new RoomController().list)

// exportando o routes para poder chamar elas la no index.ts    
export default routes
