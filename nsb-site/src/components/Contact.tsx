import { Mail, Phone } from "lucide-react";
import SoMe from "./SoMe";

function Contact() {
  const emailAddress = "post@detnyensb.no";
  return (
    <div className="grid gap-8 sm:flex justify-between">
      {/* contact */}
      <div>
        <div className="flex gap-2 py-2">
          <Mail size={30} strokeWidth={1} />
          <a className="hover:underline" href={`mailto:${emailAddress}`}>
            <p className="hidden sm:block">{emailAddress}</p>
            <p className="block sm:hidden">Send oss en epost</p>
          </a>
        </div>
        <div className="flex gap-2 py-2 hover:underline">
          <Phone size={30} strokeWidth={1} />
          <a href="tel:+4797672764">
            <p>+47 97 67 27 64</p>
          </a>
        </div>
      </div>

      {/* SoMe */}
      <div>
        <div className="flex gap-8">
          <SoMe face={true} size={40} />
          <SoMe insta={true} size={40} />
          <SoMe yt={true} size={40} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
