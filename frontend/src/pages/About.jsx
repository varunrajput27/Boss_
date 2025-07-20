import React, { useEffect } from 'react';
import Title from '../components/Title';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-16 md:py-10">
      {/* Heading */}
      <div className="text-center mb-8">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 mb-40">
        {/* Image Gallery */}
        <div className="flex flex-col gap-6 md:w-1/2 animate-fadeIn">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
            alt="Boss Expert Fashion 1"
            className="w-full rounded-3xl shadow-2xl object-cover h-[360px] md:h-[480px]"
          />
          <div className="flex gap-6">
            <img
              src="https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=600&auto=format&fit=crop&q=60"
              alt="Boss Expert Fashion 2"
              className="w-1/2 rounded-2xl shadow-xl object-cover h-[220px]"
            />
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80"
              alt="Boss Expert Fashion 3"
              className="w-1/2 rounded-2xl shadow-xl object-cover h-[220px]"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 text-gray-900 text-lg leading-relaxed space-y-12 px-2 md:px-0 animate-slideInRight">
          <p>
            Welcome to <strong>Boss Expert</strong>, your ultimate destination for style and sophistication.
            We don’t just sell fashion — we help you express your unique personality through trendsetting designs.
          </p>

          <p>
            Our curated collections blend quality and style seamlessly. From streetwear to formal attire, every piece is designed to inspire confidence.
          </p>

          <p>
            Experience smooth shopping, secure checkout, and fast delivery with customer support that truly cares.
          </p>

          <p>Thank you for trusting <strong>Boss Expert</strong> as your style partner.</p>

          <div>
            <h3 className="text-4xl font-extrabold text-yellow-500 mb-4 tracking-wide">
              Our Mission
            </h3>
            <p className="text-xl">
              To empower individuals by providing high-quality, trendsetting fashion that inspires confidence and celebrates individuality.
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-extrabold text-yellow-500 mb-4 tracking-wide">
              Our Vision
            </h3>
            <p className="text-xl">
              To become a global leader in fashion, setting new standards for style, sustainability, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-24 animate-fadeIn">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="grid gap-16 md:grid-cols-3 text-gray-900 text-lg leading-relaxed">
        <div className="border p-14 rounded-3xl shadow-xl hover:shadow-3xl transition-shadow duration-500">
          <h4 className="font-bold text-3xl mb-6 text-yellow-500">Quality Assurance</h4>
          <p className="text-lg">
            Every product undergoes rigorous quality checks to ensure it meets our high standards. Expect durable, comfortable, and stylish apparel every time.
          </p>
        </div>

        <div className="border p-14 rounded-3xl shadow-xl hover:shadow-3xl transition-shadow duration-500">
          <h4 className="font-bold text-3xl mb-6 text-yellow-500">Convenience</h4>
          <p className="text-lg">
            Enjoy an intuitive shopping experience with easy navigation, multiple payment options, and quick delivery. Fashion is just a click away.
          </p>
        </div>

        <div className="border p-14 rounded-3xl shadow-xl hover:shadow-3xl transition-shadow duration-500">
          <h4 className="font-bold text-3xl mb-6 text-yellow-500">Exceptional Customer Service</h4>
          <p className="text-lg">
            Our dedicated support team is available 24/7 to answer your queries, assist returns, and make your shopping experience seamless.
          </p>
        </div>
      </div>

      {/* Extra Info Section */}
      <div className="bg-yellow-50 rounded-3xl p-16 text-gray-900 mb-32 shadow-lg animate-slideInUp">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-yellow-600">
          Sustainable Fashion Commitment
        </h2>
        <p className="max-w-4xl mx-auto text-center text-lg leading-relaxed">
          At Boss Expert, we are committed to reducing our environmental footprint.
          We prioritize eco-friendly materials and ethical manufacturing processes to bring you sustainable fashion that looks good and feels right.
        </p>
      </div>

      {/* Newsletter */}
      <div className="mt-20">
        <NewsLetterBox />
      </div>

      {/* Footer CTA */}
      <div className="mt-32 text-center text-gray-700 text-lg">
        <p>
          Have questions?{' '}
          <a href="/contact" className="text-yellow-600 font-semibold hover:underline">
            Contact our team
          </a>{' '}
          anytime — we’re here to help you look your best.
        </p>
      </div>
    </div>
  );
};

export default About;
