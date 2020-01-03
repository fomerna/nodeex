const models = require('../model/models');

exports.index = (req, res) => {
  models.User.findAll()
    .then(users => res.json(users))
    .catch(err => {
      console.error(err);
    });
};


exports.show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({
      err: 'Incorrect ID'
    })
  }

  models.User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({err: 'No User'});
    }
    return res.json(user);
  });

};


exports.destroy = (req, res) => {

  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({
      err: 'Incorrect ID'
    })
  }

  models.User.destroy({
    where: {
      id: id
    }
  }).then(() => res.status(204).send());
};


exports.create = (req, res) => {
  const name = req.body.name || '';

  if (!name.length) {
    return res.status(400).json({err: 'Incorrect name'});
  }

  models.User.create({
    name: name
  }).then((user) => res.status(201).json(user))
};


exports.update = (req, res) => {
  const newName = req.body.name || '';
  const id = parseInt(req.params.id, 10);

  if (!newName.length) {
    return res.status(400).json({err: 'Incorrect Name'});
  }

  if (!id) {
    return res.status(400).json({err: 'Incorrect ID'})
  }

  models.User.update(
    {name: newName},
    {
      where:
        {id: id}
    })
    .then(() => {
      models.User.findOne({
        where: {id: id}
      })
        .then((user) => {
          return res.status(201).json(user)
        });
    })
    .catch((err) => {
      return res.status(404).json({err: 'Undefined Error'})
    })
};
