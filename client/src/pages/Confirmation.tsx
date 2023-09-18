import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../components/styles/Confirmation.css";
import imgLogo from "../assets/icons8-cap-100.png";

function Confirmation() {
  const [confirmation, setConfirmation] = useState(null);
  const [items, setItems] = useState(null);
  const { loginUser } = useUserContext();
  useEffect(() => {
    const retrieveConfirmation = async () => {
      const id = localStorage.getItem("session-id");
      console.log(id);

      const response = await fetch("api/checkout/confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      const { retrieveConfirmation, lineItems } = data;
      setItems(lineItems);
      setConfirmation(retrieveConfirmation);
      console.log(data);
    };

    retrieveConfirmation();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="ConfirmationPage">
          <img src={imgLogo} alt="" width={60} />
          {confirmation && (
            <div className="ConfirmationWrapper">
              <h2>
                Thank you for the purchase {confirmation.customer_details.name}!
              </h2>

              <br />
              <div className="ProductWrapper">
                {items.data.map((product) => (
                  <div key={product.id} className="ConfirmationProduct">
                    <p>
                      - {product.quantity} x {product.description}
                    </p>
                  </div>
                ))}
              </div>

              <br />
              <p>
                Total Summa:
                {confirmation.amount_total / 100} kr
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Confirmation;
