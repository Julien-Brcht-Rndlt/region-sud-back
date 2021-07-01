const eventRouter = require('express').Router();
const Event = require('../models/event');

eventRouter.get('/', (req, res) => {
    Event.findAll().then((events) => res.status(200).json(events))
                .catch((err) => res.status(500).send(`Error retrieving events: ${err.message}`));
});

eventRouter.get('/:id', (req, res) => {
    const eventId = req.params.id;
    Event.find(eventId).then((event) => res.status(200).json(event))
                .catch((err) => res.status(500).send(`Error retrieving event (#${eventId}): ${err.message}`));
});

eventRouter.post('/', (req, res) => {
    const { title, address, loc, staff, startDate, endDate, activity, level } = req.body;
    Event.create(eventId)
                .then(([insertId]) => {
                    res.status(201).json({id: insertId, ...req.body});
                })
                .catch((err) => {
                    if(err === 'INVALIDE_DATA') {
                        res.status(422).json({/* validationError */})
                    }
                    else {
                        res.status(500).send({ message: 'Error saving the event' });
                    } 
                });
});

eventRouter.put('/:id',(req, res) => {
    /*     const { eventName, eventStaff } = req.body; */
        const eventId = req.params.id;
        Event.modify(eventId, req.body).then((result) => {
            const eventId = result.insertId;
            res.status(200).json({id: eventId, ...req.body});
        }).catch((err) => {
            switch(err){
                case 'RESOURCE_NOT_FOUND':
                    res.status(404).json({ message: `Resource event ${eventId} not found!`});
                    break;
                case 'INVALID_DATA':
                    res.status(422).json({ message: 'invalid data'});
                    break;
                default:
                    res.status(500).send(`Error while modifying event resource : ${err.message} `);
                    break;            
            }
        });
    });
    
    eventRouter.delete('/:id',(req, res) => {
        const eventId = req.params.id;
        Event.remove(eventId).then((result) => {
            const eventId = result.insertId;
            res.status(200).json({  message: `Resource event ${eventId} has been definitaly removed` });
        }).catch((err) => {
            if(err === 'RESOURCE_NOT_FOUND'){
            } else {
                res.status(500).send(`Error while modifying event resource : ${err.message} `);
            }     
        });
    });

module.exports = eventRouter;