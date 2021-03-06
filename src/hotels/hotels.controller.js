const express = require('express');
const { HotelModel } = require('./hotels.model');
const { makeResponse } = require('../shared/make.response');
const { FindOptions } = require('ottoman');
const router = express();

router.get('/', async (req, res) => {
  await makeResponse(res, async () => {
    const options = new FindOptions({
      limit: Number(req.query.limit || 50),
      skip: Number(req.query.skip || 0)
    });
    const filter = req.query.search ? { name: { $like: `%${req.query.search}%` } } : {};
    const result = await HotelModel.find(filter, options);
    const { rows: items } = result;
    return {
      items,
    };
  });
});

// router.get('/:id', async (req, res) => {
//   await makeResponse(res, () => HotelModel.findById(req.params.id));
// });

router.get('/test', async (req, res) => {
  // findbyName working
  HotelModel.findByName('Medway Youth Hostel').then((result) => {
    console.log('success!');
    console.log(result);
    res.status(200).send(result.rows[0])
  }).catch((err) => {
    console.log('error!');
    console.log(err);
    res.status(400).send(err)
  })

  console.log('testget');
})

// router.post('/', async (req, res) => {
//   await makeResponse(res, () => {
//     res.status(201);
//     const hotel = new HotelModel(req.body);
//     return hotel.save();
//   });
// });

router.post('/', async (req, res) => {
  console.log('posting');
  const hotel = new HotelModel(req.body);
  hotel.save();
});

router.patch('/:id', async (req, res) => {
  await makeResponse(res, async () => {
    res.status(204);
    await HotelModel.updateById(req.params.id, req.body);
  });
});

router.put('/:id', async (req, res) => {
  await makeResponse(res, async () => {
    await HotelModel.replaceById(req.params.id, req.body);
    res.status(204);
  });
});

router.delete('/:id', async (req, res) => {
  await makeResponse(res, async () => {
    await HotelModel.removeById(req.params.id);
    res.status(204);
  });
});

module.exports = {
  HotelRoutes: router
}
