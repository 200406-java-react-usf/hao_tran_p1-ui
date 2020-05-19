  
export class NewUser {

    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role_name: string;
    
    constructor(
        un: string,
        pw: string,
        fn: string, 
        ln: string, 
        email: string,
        role: string
        ) 
    {
        this.username = un;
        this.password = pw;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.role_name = role;
    }
}