import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductLayout from "./ProductLayout";
import { getProductByPath } from "../services/productsApi";

const ProductDetail = () => {
  const { path } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductByPath(path);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found or error loading data.");
      } finally {
        setLoading(false);
      }
    };

    if (path) {
      fetchProduct();
    }
  }, [path]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-xl font-semibold text-primary">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Oops!</h2>
        <p className="text-gray-600 mb-8">{error || "The product you're looking for doesn't exist."}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <ProductLayout
      title={product.title}
      herotitle={product.herotitle}
      herosub={product.herosub}
      paragraph1={product.paragraph1}
      paragraph2={product.paragraph2}
      img={product.img}
      keysubheading={product.keysubheading}
      features={product.features}
      applications={product.applications}
    />
  );
};

export default ProductDetail;
