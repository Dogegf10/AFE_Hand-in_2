"use client";
import { useState } from "react";

const ContactPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Hide the popup after 3 seconds
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">
        Contact Us
      </h1>
      <p className="text-black leading-relaxed text-center mb-6">
        We’d love to hear from you! Whether you have questions about our
        programs, need help signing up, or just want to chat about your fitness
        goals, the team at <em>Pig to Brick Fitness</em> is here to assist you.
      </p>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Get in Touch
        </h2>
        <p className="text-black text-center">
          <strong>📍 Location</strong>
          <br />
          123 Brickhouse Way, Fitnessville, USA
        </p>
        <p className="text-black text-center">
          <strong>📞 Phone</strong>
          <br />
          (123) 456-7890
        </p>
        <p className="text-black text-center">
          <strong>📧 Email</strong>
          <br />
          info@pig2brickfitness.com
        </p>
        <p className="text-black text-center">
          <strong>🌐 Website</strong>
          <br />
          <a
            href="http://www.pig2brickfitness.com"
            className="text-blue-500 hover:underline"
          >
            www.pig2brickfitness.com
          </a>
        </p>
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Our Hours</h2>
        <p className="text-black">
          <strong>🕒 Gym Hours:</strong>
        </p>
        <ul className="list-disc list-inside text-black">
          <li>Monday – Friday: 5:30 AM – 10:00 PM</li>
          <li>Saturday: 7:00 AM – 8:00 PM</li>
          <li>Sunday: 8:00 AM – 6:00 PM</li>
        </ul>
        <p className="mt-4 text-black">
          <strong>🕑 Office Hours:</strong>
        </p>
        <ul className="list-disc list-inside text-black">
          <li>Monday – Friday: 9:00 AM – 5:00 PM</li>
        </ul>
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Follow Us on Social Media
        </h2>
        <p className="text-black">
          Stay connected with our latest updates, fitness tips, and events!
        </p>
        <ul className="list-disc list-inside text-black">
          <li>
            📸 Instagram:{" "}
            <a
              href="https://instagram.com/pigtobrickfitness"
              className="text-blue-500 hover:underline"
            >
              @PigToBrickFitness
            </a>
          </li>
          <li>
            👍 Facebook:{" "}
            <a
              href="https://facebook.com/pigtobrickfitness"
              className="text-blue-500 hover:underline"
            >
              Pig to Brick Fitness
            </a>
          </li>
          <li>
            🐦 Twitter:{" "}
            <a
              href="https://twitter.com/pigtobrickfit"
              className="text-blue-500 hover:underline"
            >
              @PigToBrickFit
            </a>
          </li>
        </ul>
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Drop Us a Message
        </h2>
        <p className="text-black">
          Have a question or want to share feedback? Fill out the form below,
          and we’ll get back to you within 24 hours!
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-black"
            >
              Phone Number (Optional)
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-black"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
          Thanks for the feedback!
        </div>
      )}

      <p className="text-center mt-6 text-black text-center">
        Ready to take the first step toward your fitness goals? Visit us in
        person or reach out today — we’re here to help you turn your dreams into
        reality, one brick at a time!
      </p>
    </div>
  );
};

export default ContactPage;
