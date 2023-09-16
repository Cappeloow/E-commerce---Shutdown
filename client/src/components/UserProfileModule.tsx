import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import "./styles/ModuleDialog.css";
type Props = {
  setUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserProfileModule = ({ setUserProfile }: Props) => {
  const { loginUser, logoutUser } = useUserContext();
  const [isClicked, setIsClicked] = useState(false);
  const [orders, setOrders] = useState([]);
  const handleClick = () => {
    console.log("clicker");
    logoutUser();
  };

  const DisplayOrders = async () => {
    const response = await fetch("api/orders/my-orders");
    const data = await response.json();
    setOrders(data);
    console.log(data);
  };

  useEffect(() => {
    if (isClicked) {
      DisplayOrders();
    }
  }, [isClicked]);

  return loginUser ? (
    <>
      <dialog className="UserProfileDialogBox" open>
        <p onClick={() => setUserProfile(false)}>x</p>
        <div className="UserInfo">
          <h1>{loginUser.name}</h1>
          <p>{loginUser.email}</p>
          <button onClick={handleClick}>Logout</button>
          <button onClick={() => setIsClicked(true)}>Order History</button>
          {orders &&
            orders.map((order) => (
              <div key={order.orderId}>
                <p>{order.orderId}</p>

                {order.orderedItems.map((product) => (
                  <div key={product.product}>
                    <p>
                      {product.quantity}x{product.product} = {product.totalSum}
                    </p>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </dialog>
    </>
  ) : null;
};

export default UserProfileModule;
