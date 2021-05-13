import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField'

export default function Text(props) {
    return(

        <TextField id={props.id} label={props.title} key={props.key}>

        </TextField>
    )



}