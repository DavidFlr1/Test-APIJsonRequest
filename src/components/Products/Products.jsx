import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Button, Input, Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import './products.css'

const Products = ({ data }) => {
    const [orders, setOrders] = useState([])

    const handleOrders = async () => {
        await data

        setOrders(data.orders)
    }
    
    handleOrders();


    return (
        <div>
            <Container classname="themed-container" fluid={true}>
                <Row className="headerBar" md="4">
                    <Col md="3">
                        <Button className="headerButtons" size="lg" color="secondary" style={{float:"left", width: "90%"}}>Refresh</Button>
                    </Col>
                    <Col md="8">
                        <Button className="headerButtons" size="lg" color="primary" style={{float:"left", width: "30%"}}>New order</Button>
                    </Col>
                </Row>

                <Row className="body">
                    <Col className="dock" lg="4">
                        <div className="order-list"> 

                            <Button className="order">HOLA</Button>
                        </div>
                    </Col>
                    <Col className="order-information">
                    
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Products
