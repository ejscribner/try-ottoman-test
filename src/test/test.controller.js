const express = require('express');
const { TestModel } = require('./test.model');
const { makeResponse } = require('../shared/make.response');
const { FindOptions } = require('ottoman');
const router = express();

router.get('/', async (req, res) => {
  console.log("hello world");
  // res.send("working!")
  await makeResponse(res, async () => {
    const options = new FindOptions({
      limit: Number(req.query.limit || 50),
      skip: Number(req.query.skip || 0)
    });
    const filter = req.query.search ? { name: { $like: `%${req.query.search}%` } } : {};
    const result = await TestModel.find(filter, options);
    const { rows: items } = result;
    return {
      items,
    };
  });
});

router.post('/', async (req, res) => {
  console.log('posting');
  const toPost = new TestModel(req.body);
  console.log(toPost);
  toPost.save();
  res.send(toPost)
})

module.exports = {
  TestRoutes: router
}
