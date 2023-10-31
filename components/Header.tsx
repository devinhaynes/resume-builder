import Link from "next/link";
import wordmark from "/public/assets/wordmark.png";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between p-5 items-center">
      <div className="logo-container">
        <Image height={50} width={178} src={wordmark} alt="elevator" />
      </div>
      <div className="temp">
        <Link className="submit-button" href="/resume">
          Get Started
        </Link>
      </div>
    </header>
  );
}
