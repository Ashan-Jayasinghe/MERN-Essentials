import "./App.css";
import Header from "./components/Header/Header.jsx";
import NewProduct from "./components/Products/NewProduct.jsx";
import ProductList from "./components/Products/ProductList.jsx";
import { useState, useEffect } from "react";
import React from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:5001/products");
      const responseData = await response.json();
      setLoadedProducts(responseData.products);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const addProductHandler = async (productName, productPrice) => {
    try {
      const newProduct = {
        title: productName,
        price: +productPrice,
      };
      let hasError = false;
      const response = await fetch("http://localhost:5001/product", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        hasError = true;
      }
      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }

      setLoadedProducts((prevProducts) => {
        return prevProducts.concat({
          ...newProduct,
          id: responseData.product.id,
        });
      });
    } catch (error) {
      alert(error.message || "Something Went Wrong");
    }
  };
  return (
    <React.Fragment>
      <Header />
      <main>
        <NewProduct onAddProduct={addProductHandler} />
        {isLoading && <p className="loader">Loading....</p>}
        {!isLoading && <ProductList items={loadedProducts} />}
      </main>
    </React.Fragment>
  );
}

export default App;
