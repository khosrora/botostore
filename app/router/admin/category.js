const router = require('express').Router();
const categoryController = require('../../http/controllers/admin/category.controller');



/**
 * @swagger
 * /admin/category/add:
 *  post:
 *      summery: addcategory 
 *      tags: [Category(Admin-Panel)]
 *      description: create category in admin panel
 *      parameters:
 *          -   in: formData
 *              name: title
 *              required: true 
 *              type: string
 *          -   in: formData
 *              name: parent
 *              type: string 
 *      responses: 
 *          201:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.post("/add", categoryController.addCategory);
/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      summery: get category 
 *      tags: [Category(Admin-Panel)]
 *      description: get all parents categories
 *      responses: 
 *          200:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.get("/parents", categoryController.getAllParents);
/**
 * @swagger
 * /admin/category/children/{parent}:
 *  get:
 *      summery: get children 
 *      tags: [Category(Admin-Panel)]
 *      description: get children of parents
 *      parameters:
 *          -   in: path
 *              name: parent
 *              required: true 
 *              type: string
 *      responses: 
 *          200:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.get("/children/:parent", categoryController.getChildOfParents);
/**
 * @swagger
 * /admin/category/all:
 *  get:
 *      summery: get all categories 
 *      tags: [Category(Admin-Panel)]
 *      description: get all categories 
 *      responses: 
 *          200:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.get("/all", categoryController.getAllCategory);
/**
 * @swagger
 * /admin/category/list-of-all:
 *  get:
 *      summery: list all
 *      tags: [Category(Admin-Panel)]
 *      description: list all categories
 *      responses: 
 *          200:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.get("/list-of-all", categoryController.getAllCategoryWithoutPopulate);
/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *      summery:  remove categories 
 *      tags: [Category(Admin-Panel)]
 *      description:  remove categories 
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true 
 *              type: string
 *      responses: 
 *          200:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.delete("/remove/:id", categoryController.removeCategory);
/**
 * @swagger
 * /admin/category/get-category/{id}:
 *  get:
 *      summery: get category 
 *      tags: [Category(Admin-Panel)]
 *      description: get one category by id
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true 
 *              type: string
 *      responses: 
 *          200:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.get("/get-category/:id", categoryController.getCategoryById);
/**
 * @swagger
 * /admin/category/update/{id}:
 *  patch:
 *      summery: update category 
 *      tags: [Category(Admin-Panel)]
 *      description: update category by id
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true 
 *              type: string
 *          -   in: formData
 *              name: title
 *              type: string
 *              required: true
 *      responses: 
 *          200:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.patch("/update/:id", categoryController.editCategory);


module.exports = {
    CategoryRoutes: router
}