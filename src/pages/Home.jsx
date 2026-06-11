import Hero from "../components/Hero";

export default function Home() {
    return (
        <>
            <Hero />

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">

                    <h2 className="text-4xl font-bold mb-10">
                        Our Services
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="shadow-lg p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4">
                                Web Development
                            </h3>
                            <p>
                                Custom websites built with React, Laravel,
                                WordPress and modern technologies.
                            </p>
                        </div>

                        <div className="shadow-lg p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4">
                                Mobile Apps
                            </h3>
                            <p>
                                Android and iOS application development
                                using Flutter and React Native.
                            </p>
                        </div>

                        <div className="shadow-lg p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4">
                                Custom Software
                            </h3>
                            <p>
                                CRM, ERP and enterprise software solutions
                                tailored for your business.
                            </p>
                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}