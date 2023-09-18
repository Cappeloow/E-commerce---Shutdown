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
        <h2 className="CloseDiv" onClick={() => setUserProfile(false)}>
          x
        </h2>
        <div className="UserInfoWrapper">
          <div className="UserInfo">
            <div className="UserName">
              <p>Username: </p>
              <p>{loginUser.name}</p>
            </div>

            <div className="Email">
              <p>Email: </p>
              <p>{loginUser.email}</p>
            </div>

            <div className="Buttons">
              <button onClick={handleClick}>Logout</button>
              <button onClick={() => setIsClicked(true)}>Order History</button>
            </div>
          </div>

          <div className="OrderHistory">
            {orders &&
              orders.map((order) => (
                <div key={order.orderId} className="ProductHistory">
                  <p>{order.orderId}</p>
                  {order.orderedItems.map((product) => (
                    <div key={product.id} className="ProductInHistory">
                      <p>
                        {product.quantity}x {product.product} -
                        {product.totalSum} {product.currency}
                      </p>
                    </div>
                  ))}
                  <p>
                    {order.orderSum / 100} {order.currency}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </dialog>
    </>
  ) : null;
};

export default UserProfileModule;
