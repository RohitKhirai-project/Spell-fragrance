import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      <div className="about-section">
        <h2>Craftsmanship in Every Drop</h2>
        <p>
          At Spell Fragrance, every drop of perfume is a labor of love, crafted with the finest ingredients and time-honored techniques. Our fragrances are more than just scents—they are stories woven with rare botanicals, rich resins, and exquisite oils, perfected through the art of distillation and blending.
        </p>
        <p>
          Each creation reflects our commitment to quality, tradition, and innovation, ensuring a scent that lingers beautifully on your skin.
        </p>
        <img src="/images/craftsmanship.avif" alt="Craftsmanship process" className="about-img" />
      </div>

      <div className="about-section">
        <h2>Our Artistry Revealed</h2>
        <p>
          At Spell Fragrance, perfume is more than just a scent—it’s a carefully crafted art form. Inspired by alchemy, nature, and time-honored traditions, we blend the finest ingredients to create fragrances that evoke emotion and leave a lasting impression. Each bottle holds a story, meticulously designed with passion and precision to transform the ordinary into something truly magical.
        </p>
        <img src="/images/artistry.avif" alt="Perfume artistry" className="about-img" />
      </div>

      <div className="about-section">
        <h2>Craftsmanship</h2>
        <p>Explore the art of creating our exquisite handcrafted fragrances.</p>
      </div>

      <div className="about-section">
        <h2>Craftsmanship Showcase</h2>
        <p>
          Explore the artistry behind our handcrafted niche perfumes and fragrances. Every perfume is a testament to artistry and dedication. From the careful selection of rare botanicals and rich essences to the intricate blending process, our fragrances embody the perfect harmony of tradition and innovation. Each bottle reflects the skill, passion, and precision of our master perfumers.
        </p>
        <img
  src="/images/showcase.avif"
  alt="Craftsmanship showcase"
  className="about-img img-top-focused"
/>

      </div>

      <div className="about-section">
        <h2>Artisan Techniques</h2>
        <p>
          At Spell Fragrance, we honor the ancient art of perfumery, combining traditional craftsmanship with modern innovation. Our perfumes are meticulously blended using hand-selected botanicals, rare essences, and refined distillation techniques to ensure depth, richness, and longevity. Each fragrance is a delicate balance of artistry and precision, capturing the magic of scent in its purest form.
        </p>
        <img src="/images/artisan.avif" alt="Artisan technique" className="about-img" />
      </div>

      <div className="about-section">
        <h2>Behind the Scenes</h2>
        <p>
          Step into the world of Spell Fragrance, where artistry and alchemy come to life. From sourcing the finest raw ingredients to hand-blending each fragrance with precision, every step of our process is infused with passion and craftsmanship. Our perfumers carefully refine each formula, ensuring a perfect balance of depth, longevity, and emotion in every bottle.
        </p>
        <img src="/images/behind-scenes.avif" alt="Behind the scenes in perfume lab" className="about-img" />
      </div>
    </div>
  );
};

export default About;
