import users from "../../../services/users";

export default async function userRoute(req, res) {
    const userData = await users.getDataById(req.query.id);
    
    if (userData !== undefined) {
        res.json({ message: "OK", id: userData['id'], username: userData['username'] })
    } else {
        res.json({ message: "User with that id doesnt exist" })
    }
}