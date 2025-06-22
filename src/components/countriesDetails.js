import React, { useEffect, useState } from 'react';

function CountryCodeDropdown({ value, onChange }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/independent?status=true')
      .then(res => res.json())
      .then(data => {
        const list = data
          .filter(c => c.idd?.root && c.idd.suffixes?.length > 0)
          .map(c => ({
            name: c.name.common,
            code: c.cca2,
            dial_code: c.idd.root + c.idd.suffixes[0]
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);
      })
      .catch(err => console.error('Error fetching country data:', err));
  }, []);

  return (
    <select
      name="countryCode"
      className="form-select"
      value={value}
      onChange={onChange}
      required
    >
      <option value="">Select country code</option>
      {countries.map(c => (
        <option key={c.code} value={c.dial_code}>
          {c.name} ({c.dial_code})
        </option>
      ))}
    </select>
  );
}

export default CountryCodeDropdown;