import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core'
import '../../App.css'

function InfoBox({ title, cases, total, active, isRed, ...props }) {


  return (


    <Card onClick={props.onClick} className="infoBox" className={`infoBox ${active && "infoBox--selected"} ${
      isRed && "infoBox--red"
      }`}>
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary" gutterBottom>{title}</Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}> {total} </h2>
        <Typography className="infoBox__total" color="textSecondary">Today: ({cases}) </Typography>
      </CardContent>
    </Card>

  )
}

export default InfoBox;
