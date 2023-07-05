import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const SleepForm = () => {
  const [bedtime, setBedtime] = useState('');
  const [wakeup, setWakeup] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();

  const createSleepRecord = useMutation(
    async () => {
      const response = await axios.post('http://localhost:8080/api/sleep-records', {
        bedtime: new Date(bedtime).toISOString(), // Convert to ISO String
        wakeup: new Date(wakeup).toISOString(), // Convert to ISO String
        rating: parseInt(rating), // Convert to integer
        comment,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sleepRecords');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createSleepRecord.mutate();
    setBedtime('');
    setWakeup('');
    setRating('');
    setComment('');
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4 py-6 bg-white shadow rounded-lg">
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Add New Sleep Record</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="bedtime">Bedtime:</label>
          <input
            type="datetime-local"
            id="bedtime"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            required
            className="bg-green-500 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="wakeup">Wakeup:</label>
          <input
            type="datetime-local"
            id="wakeup"
            value={wakeup}
            onChange={(e) => setWakeup(e.target.value)}
            required
            className="bg-green-500 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="10"
          required
          className="bg-green-500 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-green-500 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2">
        Add Sleep Record
      </button>
    </form>
</div>
  );
};

export default SleepForm;

