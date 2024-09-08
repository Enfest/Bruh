import { useContext, createContext, useState, useEffect } from "react";
import React from "react";

const RContext = createContext({
    data: {},
});

const RProvider = (props) => {
    const [data, setData] = useState({});
    return (
        <RContext.Provider
            value={{
                data,
                setData,
            }}
            {...props}
        />
    );
};
const useR = () => useContext(RContext);
export { RProvider, useR };
