import React from "react";
import amazonPayLogo from "../../assets/imgs/amazon-pay.png";
import americanExpress from "../../assets/imgs/American-Express-Color.png";
import masterCardLogo from "../../assets/imgs/mastercard.webp";
import paypalLogo from "../../assets/imgs/paypal.png";
import appstoreLogo from "../../assets/imgs/get-apple-store.png";
import googleplaylogo from "../../assets/imgs/get-google-play.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-slate-950 py-8  mt-32">
        <div className="container space-y-4">
          <header>
            <h2 className="text-xl font-semibold text-slate-200">
              Get the SwiftShop App{" "}
            </h2>
            <p className="text-slate-400">
              We Will Send You a link, open it on your phone or download the app{" "}
            </p>
          </header>

   
          <div className="p-1 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="formControl grow"
            />
            <button className="btn bg-primary-800 font-semibold text-sm uppercase text-white hover:bg-primary-900 transition-colors duration-300">
              Share App Link{" "}
            </button>
          </div>

       
          <div className="py-5 flex flex-col md:flex-row justify-between items-center gap-5 border-y-2 border-slate-300 border-opacity-50">
          
            <div className="payment flex flex-wrap justify-center md:justify-start gap-3 items-center">
              <h3 className="text-slate-300">Payment Partners</h3>
              <img className="w-20" src={amazonPayLogo} alt="amazon logo" />
              <img className="w-20" src={americanExpress} alt="american express logo" />
              <img className="w-16" src={masterCardLogo} alt="master card logo" />
              <img className="w-20" src={paypalLogo} alt="paypal logo" />
            </div>

            
            <div className="download flex flex-wrap justify-center md:justify-start gap-3 items-center">
              <h3 className="text-slate-300">Get Deliveries With SwiftShop</h3>
              <img className="w-24" src={appstoreLogo} alt="apple store logo" />
              <img className="w-[110px]" src={googleplaylogo} alt="google play logo" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
