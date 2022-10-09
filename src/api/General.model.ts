import { AutoIncrement, Column, CreatedAt, DeletedAt, Model, PrimaryKey, UpdatedAt } from "sequelize-typescript";

export class GeneralModel<T> extends Model<T> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;

  @Column({ field: "created_at", allowNull: false })
  @CreatedAt
  createdAt?: Date;
  @Column({ field: "updated_at", allowNull: false })
  @UpdatedAt
  updatedAt?: Date;
  @Column({ field: "deleted_at", allowNull: true })
  @DeletedAt
  deletedAt?: Date;


}
