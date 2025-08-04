import { User } from "./entities/entitiesInterfaces/User";

export interface UserManagementService {

	registerUser(user: User): string;
	
	getUsers(): User[];

	getUserByEmail(userEmail: string): User | null;

}
