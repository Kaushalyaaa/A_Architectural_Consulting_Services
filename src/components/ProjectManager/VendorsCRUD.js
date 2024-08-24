import React, { useEffect, useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import '../styles/VendorCRUD.css';


export default function VendorsCRUD() {
    const [vendorName, setVendorName] = useState("");
    const [address, setAddress] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [vendorType, setVendorType] = useState("");
   
    const [vendors, setVendors] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(-1);
    const apiUrl = "http://localhost:8003";

    // Edit states
    const [editName, setEditName] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editContactPerson, setEditContactPerson] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editWebsite, setEditWebsite] = useState("");
    const [editVendorType, setEditVendorType] = useState("");
   
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        fetch(apiUrl + "/add")
            .then((res) => res.json())
            .then((res) => {
                setVendors(res);
            })
            .catch((err) => {
                console.error("Error fetching vendors:", err);
                setError("Failed to fetch vendors.");
            });
    };

    

    const handleEdit = (item) => {
        setEditId(item._id);
        setEditName(item.name);
        setEditAddress(item.address);
        setEditContactPerson(item.contactPerson);
        setEditPhone(item.phone);
        setEditEmail(item.email);
        setEditWebsite(item.website);
        setEditVendorType(item.vendorType);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
    
        if (vendorName && address && contactPerson && phoneNumber && email && website && vendorType) {
            const formData = {
                name: vendorName,
                address: address,
                contactPerson: contactPerson,
                phone: phoneNumber,
                email: email,
                website: website,
                vendorType: vendorType
            };
    
            fetch(apiUrl + "/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.text().then((text) => { throw new Error(text); });
                }
            })
            .then(() => {
                setMessage("Vendor added successfully");
                // Clear form fields
                setVendorName("");
                setAddress("");
                setContactPerson("");
                setPhoneNumber("");
                setEmail("");
                setWebsite("");
                setVendorType("");
                setShowForm(false);
                getItems();
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            })
            .catch((err) => {
                console.error("Error:", err);
                setError(err.message);
            });
        } else {
            setError("Please fill in all required fields.");
        }
    };
    
    const handleUpdate = () => {
        setError("");
    
        if (editName.trim() !== "" && editAddress.trim() !== "" && editContactPerson.trim() !== "" && editPhone.trim() !== "" && editEmail.trim() !== "" && editWebsite.trim() !== "" && editVendorType.trim() !== "") {
            const formData = {
                name: editName,
                address: editAddress,
                contactPerson: editContactPerson,
                phone: editPhone,
                email: editEmail,
                website: editWebsite,
                vendorType: editVendorType
            };
    
            fetch(apiUrl + "/add/" + editId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then((res) => {
                if (res.ok) {
                    const updatedVendors = vendors.map((item) => {
                        if (item._id === editId) {
                            return { ...item, ...formData };
                        }
                        return item;
                    });
                    setVendors(updatedVendors);
                    setEditId(-1);
                    setEditName("");
                    setEditAddress("");
                    setEditContactPerson("");
                    setEditPhone("");
                    setEditEmail("");
                    setEditWebsite("");
                    setEditVendorType("");
    
                    setMessage("Item updated successfully");
                    setTimeout(() => {
                        setMessage("");
                    }, 3000);
                } else {
                    setError("Unable to update vendor");
                }
            })
            .catch(() => {
                setError("Unable to update vendor");
            });
        }
    };
    
               
  

    const handleEditCancel = () => {
        setEditId(-1);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            fetch(apiUrl + "/add/" + id, {
                method: "DELETE",
            }).then(() => {
                const updatedVendors = vendors.filter((item) => item._id !== id);
                setVendors(updatedVendors);
            })
            .catch((err) => {
                console.error("Error deleting vendor:", err);
                setError("Failed to delete vendor.");
            });
        }
    };

    const handleShowForm = () => setShowForm(true);
    const handleHideForm = () => setShowForm(false);

    return (
        <div className="container">
            <button className="btn btn-primary mb-4" onClick={handleShowForm}>
                Add New Vendor
            </button>
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-4 form-wrapper">
                    <div className="form-group">
                        <label htmlFor="vendorName">
                            <FaUser className="icon" /> Vendor Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="vendorName"
                            placeholder="Enter Vendor Name"
                            value={vendorName}
                            onChange={(e) => setVendorName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">
                            <FaMapMarkerAlt className="icon" /> Address
                        </label>
                        <textarea
                            className="form-control"
                            id="address"
                            placeholder="Enter Full Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactPerson">
                            <FaUser className="icon" /> Contact Person
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="contactPerson"
                            placeholder="Enter Contact Person's Name"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            required
                        />
                    </div>

                  

                    <div className="form-group">
                        <label htmlFor="phoneNumber">
                            <FaPhone className="icon" /> Phone Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            <FaEnvelope className="icon" /> Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="website">
                            <FaGlobe className="icon" /> Website
                        </label>
                        <input
                            type="url"
                            className="form-control"
                            id="website"
                            placeholder="Enter Website URL"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="vendorType">
                            <FaMapMarkerAlt className="icon" /> Vendor Type
                        </label>
                        <select
                            className="form-control"
                            id="vendorType"
                            value={vendorType}
                            onChange={(e) => setVendorType(e.target.value)}
                            required
                        >
                            <option value="">Select Vendor Type</option>
                            <option value="electrical">Electrical</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="carpentry">Carpentry</option>
                            <option value="hvac">HVAC</option>
                            <option value="general">General Contractor</option>
                        </select>
                    </div>
          

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={handleHideForm}>
                        <MdCancel className="icon" /> Cancel
                    </button>
                </form>
            )}

            <div className="vendors-grid">
                <h3>Vendors</h3>
                <ul className="list-group d-flex flex-row gap-5">
                    {vendors.map((item) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center my-2" key={item._id}>
                            <div className="d-flex flex-column">
                                {editId === -1 || editId !== item._id ? (
                                    <>
                                        <span className="fw-bold">{item.name}</span>
                                        <span>{item.address}</span>
                                        <span>{item.contactPerson}</span>
                                        <span>{item.phone}</span>
                                        <span>{item.email}</span>
                                        <span>{item.website}</span>
                                        <span>{item.vendorType}</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="editName">
                                                <FaUser className="icon" /> Company Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="editName"
                                                placeholder="Enter Company Name"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="editAddress">
                                                <FaMapMarkerAlt className="icon" /> Company Address
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="editAddress"
                                                placeholder="Enter Company Address"
                                                value={editAddress}
                                                onChange={(e) => setEditAddress(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="editContactPerson">
                                                <FaUser className="icon" /> Contact Person
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="editContactPerson"
                                                placeholder="Enter Contact Person's Name"
                                                value={editContactPerson}
                                                onChange={(e) => setEditContactPerson(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="editPhone">
                                                <FaPhone className="icon" /> Phone
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="editPhone"
                                                placeholder="Enter Phone Number"
                                                value={editPhone}
                                                onChange={(e) => setEditPhone(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="editEmail">
                                                <FaEnvelope className="icon" /> Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="editEmail"
                                                placeholder="Enter Email Address"
                                                value={editEmail}
                                                onChange={(e) => setEditEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="editWebsite">
                                                <FaGlobe className="icon" /> Website
                                            </label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                id="editWebsite"
                                                placeholder="Enter Website URL"
                                                value={editWebsite}
                                                onChange={(e) => setEditWebsite(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="editVendorType">
                                                <FaMapMarkerAlt className="icon" /> Vendor Type
                                            </label>
                                            <select
                                                className="form-control"
                                                id="editVendorType"
                                                value={editVendorType}
                                                onChange={(e) => setEditVendorType(e.target.value)}
                                            >
                                                <option value="">Select Vendor Type</option>
                                                <option value="electrical">Electrical</option>
                                                <option value="plumbing">Plumbing</option>
                                                <option value="carpentry">Carpentry</option>
                                                <option value="hvac">HVAC</option>
                                                <option value="general">General Contractor</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="d-flex gap-2">
                                {editId === -1 || editId !== item._id ? (
                                    <>
                                        <button className="btn btn-warning" onClick={() => handleEdit(item)}>
                                            <AiOutlineEdit className="icon" /> 
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                                            <AiOutlineDelete className="icon" /> 
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-primary" onClick={handleUpdate}>
                                            <AiOutlineSave className="icon" /> 
                                        </button>
                                        <button className="btn btn-secondary" onClick={handleEditCancel}>
                                            <MdCancel className="icon" /> 
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
