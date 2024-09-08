import React, { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import axios from "./api";
import Button from "@mui/material/Button";
const AddMap = ({ add }) => {
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [center, setCenter] = useState({ lat: 10, lng: 121.565 });
  const [familyAddress, setFamilyAddress] = useState([]);
  const [childAddress, setChildAddress] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC4IVDAJux6HPcbkx0KHM4ulwAnLJwLocU",
    libraries: ["places"],
  });

  useEffect(() => {
    setUserPosition({lat:25.02162588271662, lng:121.53522885876406})
    // if (navigator.geolocation && !userPosition) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       setUserPosition({
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       });
    //     },
    //     (error) => {
    //       console.error("Error getting geolocation:", error);
    //     }
    //   );
    // } else {
    //   // Handle the case where geolocation is not supported
    //   Swal.fire({
    //     position: "middle",
    //     text: "允許存取使用者位置來使用此功能",
    //     icon: "warning",
    //     showCloseButton: true,
    //     showConfirmButton: false,
    //   });
    // }

  }, []);

  useEffect(() => {
    if (userPosition) {
      setCenter(userPosition);
      console.log(userPosition)
      axios
        .post(
          "/getPos",
          { lat:userPosition["lat"], lng:userPosition["lng"] },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          const dd = response.data;
          const child = dd.slice(0, 5);
          setChildAddress(child);
          const family = dd.slice(5, dd.length);
          setFamilyAddress(family);
          console.log(child);
          console.log(family);
        });
    }
  }, [userPosition]);

  const handleMarkerClick = (clinic) => {
    setSelectedClinic(clinic);
  };

  const handleMapClick = (event) => {
    // setCenter({
    //   lat: event.latLng.lat(),
    //   lng: event.latLng.lng(),
    // });
  };

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={center} // Use center state
          zoom={15}
          onClick={handleMapClick}
        >
          {/* Add a marker for the user's position */}
          {userPosition && (
            <MarkerF
              position={userPosition}
              options={{
                icon: {
                  path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                  fillColor: "#d45251",
                  fillOpacity: 1,
                  scale: 2,
                },
              }}
            />
          )}
          {childAddress && add != "family" ? (
            childAddress.map((clinic, index) => (
              <MarkerF
                label={index}
                key={index}
                position={{ lat: clinic[1], lng: clinic[2] }}
                onClick={() => handleMarkerClick(clinic)}
                options={{
                  icon: {
                    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                    fillColor: "#f5ba4b",
                    fillOpacity: 1,
                    scale: 2,
                  },
                }}
              />
            ))
          ) : (
            <></>
          )}
          {familyAddress && add != "child" ? (
            familyAddress.map((clinic, index) => (
              <MarkerF
                label={index}
                key={index}
                position={{ lat: clinic[1], lng: clinic[2] }}
                onClick={() => handleMarkerClick(clinic)}
                options={{
                  icon: {
                    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                    fillColor: "#5ab4c5",
                    fillOpacity: 1,
                    scale: 2,
                  },
                }}
              />
            ))
          ) : (
            <></>
          )}
          {selectedClinic ? (
            <InfoWindowF
              position={{ lat: selectedClinic[1], lng: selectedClinic[2] }}
              onCloseClick={() => setSelectedClinic(null)}
            >
              <div
                style={{ padding: "3px", color: "black", marginTop: "1px", width: "30" }}
              >
                <p>
                  <strong>名稱</strong> {selectedClinic[0]}
                </p>
                <p>
                  <strong>地址</strong> {selectedClinic[3]}
                </p>
                <p>
                  <strong>科別</strong> {selectedClinic[4].split('"')[1]}
                </p>
              </div>
            </InfoWindowF>
          ) : (
            <></>
          )}
        </GoogleMap>
      )}
      {!isLoaded && <div>地圖載入中...</div>}
      {/* <Button onClick={() => ClickEvent()}>ddd</Button> */}
    </div>
  );
};

export default AddMap;
