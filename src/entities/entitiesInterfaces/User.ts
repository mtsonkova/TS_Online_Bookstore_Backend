interface User {
	
	getFirstName(): string;
	getLastName(): string;
	getPassword(): string;
	getEmail(): string;
	getId(): Number;
	
	setPassword(newPassword: string): void;
	setEmail(newEmail: string): void;
	
	
}
