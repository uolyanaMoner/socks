// import { useEffect, useState } from "react";
// import CommonForm from "../common/form";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { addressFormControls } from "@/config";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addNewAddress,
//   deleteAddress,
//   editAddress,
//   fetchAllAddresses,
// } from "@/store/shop/address-slice";
// import AddressCard from "./address-card";
// import { useToast } from "../ui/use-toast";

// // البيانات الأولية للنموذج
// const initialAddressFormData = {
//   fullName: "",
//   address: "",
//   // city: "",
//   phone: "",
//   notes: "",
// };

// function Address({ setCurrentSelectedAddress, selectedId }) {
//   const [formData, setFormData] = useState(initialAddressFormData);
//   const [currentEditedId, setCurrentEditedId] = useState(null);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { addressList } = useSelector((state) => state.shopAddress);
//   const { toast } = useToast();

//   // استخراج userId سواء كان المستخدم مسجلاً أو زائرًا
//   const userId = user?.id || localStorage.getItem("guestUserId");

//   // إنشاء userId فريد للزائر في حال عدم وجوده
//   useEffect(() => {
//     if (!userId && !localStorage.getItem("guestUserId")) {
//       const generatedUserId = `guest-${Date.now()}`;
//       localStorage.setItem("guestUserId", generatedUserId);
//     }
//   }, [userId]);

//   // وظيفة إضافة أو تعديل العنوان
//   function handleManageAddress(event) {
//     event.preventDefault();

//     if (addressList.length >= 3 && currentEditedId === null) {
//       setFormData(initialAddressFormData);
//       toast({
//         title: "You can add max 3 address!",
//         variant: "destructive",
//       });
//       return;
//     }

//     // في حالة التعديل
//     currentEditedId !== null
//       ? dispatch(
//           editAddress({
//             userId, // استخدام userId هنا
//             addressId: currentEditedId,
//             formData,
//           })
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllAddresses(userId)); // استخدام userId هنا
//             setCurrentEditedId(null);
//             setFormData(initialAddressFormData);
//             toast({
//               title: "Address updated successfully!",
//             });
//           }
//         })
//       : dispatch(
//           addNewAddress({
//             ...formData,
//             userId, // استخدام userId هنا
//           })
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllAddresses(userId)); // استخدام userId هنا
//             setFormData(initialAddressFormData);
//             toast({
//               title: "Address added successfully!",
//             });
//           }
//         });
//   }

//   // وظيفة حذف العنوان
//   function handleDeleteAddress(getCurrentAddress) {
//     dispatch(
//       deleteAddress({ userId, addressId: getCurrentAddress._id }) // استخدام userId هنا
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllAddresses(userId)); // استخدام userId هنا
//         toast({
//           title: "Address deleted successfully!",
//         });
//       }
//     });
//   }

//   // وظيفة تعديل العنوان
//   function handleEditAddress(getCurrentAddress) {
//     setCurrentEditedId(getCurrentAddress?._id);
//     setFormData({
//       ...formData,
//       address: getCurrentAddress?.address,
//       // city: getCurrentAddress?.city,
//       phone: getCurrentAddress?.phone,
//       notes: getCurrentAddress?.notes,
//       fullName: getCurrentAddress?.fullName,
//     });
//   }

//   // التحقق من صحة النموذج
//   function isFormValid() {
//     return Object.keys(formData)
//       .map((key) => formData[key].trim() !== "")
//       .every((item) => item);
//   }

//   // جلب العناوين عند التمهيد
//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchAllAddresses(userId)); // استخدام userId هنا
//     }
//   }, [dispatch, userId]);

//   return (
//     <Card>
//       <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
//         {addressList && addressList.length > 0
//           ? addressList.map((singleAddressItem) => (
//               <AddressCard
//                 selectedId={selectedId}
//                 handleDeleteAddress={handleDeleteAddress}
//                 addressInfo={singleAddressItem}
//                 handleEditAddress={handleEditAddress}
//                 setCurrentSelectedAddress={setCurrentSelectedAddress}
//               />
//             ))
//           : null}
//       </div>
//       <CardHeader>
//         <CardTitle>
//           {currentEditedId !== null ? "Edit Address" : "Add New Address"}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         <CommonForm
//           formControls={addressFormControls}
//           formData={formData}
//           setFormData={setFormData}
//           buttonText={currentEditedId !== null ? "Edit" : "Add"}
//           onSubmit={handleManageAddress}
//           isBtnDisabled={!isFormValid()}
//         />
//       </CardContent>
//     </Card>
//   );
// }

// export default Address;



// import { useEffect, useState } from "react";
// import CommonForm from "../common/form";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { addressFormControls } from "@/config";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addNewAddress,
//   deleteAddress,
//   editAddress,
//   fetchAllAddresses,
// } from "@/store/shop/address-slice";
// import AddressCard from "./address-card";
// import { useToast } from "../ui/use-toast";

// // البيانات الأولية للنموذج
// const initialAddressFormData = {
//   fullName: "",
//   address: "",
//   phone: "",
//   notes: "",
// };

// function Address({ setCurrentSelectedAddress, selectedId }) {
//   const [formData, setFormData] = useState(initialAddressFormData);
//   const [currentEditedId, setCurrentEditedId] = useState(null);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { addressList } = useSelector((state) => state.shopAddress);
//   const { toast } = useToast();

//   // استخراج userId سواء كان المستخدم مسجلاً أو زائرًا
//   const userId = user?.id || localStorage.getItem("guestUserId");

//   // إنشاء userId فريد للزائر في حال عدم وجوده
//   useEffect(() => {
//     if (!userId && !localStorage.getItem("guestUserId")) {
//       const generatedUserId = `guest-${Date.now()}`;
//       localStorage.setItem("guestUserId", generatedUserId);
//     }
//   }, [userId]);

//   // تعيين العنوان الأول كعنوان افتراضي عند وجود عناوين
//   useEffect(() => {
//     if (addressList && addressList.length > 0) {
//       setCurrentSelectedAddress(addressList[0]);
//     }
//   }, [addressList, setCurrentSelectedAddress]);

//   // وظيفة إضافة أو تعديل العنوان
//   function handleManageAddress(event) {
//     event.preventDefault();

//     if (addressList.length >= 3 && currentEditedId === null) {
//       setFormData(initialAddressFormData);
//       toast({
//         title: "You can add max 3 address!",
//         variant: "destructive",
//       });
//       return;
//     }

//     // في حالة التعديل
//     currentEditedId !== null
//       ? dispatch(
//           editAddress({
//             userId,
//             addressId: currentEditedId,
//             formData,
//           })
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllAddresses(userId));
//             setCurrentEditedId(null);
//             setFormData(initialAddressFormData);
//             toast({
//               title: "Address updated successfully!",
//             });
//           }
//         })
//       : dispatch(
//           addNewAddress({
//             ...formData,
//             userId,
//           })
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllAddresses(userId));
//             setFormData(initialAddressFormData);
//             toast({
//               title: "Address added successfully!",
//             });
//           }
//         });
//   }

//   // وظيفة حذف العنوان
//   function handleDeleteAddress(getCurrentAddress) {
//     dispatch(
//       deleteAddress({ userId, addressId: getCurrentAddress._id })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllAddresses(userId));
//         toast({
//           title: "Address deleted successfully!",
//         });
//       }
//     });
//   }

//   // وظيفة تعديل العنوان
//   function handleEditAddress(getCurrentAddress) {
//     setCurrentEditedId(getCurrentAddress?._id);
//     setFormData({
//       ...formData,
//       address: getCurrentAddress?.address,
//       phone: getCurrentAddress?.phone,
//       notes: getCurrentAddress?.notes,
//       fullName: getCurrentAddress?.fullName,
//     });
//   }

//   // التحقق من صحة النموذج
//   function isFormValid() {
//     return Object.keys(formData)
//       .map((key) => formData[key].trim() !== "")
//       .every((item) => item);
//   }

//   // جلب العناوين عند التمهيد
//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchAllAddresses(userId));
//     }
//   }, [dispatch, userId]);

//   return (
//     <Card>
//       <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
//         {addressList && addressList.length > 0
//           ? addressList.map((singleAddressItem) => (
//               <AddressCard
//                 selectedId={selectedId}
//                 handleDeleteAddress={handleDeleteAddress}
//                 addressInfo={singleAddressItem}
//                 handleEditAddress={handleEditAddress}
//                 setCurrentSelectedAddress={setCurrentSelectedAddress}
//               />
//             ))
//           : null}
//       </div>
//       <CardHeader>
//         <CardTitle>
//           {currentEditedId !== null ? "Edit Address" : "Add New Address"}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         <CommonForm
//           formControls={addressFormControls}
//           formData={formData}
//           setFormData={setFormData}
//           buttonText={currentEditedId !== null ? "Edit" : "Add"}
//           onSubmit={handleManageAddress}
//           isBtnDisabled={!isFormValid()}
//         />
//       </CardContent>
//     </Card>
//   );
// }

// export default Address;




import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useSelector } from "react-redux";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";

const initialAddressFormData = {
  fullName: "",
  address: "",
  phone: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  // التحقق من صحة النموذج
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  // حفظ العنوان تلقائيًا عند التغيير
  useEffect(() => {
    if (isFormValid()) {
      setCurrentSelectedAddress(formData);
      // toast({
      //   title: "Address updated successfully for the order!",
      // });
    }
  }, [formData, setCurrentSelectedAddress]);

  return (
    <Card>
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem.id} // تأكد من وجود مفتاح فريد
                selectedId={selectedId}
                addressInfo={singleAddressItem}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>Add New Address for Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4">
          {addressFormControls.map((control) => (
            <div key={control.name} className="flex flex-col gap-2">
              <label
                htmlFor={control.name}
                className="block text-sm font-medium text-gray-700"
              >
                {control.label}
              </label>
              {control.componentType === "input" ? (
                <input
                  type={control.type || "text"}
                  id={control.name}
                  name={control.name}
                  value={formData[control.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [control.name]: e.target.value })
                  }
                  placeholder={control.placeholder}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              ) : control.componentType === "textarea" ? (
                <textarea
                  id={control.name}
                  name={control.name}
                  value={formData[control.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [control.name]: e.target.value })
                  }
                  placeholder={control.placeholder}
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              ) : null}
            </div>
          ))}
        </form>
      </CardContent>
    </Card>
  );
}

export default Address;
