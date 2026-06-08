function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Vitto
            </h2>
            <p className="text-gray-400">
              Modern Loan Application Management
              Platform.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Apply Loan</li>
              <li>Dashboard</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <p className="text-gray-400">
              support@vitto.com
            </p>

            <p className="text-gray-400">
              Mumbai, India
            </p>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          © 2026 Vitto Loan Portal. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;