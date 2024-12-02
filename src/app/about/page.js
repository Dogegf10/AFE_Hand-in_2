"server only";
const AboutPage = () => {
  if (typeof window == "undefined") {
    console.log("Application is on server side");
  } else {
    alert("Application is on client side");
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Who are we?
      </h1>
      <p className="text-gray-700 leading-relaxed text-center">
        Welcome to Pig to Brick Fitness, where we’re all about building stronger
        bodies, resilient minds, and empowered individuals. Our name is inspired
        by the classic tale of the three little pigs — but with a twist. Just as
        the little pig built a brick house that could withstand any storm, we
        help you construct the foundation of your fitness journey, turning
        fleeting efforts into solid, lasting success. At Pig to Brick Fitness,
        we understand that fitness isn’t a one-size-fits-all journey. That’s why
        we’re dedicated to meeting you wherever you are, no matter your starting
        point. Whether you’re looking to shed some weight, build muscle, improve
        your endurance, or simply feel better in your own skin, our team of
        experienced trainers is here to guide, motivate, and cheer you on every
        step of the way. Our approach goes beyond physical fitness. We focus on
        cultivating a mindset of perseverance and growth, ensuring that you
        develop the mental fortitude to overcome challenges both in and out of
        the gym. We’re more than a fitness center — we’re a community that
        uplifts and inspires, where every member is celebrated for their unique
        journey. With state-of-the-art equipment, innovative training methods,
        and a variety of classes designed to suit all fitness levels, our
        facility is your one-stop destination for health and wellness. From
        high-energy group sessions to personalized one-on-one coaching, we
        provide an environment that’s as welcoming as it is empowering. But the
        heart of Pig to Brick Fitness is our belief in transformation. Much like
        building a brick house, fitness is about laying down one brick at a time
        — with consistency, patience, and effort. We’re here to help you turn
        your goals into reality, piece by piece, until you become the strongest
        version of yourself. So, are you ready to leave behind the straw and
        sticks of old habits and start building something that lasts? Join Pig
        to Brick Fitness today and let’s create a future where you feel
        unstoppable.
        <br />
        <br /> Let’s build strength. Let’s build resilience. Let’s build you.
      </p>
      <div className="flex justify-center mt-6">
        <img src="/img/pig.png" alt="About" className="w-60" />
      </div>
    </div>
  );
};

export default AboutPage;
