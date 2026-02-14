import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await registerUser({ email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}