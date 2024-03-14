const validator = require("validator");
const Article = require("../models/Article");

const test = (req, res) => {
    return res.status(200).json({
        message: "Test"
    })
}

const list = (req, res) => {
    Article.find({})
    .sort({date: 1})
        .then((articles) => {
            if (!articles) {
                return res.status(404).json({
                    status: "error",
                    message: "dont find articles",
                });
            }
            return res.status(200).send({
                status: "success",
                articles: articles
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "error",
                mensaje: "failed to list articles",
                error: error.message
            });
        });
};


const get =(req,res) => {
    //get id from url
    let id = req.params.id;
    //search article
    Article.findById(id).then((article) =>{
        if(!article){
            console.log(error);
            console.log(article);
            return res.status(404).json({
                status: "error",
                message: "dont find article"
            })
        }
        return res.status(200).json({
            status:"succeed",
            article: article
        })
    })  
}
const deleted = (req,res) =>{
    let id = req.params.id;
    Article.findOneAndDelete({_id: id}).then((deletedArticle) =>{
        if(!deletedArticle){
            return res.stats(404).json({
                status : "error",
                message: "dont find article"
            })
        }
        return res.status(200).json({
            status:"success",
            article: deletedArticle
        })
    })
};
const update = (req,res) =>{
    let id = req.params.id;
    //get data from body
    let parameters = req.body;
    //validate data
    try {
        let validateTitle = validator.isEmpty(parameters.title);
        let validateContent = validator.isEmpty(parameters.content);
        if (validateContent || validateTitle) {
            return res.status(400).json({
                status: "error",
                message: "empty parameters"
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "insuficient data"
        })
    }
    //search and update
    Article.findOneAndUpdate({_id:id},parameters).then((updatedArticle =>{
        if(!updatedArticle){
            return res.status(404).json({
                status: "error",
                message: "dont find article"
            })
        }
        return res.status(200).json({
            status: "success",
            updatedArticle
        })
    }))
    //response
}
const create = (req, res) => {
    //get parameters
    let parameters = req.body;

    //validate data
    try {
        let validateTitle = validator.isEmpty(parameters.title);
        let validateContent = validator.isEmpty(parameters.content);
        if (validateContent || validateTitle) {
            return res.status(400).json({
                status: "error",
                message: "empty parameters"
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "insuficient data"
        })
    }

    //create object to save
    const article = new Article(parameters);
    //save data in database
    article.save().then((savedArticle) => {
        return res.status(200).json({
            status: 'success',
            article: savedArticle
        });
    })
        .catch((error) => {
            return res.status(400).json({
                status: 'error',
                mensaje: 'article dont save' + error.message
            });
        });

}
module.exports = {
    test,
    create,
    list,
    get,
    deleted,
    update
}