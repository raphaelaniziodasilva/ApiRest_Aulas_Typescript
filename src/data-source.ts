// configurando a conexão do TypeOrm com o bamco de dados. Utilize o site TypeRom e utilize os exemplos

import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
	type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Vaizards1$",
    database: "movie",
    synchronize: true,
    logging: true,

    // configurando as entidades e migration para poder fazer a criação das entidades no banco de dados

	entities: [`${__dirname}/**/entities/*.{ts,js}`], // pegando todas as entidades que estão dentro da pasta entities
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`], // pegando todas os arquivos que estão dentro da pasta migration

    /* Agora execute o comando npm run migration:generate para gerar as tabelas com base nas entidaes na pasta   migations

    Execute o comando npm run migration:run para criar as tabelas dentro do banco de dados
    */
})

// Agora va para o index.ts terminar a conexão com o banco de dados
    