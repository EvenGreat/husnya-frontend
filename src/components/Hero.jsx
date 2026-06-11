export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Transform Your Business With Modern Technology
            </h1>

            <p className="mt-6 text-lg text-gray-200">
              We build Websites, Mobile Apps, Custom Software and
              Digital Solutions that help businesses grow faster.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
                Start Project
              </button>

              <button className="border border-white px-6 py-3 rounded-lg">
                Learn More
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt="Technology"
              className="rounded-2xl shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}