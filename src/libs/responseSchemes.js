
const Joi = require('joi');

const meta = Joi.object({
    total: Joi.number().integer().example(3)
});

const token = Joi.object({
    id: Joi.number().integer().example(1),
    user_id: Joi.number().integer().example(2),
    expires_at: Joi.date().example('2019-02-16T15:38:48.243Z'),
    token: Joi.string().example('4443655c28b42a4349809accb3f5bc71'),
    updatedAt: Joi.date().example('2019-02-16T15:38:48.243Z'),
    createdAt: Joi.date().example('2019-02-16T15:38:48.243Z')
});

const message = Joi.object({
    mid: Joi.number().integer().example(1),
    message: Joi.string().example('Lorem ipsum dolor sit amet ...'),
    uid_fk: Joi.number().integer().example(1),
    //updatedAt: Joi.date().example('2019-02-16T15:38:48.243Z'),
    //createdAt: Joi.date().example('2019-02-16T15:38:48.243Z')
});

module.exports = {
    meta,
    token,
    message
};
