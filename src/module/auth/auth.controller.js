import LoginService from "./auth.service.js";
class LoginController{


    async getAll(req,res){
        const data = await LoginService.getAll()
        res.status(200).json(data)
    }
    async signIn(req,res){
        const {email,password} = req.body
        const data = await LoginService.signIn({email,password})
        res.status(200).json(data)
    }

    async signUp(req,res){
        const {email,password} = req.body
        const data = await LoginService.signUp({email,password})
        res.status(200).json(data)
    }

    async updateUser(req,res){
        const {email,status} = req.body

        const data = await LoginService.updateUser({email,status})
        res.status(200).json(data)
    }

   

}

export default new LoginController();
