import { useCallback, useEffect } from "react"
import { API } from 'aws-amplify';

export const OrderListing = () => {

    const fetchOrders = useCallback(() => {
        API.get('orders', '/orders', {}).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="table-container">
            <div className="order_list">
                <div className="list_header d-flex">
                    <h2 className="text-center order_num">Order num</h2>
                    <h2 className="text-left Name">Name</h2>
                    <h2 className="text-center Amount">Amount</h2>
                    <h2 className="text-center Items">Items</h2>
                    <h2 className="text-center Table">Type</h2>
                    <h2 className="text-center Payment">Payment</h2>
                    <h2 className="text-center Date">Updated On</h2>
                    <h2 className="text-right Action">Action</h2>
                </div>

                <ul>
                    <li className="d-flex animate__animated animate__fadeInUp wow">
                        <h3 className="text-center order_num">AB00123</h3>
                        <h3 className="text-left Name"><strong>Jimmy Taylor</strong></h3>
                        <h3 className="text-center Amount">$120.00</h3>
                        <h3 className="text-center Items">2</h3>
                        <h3 className="text-center Table">Dine-in</h3>
                        <h3 className="text-center Payment">Cash</h3>
                        <h3 className="text-center Date">12 June 2020 12:30 pm</h3>
                        <div className="btn_container d-flex mr-0 ml-auto">
                            <button type="button" className="btn">
                                <a data-toggle="modal" data-target="#receipt_model"><i className="zmdi zmdi-eye"></i></a>
                            </button>
                            <button type="button" className="btn">
                                <a href="#"><i className="zmdi zmdi-delete"></i></a>
                            </button>
                            <button type="button" className="btn">
                                <a href="#"><i className="zmdi zmdi-edit"></i></a>
                            </button>
                        </div>
                    </li>
                    <li className="d-flex animate__animated animate__fadeInUp wow">
                        <h3 className="text-center order_num">AB00124</h3>
                        <h3 className="text-left Name"><strong>Peter Johnson</strong></h3>
                        <h3 className="text-center Amount">$540.00</h3>
                        <h3 className="text-center Items">5</h3>
                        <h3 className="text-center Table">Delivery</h3>
                        <h3 className="text-center Payment">Cash</h3>
                        <h3 className="text-center Date">10 June 2020 12:30 pm</h3>
                        <div className="btn_container d-flex mr-0 ml-auto">
                            <button type="button" className="btn">
                                <a data-toggle="modal" data-target="#receipt_model"><i className="zmdi zmdi-eye"></i></a>
                            </button>
                            <button type="button" className="btn">
                                <a href="#"><i className="zmdi zmdi-delete"></i></a>
                            </button>
                            <button type="button" className="btn">
                                <a href="#"><i className="zmdi zmdi-edit"></i></a>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}