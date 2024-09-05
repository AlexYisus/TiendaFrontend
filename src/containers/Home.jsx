import Layout from "../hocs/Layout"
import { connect } from 'react-redux';
import {
    get_products_by_arrival,
    get_products_by_sold
} from '../redux/actions/products';
import { useEffect } from "react";
import Banner from '../components/home/Banner'
import Products from "../redux/reducers/products";
import ProductsArrival from "../components/home/ProductsArrival";
import ProductsSold from "../components/home/ProductsSold";
import { useNavigate } from "react-router-dom";
import Logos from "../components/home/Logos";


const Home = ({
    get_products_by_arrival,
    get_products_by_sold,
    products_arrival,
    products_sold,
    isAuthenticated
}) => {

    const navigate = useNavigate();
    useEffect(() => {

        get_products_by_arrival();
        get_products_by_sold();
    }, []);

    return (
        <Layout>
            <div className="text-blue-500">
                <Banner />
                <ProductsArrival data={products_arrival} />
                <ProductsSold data={products_sold} />
                <Logos />
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    products_arrival: state.Products.products_arrival,
    products_sold: state.Products.products_sold,
    isAuthenticated: state.Auth.isAuthenticated,
})

export default connect(mapStateToProps, {
    get_products_by_arrival,
    get_products_by_sold,
})(Home)