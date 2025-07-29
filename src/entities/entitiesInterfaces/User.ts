export interface User {
	
	getFirstName(): string;
	getLastName(): string;
	getPassword(): string;
	getEmail(): string;
	getId(): number;
	
	setPassword(newPassword: string): void;
	setEmail(newEmail: string): void;
	
	
}
