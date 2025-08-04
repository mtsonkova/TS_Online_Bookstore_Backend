import {User} from './entities/entitiesInterfaces/User';

export interface UserStoringService {
	
	saveUser(user: User):void;
	
	loadUsers(): User[];
	
}
