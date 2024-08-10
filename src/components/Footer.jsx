import React from "react";
import { fdw, eqh } from "../assets";

const footerLinks = [
  {
    id: 1,
    title: "contact",
    links: ["contact us"],
  },
  {
    id: 2,
    title: "navigation",
    links: ["business", "personal", "mortgage center", "why us", "contact us"],
  },
  {
    id: 3,
    title: "information",
    links: [
      "accesibility",
      "complaint",
      "document & forms",
      "security",
      "privacy policy",
    ],
  },
  {
    id: 4,
    title: "helpful links",
    links: [
      "community",
      "career",
      "faqs",
      "fraud prevention",
      "secure messaging",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white p-6 flex items-center justify-center">
      <div className="grid md:grid-cols-3 lg:grid-cols-5 w-full lg:max-w-[1200px] lg:mx-auto gap-10">
        {footerLinks.map((link) => {
          return (
            <div key={link.id} className="flex items-start gap-4 font-thin">
              <h5 className="text-blue-500 uppercase ">{link.title}</h5>
              <ul className="capitalize">
                {link.links.map((ln, index) => {
                  return <li key={index}>{ln}</li>;
                })}
              </ul>
            </div>
          );
        })}
        <div className="flex flex-col justify-between font-thin">
          <div className="flex items-center gap-10">
            <img src={fdw} alt="" className="w-[30px]" />
            <img src={eqh} alt="" className="w-[30px]" />
          </div>
          <small>&copy; 2024 Metabank</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
