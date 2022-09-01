import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Room } from './Room'

@Entity('videos') // nome da tabela
export class Video {
	@PrimaryGeneratedColumn() // chave primaria e auto incremento
	id: number

	@Column({ type: 'text' }) // coluna do tipo texto
	title: string

	@Column({ type: 'text' })
	url: string

	// fazendo o relacionamento com as entidades rom e videos ou seja uma aula ela pode ter varios videos, começamos a fazer os relacionamentos sempre na entidade que vai ficar a chave estrangeira

	// @ManyToOne relacionamento de muitos para um e configurando o inverso

	@ManyToOne(() => Room, room => room.videos) 

	// criando o nome da chave estrangeira que vai estar no banco de dados
	@JoinColumn({ name: 'room_id' })
	room: Room
}
