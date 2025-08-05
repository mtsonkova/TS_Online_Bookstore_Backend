import {User} from 'src/entities/entitiesInterfaces/User';

export interface UserStoringService {
	
	saveUser(user: User):void;
	
	loadUsers(): User[];
	
}
