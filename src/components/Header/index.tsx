import Link from "next/link";

const Header = () => {
    return (
        <header className="text-white py-4 w-full absolute z-30">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    🎬 MovieTime
                </Link>

                {/* Navigation */}
                <nav className="space-x-4">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <Link href="/favorites" className="hover:underline">
                        Favorites
                    </Link>
                    <Link href="/search" className="hover:underline">
                        Search
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
