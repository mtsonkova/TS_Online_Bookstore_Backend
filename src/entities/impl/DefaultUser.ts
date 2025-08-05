import { validate } from 'src/annotations/validate';
import {User} from 'src/entities/entitiesInterfaces/User';

export class DefaultUser implements User {
	
	private static userCounter: number = 0;
	
	private id: number;
	
	@validate('[a-zA-Z]+')
	private firstName: string;
	
	@validate('[a-zA-Z]+')
	private lastName: string;
	
	private password: string;
	
	@validate('.+@.+')
	private email: string;

	constructor(id?: number, firstName?: string, lastName?: string, password?: string, email?: string) {
		this.id = id ?? ++DefaultUser.userCounter;
        DefaultUser.userCounter--; // to keep sequantial id
        this.firstName = firstName ?? '';
		this.lastName = lastName ?? '';
		this.password = password ?? '';
		this.email = email ?? '';
	}

	public getFirstName(): string {
		return this.firstName;
	}

	public getLastName(): string {
		return this.lastName;
	}

	public getPassword(): string {
		return this.password;
	}

	public getEmail(): string {
		return this.email;
	}
	
	public toString(): string {
		return "ID: " + this.getId() + "\t\t" +
				"First Name: " + this.getFirstName() + "\t\t" +
				"Last Name: " + this.getLastName() + "\t\t" +
				"Email: " + this.getEmail();
	}

	public setPassword(password: string): void {
		if (password == null) {
			return;
		}
		this.password = password;
	}

	public setEmail(newEmail: string): void {
		if (newEmail == null) {
			return;
		}
		this.email = newEmail;
	}

	public getId(): number {
		return this.id;
	}
	
	clearState(): void {
		DefaultUser.userCounter = 0;
	}
	
	public static setCounter(updatedCount: number): void {
		DefaultUser.userCounter = updatedCount;
	}
}
