const joi = require('@hapi/joi');
const { MongoIdPattern } = require('../../../utils/constance');

const addCategorySchema = joi.object({
    title: joi.string().min(3).max(30).error(new Error("عنوان دسته بندی را بین 3 و 30 کاراکتر در نظر بگیرید")),
    parent: joi.string().allow("").pattern(MongoIdPattern).error(new Error("دسته بندی اصلی را انتخاب کنید"))
});

const updateCategorySchema = joi.object({
    title: joi.string().min(3).max(30).error(new Error("عنوان دسته بندی را بین 3 و 30 کاراکتر در نظر بگیرید")),
});

module.exports = {
    addCategorySchema,
    updateCategorySchema
}