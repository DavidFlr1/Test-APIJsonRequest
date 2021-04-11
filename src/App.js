import React, { useState, useEffect } from 'react'
import { Products } from './components/index'
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Table } from 'reactstrap';
import { getOrder, postOrder } from './components/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles.css'

const App = () => {
    const [orders, setOrders] = useState({})
    const [items, setItems] = useState({})
    const [activeOrder, setActiveOrder] = useState({})

    const [sku, setSku] = useState('')
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    
    const [disabled, setDisabled] = useState(true)
    
    const fetchOrder = async () => {
        await fetch(getOrder)
                .then((response) => response.json())
                .then((object) => { 
                    setOrders(object.orders)
                })
    }

    const handleItems = (order) => {
        if(Object.keys(order).length === 0) {
            console.log("Error handling json: empty json")
        } else {
            setActiveOrder(order)
            setItems(order.items)

            console.log(order)
            console.log(items)
        }
    }
    
    const handleNewProduct = () => {
        setDisabled(!disabled)
    }

    const pushOrder = async () => {

    }
    
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
                                <Col sm={3} style={{padding: "0 0 0 1rem"}}> <Input required onChange disabled={disabled} placeholder="#"/> </Col>
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
                        <Button color="success" disabled={disabled} onClick={() => pushOrder()} style={{float: "right"}} >Save</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App
