const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Get all sleep records
app.get('/api/sleep-records', async (req, res) => {
  const sleepRecords = await prisma.sleepRecord.findMany();
  res.json(sleepRecords);
});


// Get a single sleep record by ID
app.get('/api/sleep-records/:id', async (req, res) => {
  const { id } = req.params;

  const sleepRecord = await prisma.sleepRecord.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!sleepRecord) {
    return res.status(404).json({ error: 'Sleep record not found' });
  }

  res.json(sleepRecord);
});


// Create a new sleep record
app.post('/api/sleep-records', async (req, res) => {
  const { bedtime, wakeup, rating, comment } = req.body;

  const newSleepRecord = await prisma.sleepRecord.create({
    data: {
      bedtime,
      wakeup,
      rating,
      comment,
    },
  });

  res.json(newSleepRecord);
});

// Update a sleep record
app.put('/api/sleep-records/:id', async (req, res) => {
  const { id } = req.params;
  const { bedtime, wakeup, rating, comment } = req.body;

  const updatedSleepRecord = await prisma.sleepRecord.update({
    where: {
      id: parseInt(id),
    },
    data: {
      bedtime,
      wakeup,
      rating,
      comment,
    },
  });

  res.json(updatedSleepRecord);
});

// Delete a sleep record
app.delete('/api/sleep-records/:id', async (req, res) => {
  const { id } = req.params;

  await prisma.sleepRecord.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.sendStatus(200);
});







const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
