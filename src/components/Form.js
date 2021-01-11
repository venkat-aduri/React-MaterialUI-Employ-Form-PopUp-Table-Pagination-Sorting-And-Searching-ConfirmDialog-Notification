import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    root:{
        '& .MuiFormControl-root':{
            width : "80%",
            margin : theme.spacing(1)
        }
    }
}));

export default function  Form(props){
    const { children, ...others } = props;
    const classes = useStyles();
    return(
        <form className={classes.root} autoComplete="off" {...others}>
            {props.children}
        </form>
    )
};