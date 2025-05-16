import { UserEntity } from '../interfaces/users.entity';

export type UserResponseType = Omit<UserEntity, 'password'> & { token: string };
