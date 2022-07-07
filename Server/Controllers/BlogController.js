const Blog = require("../Models/BlogModel")
const Validate = require("../Validators/BlogValidate")

class BlogController {
    async Create(req, res) {
        const {title, message} = req.body

        const {error} = Validate(req.body)
        if (error) {
            return res.json({error: error.details[0].message})
        }

        let id;

        while (true) {
            const rand = Math.floor(Math.random() * 100000)

            let blog = await Blog.findOne({id: rand});
            if (!blog) {
                id = rand
                break
            }
        }

        const blog = new Blog({
            id, title, message, url: req.file.fieldname
        })

        const savedBlog = await blog.save()

        return res.json(savedBlog)
    }

    async Update(req, res) {

    }

    async Find(req, res) {
        const blogs = await Blog.find()
        return res.json(blogs)
    }

    async Delete(req, res) {

    }
}

module.exports = new BlogController()