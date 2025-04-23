'use client'

import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

import { MapCenterLat, MapCenterLng } from '@/constants'

const initialLocation = { lat: MapCenterLat, lng: MapCenterLng }

interface MapProps {
  onLocationChange?: (location: { lat: number; lng: number }) => void
  scrollWheelZoom?: boolean
  locationAsCenter?: boolean
  readOnly?: boolean
  location: { lat: number; lng: number }
  title?: string
}

const Map = (props: MapProps) => {
  // ** Props
  const {
    onLocationChange,
    scrollWheelZoom = true,
    locationAsCenter = false,
    readOnly = false,
    location,
    title
  } = props

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(initialLocation)

  function LocationMarker() {
    useMapEvents({
      click(e: { latlng: any }) {
        const newPosition = e.latlng

        if (!readOnly) {
          setPosition(newPosition)
          if (onLocationChange) onLocationChange(newPosition) // Pass the updated location to the parent
        }
      }
    })

    return position === null ? null : (
      <Marker position={position}>
        <Popup>{title}</Popup>
      </Marker>
    )
  }

  useEffect(() => {
    if (location) {
      setPosition(location)
    }
  }, [location])

  return (
    <div className='map-container w-full h-full rounded-lg border'>
      <MapContainer
        center={locationAsCenter ? location : initialLocation}
        zoom={12}
        scrollWheelZoom={scrollWheelZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  )
}

export default Map
