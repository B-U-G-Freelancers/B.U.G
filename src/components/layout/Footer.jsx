export default function Footer() {
    return (
        <footer className="bg-black py-20 border-t border-white/10 text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter">B.U.G</h2>
                        <p className="text-gray-400 mt-2 max-w-xs">
                            Build Your Genie. Bringing digital dreams to life with engineering precision.
                        </p>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-gray-500 uppercase tracking-widest text-xs">Socials</h3>
                            <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">Instagram</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-gray-500 uppercase tracking-widest text-xs">Legal</h3>
                            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p>&copy; {new Date().getFullYear()} B.U.G. All rights reserved.</p>
                    <p>Designed in the Void.</p>
                </div>
            </div>
        </footer>
    );
}
