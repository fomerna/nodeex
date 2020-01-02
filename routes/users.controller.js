const models = require('../model/models');

exports.index = (req, res) => {
  models.User.findAll()
    .then(users => res.json(users));
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
  console.log(name);
  console.log(name.length);

  if (!name.length) {
    return res.status(400).json({err: 'Incorrect name'});
  }

  models.User.create({
    name: name
  }).then((user) => res.status(201).json(user))
};


exports.update = (req, res) => {
  const newName = req.body.name || '';
  const name = models.User.name;
  const id = parseInt(req.params.id, 10);

  if (!name.length) {
    return res.status(400).json({err: 'Incorrect Name'});
  }

  models.User.update(
    {name: newName},
    {
      where:
        {id: id}, returning: true
    })
    .then(function (result) {
      res.json(result[1][0]);
    })
    .catch((err) => {
      return res.status(404).json({err: 'Undefined Error'})
    })
};
