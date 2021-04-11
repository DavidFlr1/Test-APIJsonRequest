import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { UncontrolledPopover, PopoverHeader, PopoverBody, Alert } from 'reactstrap';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { Table } from 'reactstrap';
import { getOrder, postOrder } from './components/index'

import './styles.css'

const App = () => {
    // Const to alocate orders and its items
    const [orders, setOrders] = useState({})
    const [items, setItems] = useState({})
    const [activeOrder, setActiveOrder] = useState(0)

    // Const to alocate new registry information
    const [id, setId] = useState('')
    const [sku, setSku] = useState('')
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    
    // Set new registrys
    const [disabled, setDisabled] = useState(true) 
    const [required, setRequired] = useState(true)
    const [open, setOpen] = useState(false);
    
    // Call function to request the json from the API alocated on /src/lib/enviosGet.js
    const fetchOrder = async () => {
        await fetch(getOrder)
                .then((response) => response.json())
                .then((object) => { 
                    setOrders(object.orders)
                })
    }

    // Handle items into its use statement const
    // If json request has not been receive yet then is empty, temporarily handle that case until request is finished
    const handleItems = (order) => {
        if(Object.keys(order).length === 0) {
            console.log("Error handling json: empty json")
        } else {
            setActiveOrder(order)
            setItems(order.items)

            setActiveOrder(order.id)

            console.log(order)
            console.log(items)
            console.log(activeOrder)
        }
    }
    
    // Handle new products disabling and enabling its respective controls
    // If enabling set a new random id
    const handleNewProduct = () => {
        setDisabled(!disabled)

        if(disabled){
            setId(Math.floor(Math.random() * 9999999999999))
        } else {
            setId('')
        }

    }

    // Push new item into order
    // Request all camps to save
    const pushOrder = async () => {
        if(id !== "" && sku !== "" && name !== "" && quantity !== "" && price !== ""){
            setRequired(false)
            orders.map((key) => {
                if(key.id === activeOrder){
                    key.items.push({"id": id, "sku": sku, "name": name, "quantity": quantity, "price": price})
                    console.log(key.items)
                }
            })

            setId('')
            setSku('')
            setName('')
            setQuantity('')
            setPrice('')
            setDisabled(!disabled)
        } else {
            setRequired(true)
        }
    }
    
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(async () => {
        await fetchOrder();
    }, []);
    
    return (
        <div className="App">
            <Container classname="themed-container" fluid={true}>
                <Row className="headerBar" md="4">
                    <Col md="12">
                        <Button onClick={() => handleNewProduct()} className="headerButtons" size="lg" color="warning" style={{float: "right", width: "20%"}}>New product</Button>
                    </Col>
                </Row>

                <Row className="body">
                    <Col className="dock" lg="4">
                        <div className="order-list"> 
                            {Object.keys(orders).length === 0 
                            ? <></> 
                            : orders.map((order) => <Button className="order" color="primary" onClick={() => handleItems(order)} disabled={!disabled}>Order {order.name}</Button>)}
                        </div>
                    </Col>
                    <Col className="order-information">
                        <Form>
                            <FormGroup row>
                                <Col sm={3} style={{padding: "0 0 0 1rem"}}> <Input required disabled value={id} placeholder="#"/> </Col>
                                <Col sm={1} style={{padding: "0 0 0 1rem"}}> <Input required onChange={(event) => {setSku(event.target.value)}} value={sku} disabled={disabled} placeholder="SKU" style={{width: "145%"}} /> </Col>
                                <Col sm={4} style={{padding: "0 0 0 2.4rem"}}> <Input required onChange={(event) => {setName(event.target.value)}} value={name} disabled={disabled} placeholder="Name" style={{width: "110%"}}/> </Col>
                                <Col sm={2} style={{padding: "0 0 0 2.4rem"}}> <Input required onChange={(event) => {setQuantity(event.target.value)}} value={quantity} disabled={disabled} placeholder="Quantity"/> </Col>
                                <Col sm={2}> <Input required onChange={(event) => {setPrice(event.target.value)}} value={price} disabled={disabled} placeholder="Price"/> </Col>
                            </FormGroup>
                        </Form>
                        <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>SKU</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(items).length === 0 
                            ? <></>
                            : items.map((item) => 
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.sku}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )}
                        </tbody>
                        </Table>
                        <Button color="info" disabled={disabled} onClick={handleClickOpen} style={{float: "right", margin: "0 0 0 20px"}} >Pay</Button>
                        <Button id="PopoverFocus" type="button" color="success" disabled={disabled} onClick={() => pushOrder()} style={{float: "right"}} >Add</Button>
                        {!require 
                            ? <></>
                            :   <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
                                    <PopoverHeader style={{color: "#DE3232"}}>Fields required</PopoverHeader>
                                    <PopoverBody>All fields must be completed to continue</PopoverBody>
                                </UncontrolledPopover>}

                                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                <DialogTitle id="alert-dialog-title">{"Transaction completed"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Congratulations, your buy has been succesfully completed and your package will arrive soon
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary" autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App
