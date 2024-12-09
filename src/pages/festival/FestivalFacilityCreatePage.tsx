import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useFestivalById from '@/hooks/festival/useFestivalById'
import usePostCreateFacility from '@/hooks/festival/usePostCreateFacility'

const { naver } = window

const FestivalFacilityCreatePage = () => {
  const { id } = useParams()
  const { data: festival } = useFestivalById(Number(id))
  const { mutate: create } = usePostCreateFacility(Number(id))

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [type, setType] = useState('TOILET') // Default type set to 'TOILET'

  useEffect(() => {
    if (festival && naver) {
      const mapOptions = {
        center: new naver.maps.LatLng(Number(festival.latitude), Number(festival.longitude)),
        zoom: 10
      }

      const map = new naver.maps.Map('map', mapOptions)

      naver.maps.Event.addListener(map, 'click', (e) => {
        const lat = e.coord.lat()
        const lng = e.coord.lng()
        setLatitude(lat)
        setLongitude(lng)
      })
    }
  }, [festival, latitude, longitude])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Creating facility with the form data
    create({
      name,
      description,
      latitude,
      longitude,
      type // Include the selected type
    })
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom>
        Create Facility
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <TextField
          label="Latitude"
          variant="outlined"
          fullWidth
          margin="normal"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />

        <TextField
          label="Longitude"
          variant="outlined"
          fullWidth
          margin="normal"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />

        <FormControl
          fullWidth
          margin="normal">
          <InputLabel id="facility-type-label">Type</InputLabel>
          <Select
            labelId="facility-type-label"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
            required
          >
            <MenuItem value="TOILET">TOILET</MenuItem>
            <MenuItem value="INFO">INFO</MenuItem>
          </Select>
        </FormControl>

        <div
          id="map"
          style={{ width: '100%', height: '400px', marginTop: '20px' }}
        ></div>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ marginTop: '20px' }}
        >
          Create Facility
        </Button>
      </form>
    </Box>
  )
}

export default FestivalFacilityCreatePage
