import { Request, Response, NextFunction } from "express";
import axios from "axios";
import globals from "node-global-storage";
import { clearIdToken, setIdToken } from "../utils/bkashStore";

class BkashMiddlewares {
    bkash_auth = async (req: Request, res: Response, next: NextFunction) => {
        clearIdToken();


        try {
            const { data } = await axios.post(
                process.env.BKASH_GRANT_TOKEN_URL as string,
                {
                    app_key: process.env.BKASH_API_KEY,
                    app_secret: process.env.BKASH_SECRET_KEY,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        username: process.env.BKASH_USERNAME as string,
                        password: process.env.BKASH_PASSWORD as string,
                    },
                }
            );

            // Save token globally for later use
            setIdToken(data.id_token);

            console.log("bKash Token:", data);

            next(); // allow request to continue
        } catch (error: any) {
            console.error("bKash Auth Error:", error.response?.data || error.message);
            return res
                .status(401)
                .json({ error: error.response?.data || error.message });
        }
    };
}

export const bkashMiddleware = new BkashMiddlewares();
