import {
	Column,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Subject } from './Subject'
import { Video } from './Video'

@Entity('rooms') // nome da entidade
export class Room {
	@PrimaryGeneratedColumn() // chave primaria e auto incremento
	id: number

	@Column({ type: 'text' }) // coluna do tipo texto
	name: string

	@Column({ type: 'text', nullable: true })
	description: string

	// fazendo o relacionamento de um para muitos entre as entidades romm e videos, e o inverso
	@OneToMany(() => Video, video => video.room)
	videos: Video[]

	// 
	@ManyToMany(() => Subject, subject => subject.rooms)
	subjects: Subject[]
}
