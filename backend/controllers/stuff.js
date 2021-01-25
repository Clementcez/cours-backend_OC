const Model = require('../models/model');
const fs = require('fs');
const { error } = require('console');

exports.createModel = (req, res, next) =>{
    const modelObject = JSON.parse(req.body.thing);
    delete modelObject._id;
    const model = new Model({
        ...modelObject,
        imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
    });
    model.save()
    .then(() => res.status(201).json({ message: 'Objet enregister' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifModel = (req, res , next) =>{
    const modelObject = req.file ?
    { 
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
    } : { ...req.body };
    Model.updateOne({ _id: req.params.id }, { ...modelObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'objet modifié !'}))
    .catch( error => res.status(400).json({ error }));
};

exports.deleteModel = (req, res, next) =>{
    Model.findOne({ _id: req.params.id})
        .then(model => {
            const filename = model.imageUrl.split('/img/')[1];
            fs.unlink(`img/${filename}`, () =>{
                Model.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch( error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({error}))
};

exports.readModel = (req, res, next) => {
    Model.findOne({ _id: req.params.id })
    .then(models => res.status(200).json(models))
    .catch(error => res.status(400).json({ error }));
};

exports.readAllModels = (req, res, next) => {
    Model.find()
    .then(models => res.status(200).json(models))
    .catch(error => res.status(400).json({ error }));
};