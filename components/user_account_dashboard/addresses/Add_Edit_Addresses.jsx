import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { lexendDeca, jost } from "../../ui/fonts";
import { CheckCircle2, Pencil, Trash2 } from "lucide-react";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Directly start in editing mode
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "United Kingdom",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    isDefault: false,
  });
  // {
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   country: 'United Kingdom',
  //   addressLine1: '',
  //   addressLine2: '',
  //   city: '',
  //   postalCode: ''
  // }
  const handleAddNew = () => {
    setIsEditing(true);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      country: "United Kingdom",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      isDefault: false,
    });
  };
  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses"));
    if (savedAddresses && savedAddresses.length > 0) {
      setAddresses(savedAddresses);
    }
  }, []);

  const isValidAddress = (address) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "country",
      "addressLine1",
      "city",
      "postalCode",
    ];
    return requiredFields.every(
      (field) => address.hasOwnProperty(field) && address[field] !== ""
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleDefaultChange = () => {
    setFormData({ ...formData, isDefault: !formData.isDefault });
  };

  const handleSave = () => {
    if (isValidAddress(formData)) {
      const updatedAddresses = [...addresses, formData];
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
      setAddresses(updatedAddresses);
      setIsEditing(false);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        country: "United Kingdom",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setFormData(addresses[index]);
    const remainingAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(remainingAddresses);
  };

  const handleDelete = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
    if (updatedAddresses.length === 0) {
      setIsEditing(true);
    }
  };

  return (
    <div className="mx-auto">
      {isEditing ? (
        <>
          <h2 className={`text-2xl font-medium mb-4 md:mb-14 md:-mt-4 ${jost.className}`}>
            {formData?.firstName ? "Edit Address" : "Add New Address"}
          </h2>
          <form className="space-y-6">
            <div>
              <h3 className={`text-lg font-medium mb-4 ${jost.className}`}>
                Contact Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData?.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${lexendDeca.className}`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${lexendDeca.className}`}
                  />
                </div>
              </div>
              <div className="relative mt-4">
                <PhoneInput
                  country={"gb"}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`${lexendDeca.className}`}
                  inputStyle={{
                    width: "95.5%",
                    padding: "0.75rem", // Adjusted to match padding of other inputs
                    fontSize: "0.875rem", // Match font size
                    height: "2.75rem", // Match height
                    marginLeft: "35px",
                  }}
                  buttonStyle={{
                    backgroundColor: "#f9fafb",
                    borderTopLeftRadius: "0.375rem",
                    borderBottomLeftRadius: "0.375rem",
                    borderColor: "#d1d5db", // Match border color
                  }}
                  placeholder="Phone*"
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <input
                  checked={formData.isDefault}
                  onChange={() => handleDefaultChange()}
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-black border-black"
                />
                <span className="text-sm text-gray-700">
                  Set as Default Delivery Address
                </span>
              </div>
            </div>

            {/* address details */}
            <div>
              <h3
                className={`text-lg font-medium mb-4 mt-24 ${jost.className}`}
              >
                Address Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country/Region*"
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${lexendDeca.className}`}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="Address Line 1*"
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${lexendDeca.className}`}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Address, suite, etc. (optional)"
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${lexendDeca.className}`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    placeholder="City*"
                    onChange={handleChange}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${lexendDeca.className}`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code*"
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${lexendDeca.className}`}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleSave}
                className={`bg-black mt-6 w-full md:w-auto md:mt-28 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-gray-800 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${jost.className}`}
              >
                {formData.firstName ? "SAVE CHANGES" : "SAVE ADDRESS"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          {/* Saved address */}
          <h2 className={`text-2xl font-medium hidden md:block mb-8 ${jost.className}`}>
            SAVED ADDRESSES
          </h2>

          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="border p-4 rounded-md flex flex-col gap-6 relative "
              >
                <aside className="flex space-x-4 mt-4 absolute top-4 right-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className={`text-black font-medium ${jost.className} flex items-center`}
                  >
                    <span className="hidden sm:inline">Edit</span>
                    <Pencil className="w-5 h-5 sm:hidden" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className={`text-slate-400 font-medium ${jost.className} flex items-center`}
                  >
                    <span className="hidden sm:inline">Delete</span>
                    <Trash2 className="w-5 h-5 sm:hidden" />
                  </button>
                </aside>

                <div
                  className={`text-lg font-medium ${jost.className}`}
                >{`${address.firstName} ${address.lastName}`}</div>
                <div>
                  <div className={`text-gray-700 ${jost.className}`}>
                    {address.addressLine1} {address.addressLine2}
                  </div>
                  <div
                    className={`text-gray-700 ${jost.className}`}
                  >{`${address.city}, ${address.postalCode}, ${address.country}`}</div>
                </div>
                <div className={`text-gray-700 ${jost.className} font-medium`}>
                  {address.phone}
                </div>

                <div className="flex items-center justify-between space-x-2 mt-4">
                  <input
                    type="checkbox"
                    className="hidden sm:inline-block form-checkbox h-4 w-4 text-black border-black"
                    checked={address.isDefault}
                    onChange={() => handleDefaultChange(index)}
                  />

                  <span className={`text-sm text-gray-700 ${jost.className}`}>
                    Set as Default Delivery Address
                  </span>
                  <span className="sm:hidden ml-auto">
                    {address.isDefault && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddNew}
            className={`bg-black text-white my-2 w-full sm:w-auto font-medium py-2 px-4 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${jost.className}`}
          >
            ADD NEW ADDRESS
          </button>
        </>
      )}
    </div>
  );
};

export default AddressBook;
