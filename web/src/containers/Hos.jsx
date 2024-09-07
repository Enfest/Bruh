import React, { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import axios from "./api";
import Button from "@mui/material/Button";
const fakeData = [
  {
    name: "仁愛分部",
    division: "一般精神科",
    register_link: "https://webreg.tpech.gov.tw/RegOnline1_1.aspx?ZCode=F",
    address: "臺北市大安區仁愛路四段10號",
    distance: 3.4,
    map_url: "https://maps.google.com/?q=臺北市大安區仁愛路四段10號",
    icon: "default",
    lat: 25.0250125,
    lgn: 121.5448053,
  },
  {
    name: "仁愛分部2",
    division: "一般精神科2",
    register_link: "https://webreg.tpech.gov.tw/RegOnline1_1.aspx?ZCode=F",
    address: "臺北市大安區仁愛路四段10號2",
    distance: 3.4,
    map_url: "https://maps.google.com/?q=臺北市大安區仁愛路四段10號",
    icon: "default",
    lat: 25.5,
    lgn: 121.0,
  },
];
const Hos = () => {
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [center, setCenter] = useState({ lat: 10, lng: 121.565 });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC4IVDAJux6HPcbkx0KHM4ulwAnLJwLocU",
    libraries: ["places"],
  });
  console.log(typeof fakeData[0]["lat"]);

  useEffect(() => {
    if (navigator.geolocation && !userPosition) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      // Handle the case where geolocation is not supported
      Swal.fire({
        position: "middle",
        text: "允許存取使用者位置來使用此功能",
        icon: "warning",
        showCloseButton: true,
        showConfirmButton: false,
      });
    }
  }, []);

  const handleMarkerClick = (clinic) => {
    setSelectedClinic(clinic);
  };

  const handleMapClick = (event) => {
    setCenter({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={userPosition} // Use center state
          zoom={16}
          onClick={handleMapClick}
        >
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

          {fakeData.map((clinic, index) => {
            console.log(clinic);
            return (
              <MarkerF
                label={index}
                key={index}
                position={{ lat: clinic["lat"], lng: clinic["lgn"] }}
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
            );
          })}
          {selectedClinic ? (
            <InfoWindowF
              position={{ lat: selectedClinic["lat"], lng: selectedClinic["lgn"] }}
              onCloseClick={() => setSelectedClinic(null)}
              visible={false}
            >
              <div style={{ padding: "10px", color: "black" }}>
                <p>
                  <strong>名稱</strong> {selectedClinic["name"]}
                </p>
                <p>
                  <strong>地址</strong> {selectedClinic["address"]}
                </p>
                <p></p>
              </div>
            </InfoWindowF>
          ) : (
            <></>
          )}
        </GoogleMap>
      )}
      {!isLoaded && <div>地圖載入中...</div>}
      <Button onClick={() => ClickEvent()}>ddd</Button>
    </div>
  );
};

export default Hos;
