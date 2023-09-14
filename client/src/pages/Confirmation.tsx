import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <div>
      <Header />
      <main>
        {confirmation && (
          <div>
            <p>
              Thank you for the purchase {confirmation.customer_details.name}!
              {items.data.map((product) => (
                <div key={product.id}>
                  <p>
                    {product.quantity} x {product.description}
                  </p>
                </div>
              ))}
            </p>
            <p>
              Total Summa:
              {confirmation.amount_total / 100} kr
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Confirmation;
