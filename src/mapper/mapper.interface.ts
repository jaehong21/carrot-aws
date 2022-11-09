import { IModel } from '../model/model.interface';
import { IEntity } from '../entity/entity.interface';

export abstract class IMapper<T, E> {
  abstract createEntity(T: IModel): E;
  abstract createModel(E: IEntity): T;
}
