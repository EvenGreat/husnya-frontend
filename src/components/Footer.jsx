export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid md:grid-cols-3 gap-10">

                    <div>
                        <h2 className="text-2xl font-bold">
                            Even Great Softech Solutions
                        </h2>

                        <p className="mt-4 text-gray-400">
                            Building innovative digital solutions for businesses worldwide.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-2 text-gray-400">
                            <li>Home</li>
                            <li>About</li>
                            <li>Services</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Contact Info
                        </h3>

                        <p className="text-gray-400">
                            📞 +91 8953143537
                        </p>

                        <p className="text-gray-400 mt-2">
                            🌐 evengreat.com
                        </p>

                        <p className="text-gray-400 mt-2">
                            ✉ info@evengreat.com
                        </p>
                    </div>

                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    © 2026 Even Great Softech Solutions. All Rights Reserved.
                </div>

            </div>
        </footer>
    );
}