import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Account.css";

const AddNewAccount = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState([]);
  const [technologyVertical, setTechnologyVertical] = useState([]);
  const [businessDomain, setBusinessDomain] = useState([]);
  const [businessSubDomain, setBusinessSubDomain] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAccountOwners();
    getAllCountries();
    getTechnologyVertical();
    getBusinessDomains();
    getBusinessSubDomains();
    getRegion();
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    setAccountData((prevData) => ({
      ...prevData,
      relationStartDate: formattedToday,
    }));
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const getAccountOwners = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/role_based`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("result", result);
      setData(result.Msg);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getAllCountries = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/customer_country`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("result", result);
      setCountries(result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getTechnologyVertical = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/technology_vertical`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("result", result);
      setTechnologyVertical(result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getBusinessDomains = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/account_business_domain`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("result", result);
      setBusinessDomain(result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getBusinessSubDomains = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/account_business_sub_domain`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("result", result);
      setBusinessSubDomain(result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getRegion = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/account_customer_region`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setRegion(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const emp_id = localStorage.getItem("emp_Id");
  const [accountData, setAccountData] = useState({
    accountStatus: "",
    accountName: "",
    relationStartDate: "",
    accountManager: "",
    country: "",
    region: "",
    customerInfo: "",
    customerAddress: "",
    customerContactNo: "",
    customerEmailAddress: "",
    website: "",
    industry: "",
    //billingInformation: "",
    accountSpecs: "",
    preferencesAndNotes: "",
    createdBy: emp_id,
  });

  const validateFields = () => {
    const AccountErrors = {};
    if (accountData.accountName === "") {
      AccountErrors.accountName = "Account name is required";
    }

    setErrors(AccountErrors);

    return Object.keys(AccountErrors).length === 0;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    if (!validateFields()) {
      return false;
    }

    const payload = {
      accountStatus: accountData.accountStatus,
      accountName: accountData.accountName,
      relationStartDate: accountData.relationStartDate,
      accountManager: accountData.accountManager,
      country: accountData.country,
      region: accountData.region,
      industry: accountData.industry,
      customerInfo: accountData.customerInfo,
      customerAddress: accountData.customerAddress,
      customerContactNo: accountData.customerContactNo,
      customerEmailAddress: accountData.customerEmailAddress,
      website: accountData.website,
      //billingInformation: accountData.billingInformation,
      accountSpecs: accountData.accountSpecs,
      preferencesAndNotes: accountData.preferencesAndNotes,
      createdBy: emp_id,
    };
    try {
      const response = await fetch(
        "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/add_account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      console.log("payload", payload);
      if (response.ok) {
        alert("Account created successfully!");
        setSuccessMessage("Account Created successfully!");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/accounts");
        }, 3000);
      } else {
        alert("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Error creating account. Please try again later.");
    }
  };

  return (
    <div className="container-fluid mt-2 card">
      <h5 className="pt-2">New Customer Account Creation</h5>
      <form onSubmit={handleCreateAccount}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="relation-start-date">Relation Start Date:</label>
              <input
                type="date"
                id="relation-start-date"
                name="relationStartDate"
                value={accountData.relationStartDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="account-name">Account Name:</label>
              <input
                type="text"
                id="account-name"
                name="accountName"
                value={accountData.accountName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <select
                id="country"
                name="country"
                value={accountData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.country_name}>
                    {country.country_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="region">Region:</label>
              <select
                id="region"
                name="region"
                value={accountData.region}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Region</option>
                {region.map((region) => (
                  <option key={region.region_id} value={region.region_name}>
                    {region.region_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="customerInfo">Customer Info:</label>
              <input
                type="text"
                id="customerInfo"
                name="customerInfo"
                value={accountData.customerInfo}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="customerContactNo">Customer Contact No:</label>
              <input
                type="text"
                id="customerContactNo"
                name="customerContactNo"
                value={accountData.customerContactNo}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="customer-address">Customer Address:</label>
              <textarea
                id="customer-address"
                name="customerAddress"
                value={accountData.customerAddress}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="customerEmailAddress">
                Customer Email Addresses:
              </label>
              <input
                type="email"
                id="customerEmailAddress"
                name="customerEmailAddress"
                value={accountData.customerEmailAddress}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">

            <div className="form-group">
              <label htmlFor="website">Website:</label>
              <input
                type="text"
                id="website"
                name="website"
                value={accountData.website}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="industry">Industry:</label>
              <select
                id="industry"
                name="industry"
                value={accountData.industry}
                onChange={handleInputChange}
              >
                <option value="">Select Industry</option>
                {businessDomain.map((businessDomain) => (
                  <option
                    key={businessDomain.business_domain_id}
                    value={businessDomain.business_domain_name}
                  >
                    {businessDomain.business_domain_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="accountManager">Account Manager:</label>
              <select
                id="accountManager"
                name="accountManager"
                value={accountData.accountManager}
                onChange={(e) =>
                  handleInputChange({
                    target: { name: "accountManager", value: e.target.value },
                  })
                }
              >
                <option value="">Select Account Manager</option>
                {data.map((accountManager) => (
                  <option key={accountManager.emp_id} value={accountManager.emp_id}>
                    {accountManager.emp_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="accountStatus">Status:</label>
              <select
                id="accountStatus"
                name="accountStatus"
                value={accountData.accountStatus}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="accountSpecs">Account Specifications:</label>
              <textarea className="field-hyt"
                id="accountSpecs"
                name="accountSpecs"
                value={accountData.accountSpecs}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="preferencesAndNotes">Preferences and Notes:</label>
              <textarea
                id="preferencesAndNotes"
                name="preferencesAndNotes"
                value={accountData.preferencesAndNotes}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <button type="submit" className="primary-btn">Create Account</button>
            </div>
          </div>
        </div>
        {/* <div className="form-group">
          <label htmlFor="billingInfo">Billing Information:</label>
          <input
            type="text"
            id="billingInfo"
            name="billingInfo"
            value={accountData.billingInformation}
            onChange={handleInputChange}
          />
        </div> */}
      </form>
    </div>
  );
};

export default AddNewAccount;
