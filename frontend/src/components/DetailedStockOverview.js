import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    // Fetch products on component mount
    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        try {
            const response = await axios.get('https://arora-tech-bms.onrender.com/api/users'); // Adjust the URL if necessary
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div className="container mt-4">
            {products.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Product Name</th>
                            <th>Stock Left</th>
                            {/* Add other relevant headers */}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product.pname}</td>
                                <td>{product.stock_left}</td>
                                {/* Add other relevant data */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};

export default ProductTable;
