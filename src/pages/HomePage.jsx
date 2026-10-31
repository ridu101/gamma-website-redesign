
import Navbar from "../components/common/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Products from "../sections/Products";
import Projects from "../sections/Projects";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
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
