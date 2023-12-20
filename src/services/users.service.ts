import {User} from "./user";
import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

const NAMES: string[] = [
    'Maia',
    'Asher',
    'Olivia',
    'Atticus',
    'Amelia',
    'Jack',
    'Charlotte',
    'Theodore',
    'Isla',
    'Oliver',
    'Isabella',
    'Jasper',
    'Cora',
    'Levi',
    'Violet',
    'Arthur',
    'Mia',
    'Thomas',
    'Elizabeth',
];
const EMAILS: string[] = [
    'Asher@email.fr',
    'Atticus@email.fr',
    'Amelia@email.fr',
    'Maia@email.fr',
    'Olivia@email.fr',
    'Jack@email.fr',
    'Oliver@email.fr',
    'Charlotte@email.fr',
    'Isla@email.fr',
    'Isabella@email.fr',
    'Cora@email.fr',
    'Violet@email.fr',
    'Jasper@email.fr',
    'Levi@email.fr',
    'Theodore@email.fr',
    'Arthur@email.fr',
    'Elizabeth@email.fr',
    'Thomas@email.fr',
    'Mia@email.fr',
];
export const OCCUPATIONS: string[] = [
  'Maintainer in nuclear units',
  'Swimming teacher',
  'Plumber',
  'Pony rider',
  'High performance athlete'
]

const SNACKBAR_DURATION = 3000;

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private static LOCAL_STORAGE_USERS_KEY = 'users-angular-app-2135325';
    private users: User[]= [];

    constructor(private readonly snackBar: MatSnackBar) {
      this.initializeUsers();
    }

    public getUniqueId() {
        let bigId = 0;
        this.users.forEach(user => {
          if (user.id > bigId) bigId = user.id
        })
        return bigId + 1;
    }

    public initializeUsers() {
        if ( localStorage.getItem(UsersService.LOCAL_STORAGE_USERS_KEY) !== null ) {
            JSON.parse(localStorage.getItem(UsersService.LOCAL_STORAGE_USERS_KEY) as string).forEach( (user: User) => {
                this.users.push(user);
            })
        } else {
          const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
          users.forEach(user => this.users.push(user));
        }
    }

    public getAllUsers() {
        return this.users;
    }

    public getUserById(id: number) {
      return this.users.find(user => user.id === id);
    }

    public addUser(user: User) {
      this.users.push(user);
      this.snackBar.open(`New user ${user.name} added successfully`, 'OK', {
        duration: SNACKBAR_DURATION,
      });
    }

    public deleteUser(id: number) {
      const user = this.users.find(user => user.id === id);
      if (user) {
        this.users.splice(this.users.indexOf(user), 1);
        this.snackBar.open(`User ${user.name} deleted successfully`, 'OK', {
          duration: SNACKBAR_DURATION,
        });
      }
    }

    public saveOnBrowser() {
      localStorage.setItem(UsersService.LOCAL_STORAGE_USERS_KEY, JSON.stringify(this.users));
      this.snackBar.open(`Your user list have been saved`, 'COOL', {
        duration: SNACKBAR_DURATION,
      });
    }

}

function createNewUser(id: number): User {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
        ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
        '.';

    const email = EMAILS[Math.round(Math.random() * (NAMES.length - 1))];
    const occupation = OCCUPATIONS[Math.round(Math.random() * (OCCUPATIONS.length - 1))];

    return {
        id: id,
        name: name,
        email: email,
        occupation: occupation,
        bio: '',
    };
}
