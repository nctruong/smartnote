// app/page.tsx
import Link from "next/link";
import { QrCode, FormInput } from "lucide-react";

export default function Landing() {
    return (
        <main className="flex flex-col items-center justify-center bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="flex flex-col items-center text-center px-6 py-16 max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                    <QrCode className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold tracking-tight">Form QR</h1>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                    Create online forms instantly and share with a QR code
                </h2>
                <p className="text-gray-600 mb-8">
                    Build forms for feedback, surveys, checklists, or registrations —
                    then let anyone access them by scanning your unique QR code.
                </p>
                <Link
                    href="/builder"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium shadow-md"
                >
                    Start Building Form
                </Link>
            </section>

            {/* Features Section */}
            <section className="flex flex-col md:flex-row gap-8 px-6 max-w-4xl mb-16">
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border text-center">
                    <FormInput className="w-10 h-10 mx-auto text-blue-600 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Easy Form Builder</h3>
                    <p className="text-gray-600">
                        Drag, drop, and customize questions in seconds — no coding needed.
                    </p>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border text-center">
                    <QrCode className="w-10 h-10 mx-auto text-blue-600 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Instant QR Code</h3>
                    <p className="text-gray-600">
                        Automatically generate a QR code for your form to share anywhere.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-gray-500 text-sm pb-6">
                © {new Date().getFullYear()} form-qr.com — All rights reserved.
            </footer>
        </main>
    );
}
