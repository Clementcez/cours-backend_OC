const express = require('express');
const router = express.Router();

const Model = require('../models/model');

router.post('/',(req, res, next) =>{
    delete req.body._id;
    const model = new Model({
        ...req.body
    })
    model.save()
    .then(() => res.status(201).json({ message: 'Objet enregister' }))
    .catch(error => res.status(400).json({ error }));
});

router.put('/:id', (req, res , next) =>{
    Model.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'objet modifié !'}))
    .catch( error => res.status(400).json({ error }));
});

router.delete('/:id', (req, res, next) =>{
    Model.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch( error => res.status(400).json({ error }));
});

router.get('/:id', (req, res, next) => {
    Model.findOne({ _id: req.params.id })
    .then(models => res.status(200).json(models))
    .catch(error => res.status(400).json({ error }));
});

router.get('/', (req, res, next) => {
   Model.find()
   .then(models => res.status(200).json(models))
   .catch(error => res.status(400).json({ error }));
});

module.exports = router;