import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Vitto?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3">
                Multi-Language Support
              </h3>
              <p>
                Apply for loans in English, Hindi, Marathi,
                Tamil, Telugu and more.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3">
                Fast Processing
              </h3>
              <p>
                Quick application review and efficient
                approval workflow.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3">
                Secure Platform
              </h3>
              <p>
                Your data is protected with secure
                backend processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}

export default Home;