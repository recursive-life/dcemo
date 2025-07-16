import React, { useEffect, useRef } from 'react';
import './DashboardPage.css';

const heroImage = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80';
const featured1 = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
const featured2 = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80';
const featured3 = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
const testimonialImg = 'https://randomuser.me/api/portraits/men/32.jpg';

const DashboardPage = () => {
  const featuredRefs = useRef([]);
  const testimonialRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('float-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    featuredRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });
    if (testimonialRef.current) observer.observe(testimonialRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-vlog-root">
      {/* Hero Section */}
      <section className="home-hero">
        <img src={heroImage} alt="Shop hero" className="home-hero-img" />
        <div className="home-hero-overlay">
          <h1 className="home-hero-title">Welcome to Shopez</h1>
          <p className="home-hero-desc">Experience shopping reimagined. Discover, shop, and enjoy the best products online—just like a vlog, but for your life.</p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="home-featured">
        <h2 className="home-section-title">Featured Collections</h2>
        <div className="home-featured-grid">
          <div className="home-featured-card" ref={el => (featuredRefs.current[0] = el)}>
            <img src={featured1} alt="Tech Gadgets" />
            <div className="home-featured-caption">Latest Tech Gadgets</div>
          </div>
          <div className="home-featured-card" ref={el => (featuredRefs.current[1] = el)}>
            <img src={featured2} alt="Fashion" />
            <div className="home-featured-caption">Modern Fashion</div>
          </div>
          <div className="home-featured-card" ref={el => (featuredRefs.current[2] = el)}>
            <img src={featured3} alt="Home & Lifestyle" />
            <div className="home-featured-caption">Home & Lifestyle</div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="home-testimonial">
        <div className="home-testimonial-card" ref={testimonialRef}>
          <img src={testimonialImg} alt="Customer" className="home-testimonial-img" />
          <div className="home-testimonial-quote">“Shopez changed the way I shop. The experience is as smooth and beautiful as my favorite vlogs!”</div>
          <div className="home-testimonial-author">— Alex, Content Creator</div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-cta">
        <h2>Ready to start your journey?</h2>
        <a href="/products" className="home-cta-btn">Shop Now</a>
      </section>
    </div>
  );
};

export default DashboardPage; 