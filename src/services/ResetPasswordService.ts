import { User } from "@src/entities/entitiesInterfaces/User";

export interface ResetPasswordService {
	
	resetPasswordForUser(user: User): void;

}
