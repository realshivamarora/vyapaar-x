// frontend/src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Sales from './components/Sales';
import SalesData from './components/SalesData';
import StockAlert from './components/StockAlert';
import LowStock from './components/LowStock';
import Footer from './components/Footer';
import ExpensesHead from './components/ExpensesHead';
import RecentExpenses from './components/RecentExpenses';
import DealersHead from './components/DealersHead';
import InsertDealer from './components/InsertDealer';
import DealersList from './components/DealersList';
import CustomersHead from './components/CustomersHead';
import AddCustomer from './components/AddCustomer';
import FetchCustomers from './components/FetchCustomers';
import AddExpense from './components/AddExpense';
import FetchExpenses from './components/FetchExpenses';
import FetchSales from './components/FetchSales';
import FetchProductStock from './components/FetchProductStock';
import BillingComponent from './components/BillingComponent';
import AddStockComponent from './components/AddStockComponent';
import LoginComponent from './components/LoginComponent'; // Import the LoginComponent

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Navbar />

                <Routes>
                    {/* Route for Login page */}
                    <Route path="/login" element={<LoginComponent />} />

                    {/* Route for landing page */}
                    <Route
                        path="/"
                        element={
                            <>
                                <Sales />
                                <SalesData />
                                <StockAlert />
                                <LowStock />
                                <ExpensesHead />
                                <RecentExpenses />
                            </>
                        }
                    />

                    <Route
                        path="/sales"
                        element={
                            <>
                                <Sales />
                                <FetchSales />
                            </>
                        }
                    />

                    {/* Route for Stocks page */}
                    <Route
                        path="/stocks"
                        element={
                            <>
                                <StockAlert />
                                <LowStock />
                                <FetchProductStock />
                                <AddStockComponent />
                            </>
                        }
                    />

                    <Route
                        path="/dealers"
                        element={
                            <>
                                <DealersHead />
                                <InsertDealer />
                                <DealersList />
                            </>
                        }
                    />

                    <Route
                        path="/customers"
                        element={
                            <>
                                <CustomersHead />
                                <AddCustomer />
                                <FetchCustomers />
                            </>
                        }
                    />

                    <Route
                        path="/expenses"
                        element={
                            <>
                                <ExpensesHead />
                                <RecentExpenses />
                                <AddExpense />
                                <FetchExpenses />
                            </>
                        }
                    />

                    <Route
                        path="/billing"
                        element={
                            <>
                                <BillingComponent />
                            </>
                        }
                    />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
