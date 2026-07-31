'use client';

const Hero = () => {
  return (
    <div className='shell'>
      <section className='hero'>
        <div className='hero-orb orb-one' />
        <div className='hero-orb orb-two' />
        <span className='hero-kid left'>📚</span>
        <div className='hero-copy'>
          <span>Your next story starts here</span>
          <h1>
            Welcome to
            <br />
            Booky
          </h1>
          <p>
            Discover books that inspire curiosity, confidence, and imagination.
          </p>
        </div>
        <span className='hero-kid right'>🛩️</span>
      </section>
      <div className='dots'>
        <i />
        <i />
        <i />
      </div>
    </div>
  );
};
export default Hero;
