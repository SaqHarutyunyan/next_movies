const Footer = () => {
    return (
        <footer className=" text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <p>
                    © {new Date().getFullYear()} MovieTime. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
