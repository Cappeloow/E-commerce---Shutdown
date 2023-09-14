import React from "react";

function Confirmation() {
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
    console.log(data);
  };

  retrieveConfirmation();
  return <div>Confirmation</div>;
}

export default Confirmation;
