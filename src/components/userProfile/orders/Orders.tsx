import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import useAuth from '../../../hook/useAuth';

const Orders = () => {
    interface IOrder{
        [key:string]: any
    }
    const { user } = useAuth();
    const [orders, setOrders ] = useState<IOrder[]>([]);
    useEffect( ()=>{
        fetch(`https://obscure-eyrie-36427.herokuapp.com/orders/${user.email}`)
        .then( res=>res.json())
        .then( data => setOrders(data))
    },[user.email])
    return (
        <div>
            {
                orders.length>0 ? <Table responsive>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Payment Method</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map( od=>(
                                <tr >
                                    <td>
                                        <img width="80px" src={od.product.img} alt="" />
                                    </td>
                                    <td>
                                        <h6>{od.product.title}</h6>
                                    </td>
                                    <td>
                                        <p>x{od.product.quantity}</p>
                                    </td>
                                    <td>
                                        <p>{od.product.size}</p>
                                    </td>
                                    <td>
                                        <p>${(od.product.price*od.product.quantity).toFixed(2)}</p>
                                    </td>
                                    <td>
                                        <p>{od.paymentMethod}</p>
                                    </td>
                                    <td>
                                        {od.paymentMethod==='stripe' ? <p>Paid</p> : <p>Unpaid</p> }
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                    </Table> : <h3 className='text-danger text-center my-5'>You didn't place any order !</h3>
            }
        </div>
    );
};

export default Orders;