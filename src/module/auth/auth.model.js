import { PostgresModel } from "../../db/db.js";

export class LoginModel {
    #db
    constructor() {
        this.#db = new PostgresModel()
    }

    async getAll(){
        const data = await this.#db.fetch(`SELECT * FROM login`)
        return data
    }

    async userRetrieve({ email}) {
        const data = await this.#db.fetch(
            `
            SELECT * FROM login WHERE email = $1 
        `,
            email
        );

        return data;
    }

    async signIn({email,password}){
        const data = await this.#db.fetch(`
        SELECT * FROM login WHERE email = $1 AND password = $2

        
        `,email,password)
        return data
    }

    async signUp({email,password}){
        const data = await this.#db.fetch(`INSERT INTO login (email,password) VALUES ($1,$2) RETURNING id`,email,password )
        return data
    }

    async updateUser({email,status}){
        const data = await this.#db.fetch(`UPDATE login SET status = $1 WHERE email = $2 RETURNING id`,status,email)
        return data
    }
}

export default new LoginModel();
