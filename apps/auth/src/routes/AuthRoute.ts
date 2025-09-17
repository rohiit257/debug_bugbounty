import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken'
import {SiweMessage} from 'siwe'


const router:Router = Router()

// Health check endpoint
router.get('/health', (req:Request, res:Response) => {
    res.status(200).json({ message: "Auth service is running", timestamp: new Date().toISOString() })
})

router.post('/siwe', async (req:Request, res:Response) => {
    try {
        const { message, signature } = req.body ?? {};
        console.log("Received message:", message)
        console.log("Received signature:", signature)

        if (!message || !signature) {
            return res.status(400).json({ message: "Missing message or signature" });
        }

        // Parse the SIWE message string back to object
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

        return res.status(200).json({
            user: { address },
            token
        });
    } catch (error:any) {
        return res.status(400).json({ message: error?.message || "Something Went Wrong" })
    }
})

export default router