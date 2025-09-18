import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken'
import { SiweMessage } from 'siwe'

import { prisma } from "@repo/db/client"



const router: Router = Router()

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: "Auth service is running", timestamp: new Date().toISOString() })
})

router.post('/siwe', async (req: Request, res: Response) => {
    try {
        const { message, signature } = req.body ?? {};
        console.log("Received message:", message)
        console.log("Received signature:", signature)

        if (!message || !signature) {
            return res.status(400).json({ message: "Missing message or signature" });
        }


        const siweMessage = new SiweMessage(message);

        const verifyResult = await siweMessage.verify({ signature });
        if (!verifyResult.success) {
            return res.status(401).json({ message: "Invalid SIWE signature" });
        }

        const address = siweMessage.address;
        console.log(address)
        const jwtSecret = process.env.JWT_SECRET || "dev-secret-change-me";
        const token = jwt.sign(
            { sub: address, address },
            jwtSecret,
            { expiresIn: "1d" }
        );

         const user = await prisma.user.upsert({
             where: { address },
             update: {
                 updatedAt: new Date()
             },
             create: {
                 address,
                 name: null,
                 email: null,
                 bio: null,
             }
         })

        return res.status(200).json({
            user: { 
                address: user.address,
                name: user.name,
                email: user.email,
                bio: user.bio,
                role: user.role
            },
            token
        });
    } catch (error: any) {
        return res.status(400).json({ message: error?.message || "Something Went Wrong" })
    }
})

router.patch('/update-profile', async (req: Request, res: Response) => {
    try {
        const { address, name, email, bio, role } = req.body ?? {};
        const user = await prisma.user.findUnique({
            where: { address }
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const updatedUser = await prisma.user.update({
            where: { address },
            data: { name, email, bio, role }
        })
        return res.status(200).json({ 
            message: "Profile updated successfully",
            user: {
                address: updatedUser.address,
                name: updatedUser.name,
                email: updatedUser.email,
                bio: updatedUser.bio,
                role: updatedUser.role
            }
        })
        
    } catch (error: any) {
        return res.status(400).json({ message: error?.message || "Something Went Wrong" })
    }
})
export default router