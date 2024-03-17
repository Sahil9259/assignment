import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All Category");
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const items = [
    `men's clothing`,
    `jewelery`, `electronics`, `women's clothing`,
    `All Category`
  ];

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchTerm);
    setSearchTerm(searchTerm);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const filterAndSetProducts = () => {
      let filteredProducts = [];
      if (selectedItem === "All Category") {
        filteredProducts = products.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        filteredProducts = products.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          product.category.toLowerCase() === selectedItem.toLowerCase()
        );
      }
      setFilteredProducts(filteredProducts);
    };
  
    filterAndSetProducts(); // Call the function directly
  
  }, [searchTerm, selectedItem, products]); // Include all dependencies
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(selectedItem);
        if (selectedItem === "All Category") {
          const response = await axios.get(`https://fakestoreapi.com/products`);
          setProducts(response.data);
        } else {
          const response = await axios.get(`https://fakestoreapi.com/products/category/${selectedItem}`);
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedItem]);


  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a href="#"className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Tailblocks</span>
          </a>
          <div className="relative md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
            <button
              className="bg-black text-white px-4 py-2 rounded flex items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedItem}
              <svg className="h-4 w-4 ml-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z" /></svg>
            </button>
            {isOpen && (
              <div className="absolute top-10 right-0 bg-white border shadow-md rounded">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange} // Update search term on input change
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none">
              Search
            </button>
          </form>
        </div>
      </header>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap text-center items-center justify-center -m-3">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 mr-2 rounded border border-gray-200 shadow-md mb-4">
                  <div className="">
                    <h3 className="text-gray-900 title-font text-lg font-bold">{product.title}</h3>
                    <h2 className="mt-1 text-gray-900 title-font text-lg font-medium">
                      <span className=" text-orange-500">Price
                      </span> $ {product.price}</h2>
                  </div>
                  <a href="#" className=" mt-4 relative h-48 rounded overflow-hidden flex justify-center items-center">
                    <img alt="ecommerce" className=" h-full block" src={product.image} />
                  </a>
                </div>
              ))
            ) : (
              <p>No Products</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
