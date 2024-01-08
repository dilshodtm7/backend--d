import { LoginModel } from "./auth.model.js";

class LoginService {
    #_loginModel;

    constructor() {
        this.#_loginModel = new LoginModel();
    }

    async getAll() {
        const data = await this.#_loginModel.getAll();
        return data;
    }

    async signUp({ email, password }) {
        const user = await this.#_loginModel.signIn({
            email,
            password,
        });

        const retrieve = await this.#_loginModel.userRetrieve({
            email,
        });

        console.log(retrieve);

        try {
            if (email === user[0].email && password === user[0].password) {
                return {
                    email,
                    uuid: retrieve[0].id,
                    messagestatus: retrieve[0].status,
                    successfully: 207,
                };
            }
        } catch (error) {
            if (retrieve[0]) {
                return {
                    message: "Invalid Email or Password",
                    successfully: 401,
                };
            } else {
                const data = await this.#_loginModel.signUp({
                    email,
                    password,
                });
                return {
                    message: "User Successfully created",
                    email,
                    successfully: 207,
                };
            }
        }
    }

    async updateUser({ email, status }) {
        const data = await this.#_loginModel.updateUser({ email, status });
        const [user] = await this.#_loginModel.userRetrieve({
            email
            
        });

        if (user) {
            return {
                 data:data[0].id,
                message: "User Successfully activated",
                
                status: 201,
            };
        }

        return {
            message: "User not found",
            status: 201,
        };
    }
}

export default new LoginService();
