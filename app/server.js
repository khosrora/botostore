const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { AllRoutes } = require('./router/router');
const core = require('cors');

module.exports = class Application {
    #app = express();
    #DB_URI;
    #PORT;
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToDataBase();
        this.initRedis();
        this.createRoutes();
        this.errorHandling();
        this.createServer();
    }


    configApplication() {
        this.#app.use(core());
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
        this.#app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition: {
                info: {
                    title: "boto Store",
                    version: "1.0.0",
                    description: "website for sell course and learn",
                    contact: {
                        name: "khosroRA",
                        email: "khosrora153333@gmail.com"
                    }
                },
                servers: [
                    {
                        url: "http://localhost:5000"
                    }
                ]
            },
            apis: ["./app/router/**/*.js"]
        })))
    }
    createServer() {
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`run > http://localhost:${this.#PORT}`);
        })
    }
    connectToDataBase() {
        mongoose.connect(this.#DB_URI, (err) => {
            if (err) return console.log(err);
            return console.log(` <-------- connected to database -------->`);
        });
        mongoose.connection.on("connected", () => {
            console.log("mongoose connected to DB");
        })
        mongoose.connection.on("disconnected", () => {
            console.log("mongoose disConnected to DB");
        })
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        })
    };
    initRedis() {
        require('./utils/init_redis');
    }
    createRoutes() {
        this.#app.use(AllRoutes)
    };
    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("آدرس مورد نظر پیدا نشد"));
        });
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                data: null,
                errors: {
                    statusCode,
                    message
                }
            });
        })
    };

}