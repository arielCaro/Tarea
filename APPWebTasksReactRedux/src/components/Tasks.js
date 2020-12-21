import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import TaskForm from './TaskForm';
import * as actions from '../actions/Task';


    const styles = theme => ({
        root: {
            "& .MuiTableCell-head": {
                fontSize: "1.25rem"
            }
        },
        paper: {
            margin: theme.spacing(2),
            padding: theme.spacing(2)
        }
    })

const Tasks = ({ classes, ...props }) => {
        const [currentId, setCurrentId] = useState(0)

        useEffect(() => {
            props.fetchAllDTasks()
        }, [])

        const { addToast } = useToasts()

        const onDelete = id => {
            if (window.confirm('¿Estás seguro(a) de eliminar este registro?'))
                props.deleteTask(id,()=>addToast("Se ha eliminado Correctamente", { appearance: 'info' }))
        }

    

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <TaskForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>Fecha Creación</TableCell>
                                    <TableCell>Vigente</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.taskList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.description}</TableCell>
                                            <TableCell>{record.dateCreated}</TableCell>
                                            <TableCell>{record.isValidity}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}


const mapStateToProps = state => ({
    taskList: state.task.list
})

const mapActionToProps = {
    fetchAllDTasks: actions.fetchAll,
    deleteTask: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Tasks));