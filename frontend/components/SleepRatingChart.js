

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';

const SleepCorrelationChart = ({ sleepRecords }) => {
  // Extracting bedtime, rating, and date labels from sleepRecords
  const data = sleepRecords.map((record) => ({
    bedtime: new Date(record.bedtime),
    rating: record.rating,
  }));

  return (
    <div>
      <div className="flex justify-center mt-8">
        <div className="max-w-screen-lg bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Sleep Correlation Chart</h2>
      <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="bedtime" tickFormatter={(value) => format(new Date(value), 'MMM d')} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip labelFormatter={(label) => format(new Date(label), 'MMM d, HH:mm')} />
        <Legend />
        <Line
          type="monotone"
          dataKey="rating"
          name="Rating"
          stroke="#8884d8"
          strokeWidth={3} // Set the stroke width to make the line bold
          activeDot={{ r: 8 }}
        />
      </LineChart>
      <div style={{ color: 'blue' }}>
      <p className="flex justify-center items-center">The X-axis represents bedtime, and the Y-axis represents the rating.</p>
        
      </div>
    </div>
    </div>
    </div>
  );
};

export default SleepCorrelationChart;
