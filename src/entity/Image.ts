import { Column } from "typeorm"
import { AppBaseEntity } from "./BaseEntity"

export class Image extends AppBaseEntity {
  @Column()
  filename: string 
  @Column()
  mimetype: string 
  @Column()
  size: number 
  @Column()
  host?: string 
  @Column()
  path?: string 
  @Column()
  url: string 
}