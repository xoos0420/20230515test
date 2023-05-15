import express from "express";
import cors from "cors";
import morgan from "morgan";
import studentRouter from './router/student.js'; 
import scoreRouter from './router/score.js'; 
import { config } from "./config.js";
import { Sequelize } from "./db/database.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined')); // 또는 'dev' 등 적절한 로그 형식을 선택할 수 있습니다.

app.use('/student', studentRouter);
app.use('/score', scoreRouter);

app.use((req, res) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

Sequelize.sync()
    .then(() => {
        const server = app.listen(config.host.port);
    });