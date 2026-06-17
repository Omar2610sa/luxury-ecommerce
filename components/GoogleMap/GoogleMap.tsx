"use client"
import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const Marker = () => (
    <div style={{
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
        fontSize: '2rem'
    }}>
        📍
    </div>
);

type SimpleMapProps = {
    onLocationSelect: (lat: number, lng: number) => void;
}

export default function SimpleMap({ onLocationSelect }: SimpleMapProps) {
    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

    const defaultProps = {
        center: { lat: 31.021093, lng: 31.225048 },
        zoom: 11
    };

    const handleClick = ({ lat, lng }: { lat: number; lng: number }) => {
        setMarker({ lat, lng });
        onLocationSelect(lat, lng);
    };

    return (
        <div style={{ height: '250px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onClick={handleClick}
            >
                {marker && (
                    <Marker lat={marker.lat} lng={marker.lng} />
                )}
            </GoogleMapReact>
        </div>
    );
}