import React, { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";

const AddMap = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [center, setCenter] = useState({ lat: 10, lng: 121.565 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC4IVDAJux6HPcbkx0KHM4ulwAnLJwLocU",
    libraries: ["places"],
  });
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC4IVDAJux6HPcbkx0KHM4ulwAnLJwLocU`
      );
      const json = await response.json();
      console.log(json.results[0]?.formatted_address);
      //setRealAddress(json.results[0]?.formatted_address);
      //return json?.results[0];
      // return json.movies;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
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
      () => {
        Swal.fire({
          position: "middle",
          text: "允許存取使用者位置來使用此功能",
          icon: "warning",
          showCloseButton: true,
          showConfirmButton: false,
        });
      };
    }
  }, []);
  useEffect(() => {
    userPosition ? getAddressFromCoordinates(userPosition.lat, userPosition.lng) : "";
    console.log(userPosition);
    setCenter(userPosition);
  }, [userPosition]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMapClick = (event) => {
    setCenter(event.latLng);
  };

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={userPosition} // Use user position if available
          zoom={16}
          onClick={handleMapClick}
        >
          {/* Add a marker for the user's position */}
          {userPosition ? <MarkerF position={userPosition} label="You" /> : <></>}

          {/* ... rest of your map content ... */}
        </GoogleMap>
      )}
      {!isLoaded && <div>地圖載入中...</div>}
    </div>
  );
};

export default AddMap;
