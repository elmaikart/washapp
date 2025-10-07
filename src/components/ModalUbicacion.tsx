/// <reference types="@types/google.maps" />
"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, MapPin } from "lucide-react";


/* ======================= INTERFACE ======================= */
interface ModalUbicacionProps {
  tipo: "retiro" | "devolucion";
  onClose: () => void;
  onSelectUbicacion: (lat: number, lng: number, address: string) => void;
}

/* ======================= COMPONENT ======================= */
export default function ModalUbicacion({
  tipo,
  onClose,
  onSelectUbicacion,
}: ModalUbicacionProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // @ts-ignore
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // @ts-ignore
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  // @ts-ignore
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  /* ======================= INIT GOOGLE MAP ======================= */
  useEffect(() => {
    if (!mapRef.current) return;

    // Esperar a que el script de Google Maps cargue
    const initMap = () => {
      // @ts-ignore
      const google = window.google;
      if (!google || !google.maps) return;

      const initialCenter = { lat: -31.4167, lng: -64.1833 }; // Córdoba, por defecto

      const mapInstance = new google.maps.Map(mapRef.current!, {
        center: initialCenter,
        zoom: 14,
      });
      setMap(mapInstance);

      // Marcador inicial
      const markerInstance = new google.maps.Marker({
        position: initialCenter,
        map: mapInstance,
        draggable: true,
      });
      setMarker(markerInstance);

      // Buscar dirección cuando se arrastra el marcador
      google.maps.event.addListener(markerInstance, "dragend", () => {
        const pos = markerInstance.getPosition();
        if (pos) getAddress(pos.lat(), pos.lng());
      });

      // Input de búsqueda
      const input = document.getElementById("search-input") as HTMLInputElement;
      const sb = new google.maps.places.SearchBox(input);
      setSearchBox(sb);

      sb.addListener("places_changed", () => {
        const places = sb.getPlaces();
        if (places && places.length > 0) {
          const place = places[0];
          if (!place.geometry || !place.geometry.location) return;

          const newPos = place.geometry.location;
          mapInstance.setCenter(newPos);
          markerInstance.setPosition(newPos);
          getAddress(newPos.lat(), newPos.lng());
        }
      });

      setLoading(false);
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      window.addEventListener("load", initMap);
      return () => window.removeEventListener("load", initMap);
    }
  }, []);

  /* ======================= GET ADDRESS FROM COORDS ======================= */
  const getAddress = (lat: number, lng: number) => {
    // @ts-ignore
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        setAddress("Dirección no disponible");
      }
    });
  };

  /* ======================= CONFIRM SELECTION ======================= */
  const handleConfirm = () => {
    if (!marker) return;
    const pos = marker.getPosition();
    if (pos) onSelectUbicacion(pos.lat(), pos.lng(), address);
    onClose();
  };

  /* ======================= RENDER ======================= */
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-lg rounded-xl shadow-lg overflow-hidden relative animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-wash-primary">
            Seleccionar ubicación de {tipo === "retiro" ? "Retiro" : "Devolución"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Buscador */}
        <div className="p-4 border-b">
          <input
            id="search-input"
            type="text"
            placeholder="Buscar dirección o punto de referencia"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-wash-primary"
          />
        </div>

        {/* Mapa */}
        <div className="relative h-[300px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <p className="text-gray-600 text-sm">Cargando mapa...</p>
            </div>
          )}
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Dirección actual */}
        <div className="p-4 text-sm bg-gray-50 border-t flex items-center gap-2">
          <MapPin className="w-4 h-4 text-wash-primary" />
          <span className="text-gray-700 truncate">{address || "Seleccioná una ubicación..."}</span>
        </div>

        {/* Botón confirmar */}
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={handleConfirm}
            className="bg-wash-primary text-white px-5 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Confirmar ubicación
          </button>
        </div>
      </div>
    </div>
  );
}
