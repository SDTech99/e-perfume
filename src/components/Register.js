import React, { useState } from 'react';
import api from '../api';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import CountryCodeDropdown from './countriesDetails';

function Register() {
  const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    countryCode: '',
    mobile: '',
    gender: '',
    dob: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    terms: false
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in form.address) {
      setForm({ ...form, address: { ...form.address, [name]: value } });
    } else {
      setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneNumber = parsePhoneNumberFromString(`${form.countryCode}${form.mobile}`);
    if (!phoneNumber || !phoneNumber.isValid()) {
      alert('Invalid mobile number for selected country.');
      return;
    }
    try {
      await api.post('/', form);
      alert('User registered!');
      setForm(initialForm);
    } catch (err) {
      alert(err.response.data.error || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">

          <div className="card p-4 shadow">
          <h2 className="text-center mb-4">Register</h2>

          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" name="firstName" id="firstName" className="form-control" placeholder="Enter your first name" value={form.firstName} onChange={handleChange} required />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" name="lastName" id="lastName" className="form-control" placeholder="Enter your last name" value={form.lastName} onChange={handleChange} required />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" id="password" className="form-control" placeholder="Enter password" value={form.password} onChange={handleChange} required />
          </div>

          {/* Mobile Number with Country Code */}
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile Number</label>
            <div className="input-group">
              <CountryCodeDropdown value={form.countryCode} onChange={handleChange} />
              <input type="tel" name="mobile" id="mobile" className="form-control" placeholder="Enter mobile number" value={form.mobile} onChange={handleChange} required />
            </div>
          </div>

          {/* Address Line 1 */}
          <div className="mb-3">
            <label htmlFor="address1" className="form-label">Address Line 1</label>
            <input type="text" name="address1" id="address1" className="form-control" placeholder="Street, Building, Area" value={form.address.address1} onChange={handleChange} required />
          </div>

          {/* Address Line 2 */}
          <div className="mb-3">
            <label htmlFor="address2" className="form-label">Address Line 2 (Optional)</label>
            <input type="text" name="address2" id="address2" className="form-control" placeholder="Landmark, Apartment no." value={form.address.address2} onChange={handleChange} />
          </div>

          {/* City */}
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" name="city" id="city" className="form-control" placeholder="City" value={form.address.city} onChange={handleChange} required />
          </div>

          {/* State */}
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input type="text" name="state" id="state" className="form-control" placeholder="State or Province" value={form.address.state} onChange={handleChange} required />
          </div>

          {/* ZIP */}
          <div className="mb-3">
            <label htmlFor="zip" className="form-label">Postal / ZIP Code</label>
            <input type="text" name="zip" id="zip" className="form-control" placeholder="Postal Code" value={form.address.zip} onChange={handleChange} required />
          </div>

          {/* Country */}
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <input type="text" name="country" id="country" className="form-control" placeholder="Country" value={form.address.country} onChange={handleChange} required />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender (Optional)</label>
            <select name="gender" id="gender" className="form-select" value={form.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">Date of Birth (Optional)</label>
            <input type="date" name="dob" id="dob" className="form-control" value={form.dob} onChange={handleChange} />
          </div>

          {/* Terms */}
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="terms" name="terms" checked={form.terms} onChange={handleChange} required />
            <label className="form-check-label" htmlFor="terms">
              I agree to the Terms and Conditions
            </label>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </div>
</div>
        </div>
      </div>
    </form>
  );
}

export default Register;