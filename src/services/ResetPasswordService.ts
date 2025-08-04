import { User } from "./entities/entitiesInterfaces/User";

export interface ResetPasswordService {
	
	resetPasswordForUser(user: User): void;

}
