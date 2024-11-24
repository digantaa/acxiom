import AdminLogin from "./Auth/Admin/AdminLogin";
import UserLogin from "./Auth/User/UserLogin";
import VendorLogin from "./Auth/Vendor/VendorLogin";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import VendorHome from "./pages/VendorHome";
import YourItems from "./pages/YourItems";
import AddNewItem from "./pages/AddNewItem";
import UserSignup from "./Auth/User/UserSignup";
import UserPortal from "./pages/UserPortal";
import UserCart from "./pages/UserCart";
import AdminHome from "./pages/admin/Home";
import AdminSignup from "./Auth/Admin/AdminSignup";
import AdminMaintainUser from "./Auth/Admin/AdminMaintainUser";
import AdminMaintainVendor from "./Auth/Admin/AdminMaintainVendor";
import VendorSignup from "./Auth/Vendor/VendorSignup";

function App() {
    return (
        <>
            <div className="h-screen w-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/signup" element={<AdminSignup />} />
                    <Route path="/admin/home" element={<AdminHome />} />
                    <Route
                        path="/admin/maintain-user"
                        element={<AdminMaintainUser />}
                    />
                    <Route
                        path="/admin/maintain-vendor"
                        element={<AdminMaintainVendor />}
                    />

                    <Route path="/user/login" element={<UserLogin />} />
                    <Route path="/user/signup" element={<UserSignup />} />
                    <Route path="/user/portal" element={<UserPortal />} />
                    <Route path="/user/cart" element={<UserCart />} />

                    <Route path="/vendor/login" element={<VendorLogin />} />
                    <Route path="/vendor/signup" element={<VendorSignup />} />
                    <Route path="/vendor/home" element={<VendorHome />} />
                    <Route path="/youritems" element={<YourItems />} />
                    <Route path="/addnewitem" element={<AddNewItem />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
