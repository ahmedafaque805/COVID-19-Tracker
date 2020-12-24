import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core'
import '../../App.css'

function InfoBox({ title, cases, total }) {


  return (


     <Card className="infoBox" >
      <CardContent>
        <Typography className="infoBox-title" color="textSecondary">{title}</Typography>
        <h2 className="infoBox-cases"> {cases} </h2>
        <Typography className="infoBox-total" color="textSecondary"> {total} Total </Typography>
      </CardContent>
    </Card>
   
  )
}

export default InfoBox;
