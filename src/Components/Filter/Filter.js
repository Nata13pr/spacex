import { useContext } from "react";
import authContext from "../../context/auth/context.js";

function Filter() {
  const { rocketName, flight, rocketNumber, handleChangeFIlter } =
    useContext(authContext);
  return (
    <>
      <label>
        Rocket name
        <input
          type="text"
          name="rocketName"
          value={rocketName}
          onChange={handleChangeFIlter}
        />
      </label>
      <label>
        Flight number
        <input
          type="text"
          name="flight"
          value={flight}
          onChange={handleChangeFIlter}
        />
      </label>
      <label>
        Rocket number
        <input
          type="text"
          name="rocketNumber"
          value={rocketNumber}
          onChange={handleChangeFIlter}
        />
      </label>
    </>
  );
}

export default Filter;
