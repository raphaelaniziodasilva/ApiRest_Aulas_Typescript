import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'

AppDataSource.initialize().then(() => {
	// configurando o express
	const app = express()

	// vamos trabalha com os tipos de dados em json
	app.use(express.json())

	// chamando as rotas la do arquivo de rotas
	app.use(routes)

	// a porta que o express vai ficar escutando
	app.listen(3000, () => {
		console.log("Server started on por 3000")
	})
})
