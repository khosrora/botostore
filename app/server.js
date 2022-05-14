const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const createError = require('http-errors');
const { AllRoutes } = require('./router/router');

module.exports = class Application {
    #app = express();
    #DB_URI;
    #PORT;
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToDataBase();
        this.createRoutes();
        this.errorHandling();
        this.createServer();
    }


    configApplication() {
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
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