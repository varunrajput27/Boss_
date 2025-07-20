import React, { useState } from 'react';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }
    setMessage(`Thank you for subscribing, ${email}!`);
    setEmail('');
  };

  return (
    <div className="mt-16 mb-24 px-6 max-w-lg mx-auto text-center bg-white rounded-2xl shadow-xl p-10 sm:p-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900">
        Subscribe & Get <span className="text-yellow-500">20% Off</span>
      </h2>
      <p className="mb-8 text-gray-600 text-base sm:text-lg max-w-md mx-auto">
        Stay updated with our latest deals and exclusive offers.
      </p>

      <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage('');
          }}
          required
          className="flex-grow border border-gray-300 rounded-lg px-5 py-3 text-gray-800 text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 transition"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-bold text-lg sm:text-xl shadow-md"
        >
          Subscribe
        </button>
      </form>

      {message && (
        <p
          className="mt-6 text-sm sm:text-base text-green-600 font-semibold max-w-md mx-auto"
          style={{ animation: 'fadeIn 0.5s ease-in forwards' }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsLetterBox;
