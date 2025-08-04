import {User} from './entities/entitiesInterfaces/User';
import hash from 'object-hash';


export class UserForHashTables implements User {
	
	private static userCounter: number = 0;
	
	private id: number;
	private firstName: string;
	private lastName: string;
	private password: string;
	private email: string;

		
	public constructor(id: number, firstName: string, lastName: string, password: string, email: string) {
		this.id = id ?? ++UserForHashTables.userCounter;
        UserForHashTables.userCounter--; // to keep sequantial id
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
		UserForHashTables.userCounter = 0;
	}

	// public hashCode(): number {
	// 	return Objects.hash(this.email, this.firstName, this.id, this.lastName, this.password);
	// }

    public hashCode(): string {
  return hash({
    email: this.email,
    firstName: this.firstName,
    id: this.id,
    lastName: this.lastName,
    password: this.password
  });
}

public equals(obj: any): boolean {
  if (this === obj) return true;
  if (!obj || !(obj instanceof UserForHashTables)) return false;

  return this.email === obj.email &&
         this.firstName === obj.firstName &&
         this.id === obj.id &&
         this.lastName === obj.lastName &&
         this.password === obj.password;
}
	
	
}
