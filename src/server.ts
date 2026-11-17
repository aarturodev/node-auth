import express, { type Express } from "express";

export const createServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/health", (_req, res) => {
        res.json({
            ok: true,
            message: "API funcionando"
        });
    });
    return app;
}
