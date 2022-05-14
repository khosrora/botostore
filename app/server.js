const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
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
            return res.status(404).json({ statusCode: 404, message: "آدرس مورد نظر پیدا نشد" });
        })
        this.#app.use((error, req, res, next) => {
            const statusCode = error.status || 500;
            const message = error.message || "internal server error";
            return res.status(statusCode).json({ statusCode, message });
        })
    };

}