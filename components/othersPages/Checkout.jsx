"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCreateNewOrderMutation } from "@/redux/api/orderApi";
import CartFooter from "./checkout/CartFooter";
import { countries } from "@/data/countries.js";
import { states } from "@/data/states.js";

export default function Checkout() {

  const [subtotal, setSubtotal] = useState(0);
  const [countryId, setCountryId] = useState("101");
  const [filteredStates, setFilteredStates] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNo: "",
    zipCode: "",
    country: "India",
    orderNotes: "",
    paymentMethod: "COD",
  });

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [createNewOrder, { isLoading, error }] = useCreateNewOrderMutation();

  useEffect(() => {
    setSubtotal(
      cartItems.reduce((total, item) => total + item.offer * item.quantity, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    setFilteredStates(
      states.filter((state) => state.country_id.toString() === countryId)
    );
  }, [countryId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const orderData = {
      shippingInfo: { ...formData, fullName },
      orderItems: cartItems,
      paymentMethod: formData.paymentMethod,
      itemsPrice: subtotal,
      taxAmount: 0,
      shippingAmount: 0,
      totalAmount: subtotal ,
    };

    await createNewOrder(orderData);
  };

  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="tf-page-cart-wrap layout-2">
          <div className="tf-page-cart-item">
            <h5 className="fw-5 mb_20">Billing details</h5>
            <form onSubmit={handleSubmit} className="form-checkout">
              <div className="box grid-2">
                <fieldset className="fieldset">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    required
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    required
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </fieldset>
              </div>
              <div className="box grid-2">
                <fieldset className="fieldset">
                  <label htmlFor="phoneNo">Phone Number</label>
                  <input
                    required
                    type="text"
                    id="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <label htmlFor="email">Email</label>
                  <input
                    required
                    type="email"
                    id="email"
                    autoComplete="abc@xyz.com"
                  />
                </fieldset>
              </div>
       
              <fieldset className="fieldset">
                <label htmlFor="country">Country</label>
                <div className="select-custom">
                  <select
                    className="tf-select w-100"
                    id="country"
                    value={countryId}
                    onChange={(e) => setCountryId(e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
              <fieldset className="fieldset">
                <label htmlFor="state">State</label>
                <div className="select-custom">
                  <select id="state" className="tf-select w-100">
                    {filteredStates.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
              <fieldset className="fieldset">
                <label htmlFor="city">City</label>
                <input
                  required
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <label htmlFor="address">Address</label>
                <input
                  required
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  required
                  type="text"
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <label htmlFor="orderNotes">Order Notes (optional)</label>
                <textarea
                  id="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleChange}
                />
              </fieldset>
              {error && <p>Error placing order</p>}
            </form>
          </div>
          <CartFooter cartItems={cartItems} subtotal={subtotal} />
        </div>
      </div>
    </section>
  );
}
