
import Hero from "../sections/Hero";
import TrustedBy from "../components/common/TrustedBy";
import About from "../sections/About";
import Services from "../sections/Services";
import Products from "../sections/Products";
import Projects from "../sections/Projects";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import TechnologyTree from "../sections/TechnologyTree";

const HomePage = () => {
  return (
    <>
      <main>
        <Hero />
        <TrustedBy />
        <TechnologyTree />
        <About />
        <Services />
        <Products />
        <Projects />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
