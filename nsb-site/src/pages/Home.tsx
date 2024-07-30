import { useEffect, useState } from "react";
import homeImage from "../assets/images/home.jpg";
// import News from "../components/News";
import Concerts from "./Concerts";
import { Link } from "react-router-dom";
// import FrontPageVideo from "../components/FrontPageVideo";

function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setShowPopup(false);
      }
    });
  }, []);

  return (
    <>
      <img
        src={homeImage}
        alt="Home"
        className="object-cover h-screen w-full"
      />

      {/* popup for nyhetsbrev */}
      <div
        className={`font-extralight ${
          showPopup ? "opacity-100" : "right-0 opacity-0"
        } transition-all duration-1000 absolute right-0 bottom-0 sm:w-72 m-2 xs:m-6 rounded-xl p-4 text-white bg-primary shadow-xl`}
      >
        <p className="mb-2">
          Alle som er registrert i vårt nyhetsbrev vil bli oppdatert om våre
          konserter, samt motta mulighet for forhåndsbestilling av billetter og
          rabatterte billetter!
        </p>
        <a
          href="https://secure.officevisual.net/su/38079648418011?fbclid=IwAR2TDgzvcBkLk3m97aMXHIB9KYPDqfBYLPowXZnVI5RWgwogiPNc1OQ71Bc_aem_ATGPg5jUaEbZ47ia99mtFawLaKthQAfDHvnejy5Hini085kYOKgVv5wdA_hhtkmhoUk"
          target="blank"
        >
          <button className="btn2">Meld deg på her</button>
        </a>
      </div>

      <div className="p-2 lg:w-4/5 xl:w-[1000px] mx-auto pb-8">
        <div>
          <h2 className="py-2 text-center">Neste konsert</h2>
          <Concerts nextOnly={true} />
        </div>

        <br />

        <iframe
          src="https://open.spotify.com/embed/artist/07RkGtZNwFOTFyVFEw4cMY?utm_source=generator&theme=0"
          width="100%"
          height="500"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <br />
        <div className="flex justify-center">
          <Link to="/music">
            <button className="btn1">Se alle utgivelser</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
