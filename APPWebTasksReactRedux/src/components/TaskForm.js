import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, DatePicker ,FormControl, InputLabel, Select, MenuItem, Button, FormHelperText, Checkbox } from "@material-ui/core";
import  useForm  from "./useForm";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import * as actions from "../actions/Task";


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})


const initialFieldValues = {
    description: '',
    dateCreated: '',
    isValidity: 'false',
    id: '',
}

const TaskForm = ({ classes, ...props }) => {

    const { addToast } = useToasts()
    const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('description' in fieldValues)
        temp.description = fieldValues.description ? "" : "Campo obligatorio."
    if ('dateCreated' in fieldValues)
        temp.dateCreated = fieldValues.dateCreated ? "" : "Campo obligatorio."
    setErrors({
        ...temp
    })
    if (fieldValues === values)
        return Object.values(temp).every(x => x === "")
}


const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
} = useForm(initialFieldValues, validate, props.setCurrentId)
  
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("¡Exitoso!", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createTask(values, onSuccess)
            else
                props.updateTask(props.currentId, values, onSuccess)
        }else 
        addToast("Error!", { appearance: 'error' })
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.taskList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="description"
                        variant="outlined"
                        label="Descripción"
                        value={values.description}
                        onChange={handleInputChange}
                        {...(errors.description && { error: true, helperText: errors.description })}
                    />
                    <TextField
                        id="date"
                        name="dateCreated"
                        label="Fecha Creación"
                        type="date"
                        value={values.dateCreated}
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={handleInputChange}
                        {...(errors.dateCreated && { error: true, helperText: errors.dateCreated })}
                    />
                    <Checkbox
                        name="isValidity"
                        variant="outlined"
                        label="Vigente"
                        value={values.isValidity}
                        onChange={handleInputChange}
                        {...(errors.isValidity && { error: true, helperText: errors.isValidity })}
                    />
                </Grid>
                <Grid item xs={6}>
                    
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Crear
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Limpiar
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
        );

}


const mapStateToProps = state => ({
    taskList: state.task.list
})

const mapActionToProps = {
    createTask: actions.create,
    updateTask: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TaskForm));