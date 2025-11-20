
export default function ContactPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/aesthetic.jpg')",   // your background
      }}
    >
      <div className="pt-32 px-6 flex justify-center">

        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-10 max-w-2xl w-full border border-blue-100">

          <h1 className="text-4xl font-bold text-blue-700 mb-5 text-center">
            Contact Us
          </h1>

          <p className="text-gray-800 text-center mb-8">
            Have questions about water points, safety, or system updates?<br />
            Reach out to us — we’re here to help.
          </p>

          <div className="space-y-6 text-lg">
            <div>
              <h2 className="text-xl font-semibold text-blue-600"> Address</h2>
              <p className="text-gray-900">AquaLink Headquarters, Nairobi, Kenya</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-600"> Email</h2>
              <p className="text-gray-900">support@aqualink.org</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-600"> Phone</h2>
              <p className="text-gray-900">+254 712 345 678</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-600">Working Hours</h2>
              <p className="text-gray-900">Mon – Fri: 8:00 AM – 5:00 PM</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
