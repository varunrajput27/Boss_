import React, { useEffect } from 'react';
import Title from '../components/Title';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 bg-white rounded-xl shadow-xl">
      {/* Title Section */}
      <div className="text-center mb-16">
        <Title text1={'CONTACT'} text2={'US'} />
        <p className="mt-3 max-w-2xl mx-auto text-gray-600 text-base font-light">
          Got questions or want to work with us? Reach out anytime — we're here to help and bring you the best in fashion.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            className="w-full rounded-xl shadow-2xl border-4 border-yellow-400 object-cover"
            src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8="
            alt="Contact Us"
            loading="lazy"
          />
        </div>

        {/* Info Section */}
        <div className="space-y-12 text-gray-800 w-full lg:w-1/2">
          {/* Store Info */}
          <div>
            <h3 className="text-3xl font-extrabold text-yellow-500 mb-4">Our Store</h3>
            <p className="text-lg font-medium leading-relaxed">
              Rajnagar Extension<br />
              Ghaziabad, Uttar Pradesh, India
            </p>
            <p className="mt-4 text-lg font-semibold">Owner: Varun Rajput</p>
            <div className="mt-4 space-y-2 text-lg">
              <p><strong>Phone:</strong> +91-558-669-447</p>
              <p><strong>Email:</strong> contact.BossExpert@info.com</p>
            </div>
          </div>

          {/* Careers Section */}
          <div>
            <h3 className="text-3xl font-extrabold text-yellow-500 mb-4">Careers at Boss Expert</h3>
            <p className="text-lg font-light leading-relaxed">
              Join us and shape the future of fashion. We’re always looking for talented, passionate individuals ready to make an impact. Explore opportunities and grow with us.
            </p>
            <button className="mt-6 inline-block px-8 py-3 bg-yellow-500 text-black font-bold rounded-full shadow-md hover:bg-yellow-600 transition duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-28">
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default Contact;
