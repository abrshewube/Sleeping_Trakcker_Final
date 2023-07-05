import React, { useState } from 'react';
import axios from 'axios';

const SleepCard = ({ sleepRecord, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedBedtime, setEditedBedtime] = useState(sleepRecord.bedtime);
  const [editedWakeup, setEditedWakeup] = useState(sleepRecord.wakeup);
  const [editedRating, setEditedRating] = useState(sleepRecord.rating);
  const [editedComment, setEditedComment] = useState(sleepRecord.comment);

  const calculateDuration = (bedtime, wakeup) => {
    const duration = new Date(wakeup) - new Date(bedtime);
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    return `${hours} hours ${minutes} minutes`;
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedBedtime(sleepRecord.bedtime);
    setEditedWakeup(sleepRecord.wakeup);
    setEditedRating(sleepRecord.rating);
    setEditedComment(sleepRecord.comment);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/sleep-records/${sleepRecord.id}`, {
        bedtime: new Date(editedBedtime).toISOString(),
        wakeup: new Date(editedWakeup).toISOString(),
        rating: parseInt(editedRating),
        comment: editedComment,
      });
      alert('Sleep record updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating sleep record:', error);
      alert('Failed to update sleep record');
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this sleep record?')) {
      try {
        await axios.delete(`http://localhost:8080/api/sleep-records/${sleepRecord.id}`);
        alert('Sleep record deleted successfully!');
        onDelete(sleepRecord.id); // Notify the parent component to remove this sleep record from the state
      } catch (error) {
        console.error('Error deleting sleep record:', error);
        alert('Failed to delete sleep record');
      }
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg mb-4 w-full">
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          From :- {new Date(sleepRecord.bedtime).toLocaleDateString()} -{' '}
          {new Date(sleepRecord.wakeup).toLocaleDateString()}
        </h3>
        <p>
          <strong>Duration: </strong>
          {calculateDuration(sleepRecord.bedtime, sleepRecord.wakeup)}
        </p>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="editedBedtime">Bedtime:</label>
              <input
                type="datetime-local"
                id="editedBedtime"
                value={editedBedtime}
                onChange={(e) => setEditedBedtime(e.target.value)}
                required
                className="bg-green-500 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="editedWakeup">Wakeup:</label>
              <input
                type="datetime-local"
                id="editedWakeup"
                value={editedWakeup}
                onChange={(e) => setEditedWakeup(e.target.value)}
                required
                className="bg-green-500 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="editedRating">Rating:</label>
              <input
                type="number"
                id="editedRating"
                value={editedRating}
                onChange={(e) => setEditedRating(e.target.value)}
                min="1"
                max="10"
                required
                className="bg-green-500 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="editedComment">Comment:</label>
              <textarea
                id="editedComment"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="bg-green-500 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p>
              <strong>Rating: </strong>
              {sleepRecord.rating}
            </p>
            {sleepRecord.comment && (
              <p>
                <strong>Comment: </strong>
                {sleepRecord.comment}
              </p>
            )}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleEditClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDeleteClick}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SleepCard;
