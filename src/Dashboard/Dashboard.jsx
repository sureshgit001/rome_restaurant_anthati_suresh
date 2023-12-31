import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Dashboard.css';
import WOW from 'wowjs';
import CarouselCom from "./Carousel";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addToCart } from '../Redux/actions/cartActions';


export default function Dashboard() {

   const dispatch = useDispatch();
   const cartItems = useSelector(state => state.cartItems);
   const handleAddToCart = (item) => {
      dispatch(addToCart(item));
   };
   const [items, setItems] = useState([]);
   const [category, setIcategory] = useState([]);
   const [subCategories, setsubCategories] = useState([]);
   const navigate = useNavigate();
   useEffect(() => {
      new WOW.WOW({
         live: false
      }).init();
      getItemData();

   }, [])
   const getItemData = async () => {
      const itemUrl = 'http://localhost:8081/v1/users/items';
      const categoryUrl = 'http://localhost:8081/v1/users/categories';
      const subCategoryUrl = 'http://localhost:8081/v1/users/sub-categories';

      try {
         const itemRes = await axios.get(itemUrl);
         setItems(itemRes.data);
         const categoryRes = await axios.get(categoryUrl);
         setIcategory(categoryRes.data);
         const subCategoryRes = await axios.get(subCategoryUrl);
         setsubCategories(subCategoryRes.data);
      } catch (error) {
         console.log(error)
      }

   }

   return (
      <>
         <section className="bg-transparent p-0
          navbar-bg">
            <div className="container">

               <Navbar className="bg-transparent headerMargin">
                  <Container fluid className="bannerHeight">
                     <Navbar.Brand> <img src="/images/Rome-logo.png" alt="Rome-logo.png" /></Navbar.Brand>
                     <Navbar.Toggle aria-controls="navbarScroll" />
                     <Navbar.Collapse id="navbarScroll">
                        <Nav
                           className="ms-auto "
                           style={{ maxHeight: '100px' }}
                           navbarScroll
                        >
                           <Nav className="me-auto">
                              <Nav.Link onClick={() => navigate('/success')}>Home</Nav.Link>
                              <Nav.Link onClick={() => navigate('/cart')} >
                              <div class="cart-icon">
                              <span class="cartSizeNumberCricle"><FontAwesomeIcon className="cart-icon" icon={faCartPlus} /></span>
                              <span class="cartSizeNumber">{cartItems.length}</span> 
                           </div>
                              </Nav.Link>                            
                           </Nav>
                          
                        </Nav>

                     </Navbar.Collapse>
                  </Container>
               </Navbar>
            </div>
         </section>
         <section className="bg-dark pt-5 pb-5">
            <div className="cursorelDiv">
               <CarouselCom />
            </div>
         </section>
         <section className=" bg-dark ">
            <div className="container">
               <div className="filterDiv pb-5">
                  <h3 className="text-light">
                     Filter
                  </h3>
                  <div className="categoey pb-4">
                     <select class="form-select " aria-label="Default select example">
                        <option >Category</option>

                        {
                           category.map((cat) => {
                              return (<>
                                 <option key={cat.categoryId} className="categorySel" >{cat.categoryName}</option>
                              </>)
                           })
                        }
                     </select>
                  </div>
                  <div className="subCategoey">
                     <select class="form-select " aria-label="Default select example">
                        <option >SubCategory</option>

                        {
                           subCategories.map((subcat) => {
                              return (<>
                                 <option key={subcat.subId} value={subcat.subId}>{subcat.subCatName}</option>
                              </>)
                           })
                        }
                     </select>
                  </div>

               </div>
            </div>
         </section>

         <section className="itemsDiv bg-dark">
            <div className="container">
               <h1 className="text-center text-light">Items</h1>
               <div className="itemdev row column-gap-3 row-gap-4">

                  {items.map((item) => {
                     return (<>
                        <div className="item  wow bounceInUp" key={item.itemId}>

                           <img src={item.itemUrl} alt="" />
                           <h5>{item.itemName}</h5>
                           <p>
                              <span className="itemPtrice">Price : </span>₹{item.itemPrice}
                           </p>
                           <div className="btnCartIcon ">
                              <button className='btn btn-warning ItemButton me-2' onClick={() => handleAddToCart(item)}>Add to Cart</button>


                              {/* <span name={item.itemId}  className={item.itemId}>{<FontAwesomeIcon key={item.itemId} id="iconCheck" icon={faCircleCheck}/>}</span> */}
                           </div>
                        </div>
                     </>)
                  })}
               </div>
            </div>
         </section>



      </>
   )

}