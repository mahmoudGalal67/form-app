import { Avatar, Button, Card, CardActions, CardContent, CardHeader,    Typography } from '@material-ui/core'
import Rating from "@material-ui/lab/rating"
import React from 'react'

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});



function BootcampCard({bootcamp}) {
  return(
    <Card>
      <CardHeader
        avatar={<Avatar src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI="/>}
        title={<Typography variant="h6">{bootcamp.name}</Typography>}
      />

      <CardContent>
        <Typography variant="caption">{bootcamp.desc}</Typography>

        <Typography variant="h6" gutterBottom>
          {formatter.format(bootcamp.price)}
        </Typography>

        <Rating
          value={bootcamp.rating}
          readOnly
          name={bootcamp.name}
          size="small"
          precision={0.5}
        />
      </CardContent>

      <CardActions>
        <Button variant="contained" size="small" color="primary">
          Book Now
        </Button>
        <Button size="small" color="primary">
          Learn more
        </Button>
      </CardActions>
    </Card>
  )
}

export default BootcampCard