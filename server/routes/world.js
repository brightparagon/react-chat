import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  const world = {
    country: 'South Korea',
    city: 'Seoul',
    message: 'Hello World!'
  }

  res.json({
    world: world
  });
});

export default router;
