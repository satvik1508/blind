import React, { useState } from 'react';

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    collegeName: '',
    rating: 5,
    review: '',
    anonymous: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.collegeName || !newReview.review) {
      alert('Please fill in all required fields');
      return;
    }

    const reviewToAdd = {
      ...newReview,
      id: Date.now(),
      date: new Date().toISOString(),
    };

    setReviews(prev => [reviewToAdd, ...prev]);
    setNewReview({
      collegeName: '',
      rating: 5,
      review: '',
      anonymous: false
    });
  };

  return (
    <div className="min-h-full bg-gray-100">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Review Form */}
            <div className="bg-white shadow sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Post a College Review</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
                      College Name
                    </label>
                    <input
                      type="text"
                      name="collegeName"
                      id="collegeName"
                      value={newReview.collegeName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter college name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <select
                      id="rating"
                      name="rating"
                      value={newReview.rating}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} Star{num !== 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                      Review
                    </label>
                    <textarea
                      id="review"
                      name="review"
                      rows={4}
                      value={newReview.review}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Share your experience..."
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="anonymous"
                      name="anonymous"
                      type="checkbox"
                      checked={newReview.anonymous}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900">
                      Post anonymously
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Post Review
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Reviews List */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reviews</h2>
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to post!</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-white shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{review.collegeName}</h3>
                          <div className="flex items-center">
                            <span className="text-yellow-400">
                              {'★'.repeat(review.rating)}
                              {'☆'.repeat(5 - review.rating)}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">{review.review}</p>
                        <p className="mt-2 text-xs text-gray-400">
                          Posted by {review.anonymous ? 'Anonymous' : 'User'}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
