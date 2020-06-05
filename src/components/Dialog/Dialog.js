import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from 'react-router-dom';

export default function SimpleDialog(props) {
    const { open, setOpen } = props;
    const { link, setLink } = props;
    const history = useHistory();
    const handleClose = () => {
        setOpen(false);
    };
    
    async function handleAdd(){
      setOpen(true)
      history.push(link.Adicionar)
    }

    async function handleEdit(){
        setOpen(true)
        history.push(link.Editar)
    }

    async function handleDelete(){
        setOpen(true)
        history.push(link.Excluir)
    }

    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Selecione a opção desejada:</DialogTitle>
        <List>
            <ListItem button > 
              <Button onClick={handleAdd}>Adicionar</Button> 
              <Button onClick={handleEdit}>Editar</Button> 
              <Button onClick={handleDelete}>Excluir</Button> 
            </ListItem>
        </List>
      </Dialog>
    );
}