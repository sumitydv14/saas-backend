import bcrypt from "bcryptjs";
import { signToken } from "../../utils/jwt.js";
import prisma from "../../config/prisma.js";

export const registerUser = async ({ email, password }) => {     
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if(existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    })

    const freePlan = await prisma.plan.findUnique({
        where: { name: "FREE" }
    });

    if(!freePlan) {
        throw new Error("Free plan not found. Please seed the database.");
    }

    await prisma.subscription.create({
        data: {
            userId: newUser.id,
            planId: freePlan.id,
            status: "active"
        }
    })

    return {
        id: newUser.id,
        email: newUser.email
    }
}

export const loginUser = async ({email, password}) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if(!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    const token = signToken({ id: user.id, email: user.email });
    return {
        token
    }
}
   
export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id }
    });
    return user ? { id: user.id, email: user.email } : null;
}
