import Link from "next/link"
import Image from "next/image"

import logo from "@/assets/image 44 (2) (1) 2 (1).png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import googlePlay from "@/assets/icons/Google Play Black.png"
import ApplePlay from "@/assets/icons/Google Play Black (1).png"
import youtube from "@/assets/icons/youtube.png"
import tiktok from "@/assets/icons/tiktok.png"
import snapchat from "@/assets/icons/snapchat.png"
import instagram from "@/assets/icons/instagram.png"
import facebook from "@/assets/icons/facebook.png"

const socials = [
    { name: "youtube",   icon: youtube,   href: "#" },
    { name: "tiktok",    icon: tiktok,    href: "#" },
    { name: "snapchat",  icon: snapchat,  href: "#" },
    { name: "instagram", icon: instagram, href: "#" },
    { name: "facebook",  icon: facebook,  href: "#" },
]

export default function Footer() {
    return (
        <footer className="border-t">
            {/* Main Footer */}
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">

                {/* Col 1 - Logo & Info */}
                <div className="flex flex-col gap-4">
                    <Image src={logo} alt="Logo" width={120} height={120} />
                    <p className=" text-primary leading-relaxed">
                        Fashion made for you – stylish, and always on trend. Shop the looks you love, anytime, anywhere.
                    </p>
                    <div className="flex flex-col gap-1 text-sm">
                        <p className="text-primary"><span className="font-semibold">Email:</span> nourb.gmail.com</p>
                        <p className="text-primary"><span className="font-semibold">Phone:</span> 01123456789</p>
                        <p>
                            <span className="font-semibold text-primary">Main adress: </span>
                            <Link href="#" className="text-primary underline text-xs">
                                Mansoura (Section 2), First of Mansoura, Dakahlía, Egypt
                            </Link>
                        </p>
                    </div>
                    {/* <div className="text-sm font-medium">
                        English →
                    </div> */}
                </div>

                {/* Col 2 - Section */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-primary text-2xl">Section</h3>
                    <nav className="flex flex-col gap-4">
                        <Link href="#" className=" hover:text-black text-primary underline transition-colors">Evening Fashion</Link>
                        <Link href="#" className=" hover:text-black text-primary underline transition-colors">Leather Decorations</Link>
                        <Link href="#" className=" hover:text-black text-primary underline transition-colors">Natural Leather Clothing and Fashion</Link>
                        <Link href="#" className=" hover:text-black text-primary underline transition-colors">Natural Leather Products</Link>
                    </nav>
                </div>

                {/* Col 3 - Center & Help */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-primary text-2xl">Center & Help</h3>
                    <nav className="flex flex-col gap-4">
                        <Link href="#" className=" hover:text-black text-primary underline transition-colors">Home</Link>
                        <Link href="#" className=" hover:text-black text-primary underline transition-colors">FAQ</Link>
                        <Link href="#" className=" hover:text-black text-primary underline transition-colors">How to buy</Link>
                    </nav>
                </div>

                {/* Col 4 - Newsletter & App */}
                <div className="flex flex-col gap-5">
                    {/* Newsletter */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-primary text-2xl">Join our newsletter</h3>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 border px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                            />
                            <Button className="bg-primary text-white text-sm px-4 py-1.5 hover:bg-primary/90 hover:text-white transition-colors">
                                Subscribe
                            </Button>
                        </div>
                    </div>

                    {/* Download App */}
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-primary text-2xl">Download App</h3>
                        <div className="flex gap-2">
                            <Link href="#">
                                <Image src={googlePlay} alt="Google Play" className="w-[140px] max-w-full transition duration-300" />
                            </Link>
                            <Link href="#">
                                <Image src={ApplePlay} alt="App Store" className="w-[140px] max-w-full transition duration-300" />
                            </Link>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3 mt-5">
                        {socials.map((social) => (
                            <Link
                                key={social.name}
                                href={social.href}
                                className="bg-primary p-3 flex justify-center items-center rounded-full hover:bg-primary/80 duration-300"
                            >
                                <Image
                                    src={social.icon}
                                    alt={social.name}
                                    width={20}
                                    height={20}
                                    className="size-4 object-contain"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t">
                <div className="container flex items-center justify-between py-4 text-primary px-30">
                    <p>All rights reserved © Club 2025</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-primary hover:text-black transition-colors">privacy policy</Link>
                        <Link href="#" className="text-primary hover:text-black transition-colors">Terms and Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}