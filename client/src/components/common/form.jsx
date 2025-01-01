// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

// function CommonForm({
//   formControls,
//   formData,
//   setFormData,
//   onSubmit,
//   buttonText,
//   isBtnDisabled,
// }) {
//   function renderInputsByComponentType(getControlItem) {
//     let element = null;
//     const value = formData[getControlItem.name] || "";

//     switch (getControlItem.componentType) {
//       case "input":
//         element = (
//           <Input
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//         break;
//       case "select":
//         element = (
//           <Select
//             onValueChange={(value) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: value,
//               })
//             }
//             value={value}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={getControlItem.label} />
//             </SelectTrigger>
//             <SelectContent>
//               {getControlItem.options && getControlItem?.options.length > 0
//                 ? getControlItem.options.map((optionItem) => (
//                     <SelectItem key={optionItem.id} value={optionItem.id}>
//                       {optionItem.label}
//                     </SelectItem>
//                   ))
//                 : null}
//             </SelectContent>
//           </Select>
//         );
//         break;
//       case "textarea":
//         element = (
//           <Textarea
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.id}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//         break;

//       default:
//         element = (
//           <Input
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );

//         break;
//     }
//     return element;
//   }

//   return (
//     <form onSubmit={onSubmit}>
//       <div className="flex flex-col gap-3">
//         {formControls.map((controlItem) => (
//           <div className="grid w-full gap-1.5" key={controlItem.name}>
//             <Label className="mb-1 ">{controlItem.label}</Label>
//             {renderInputsByComponentType(controlItem)}
//           </div>
//         ))}
//       </div>
//       <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
//         {buttonText || "Submit"}
//       </Button>
//     </form>
//   );
// }

// export default CommonForm;


// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";

// function CommonForm({
//   formControls,
//   formData,
//   setFormData,
//   onSubmit,
//   buttonText,
//   isBtnDisabled,
// }) {
//   // Function to add a quantity-price pair
//   const handleAddQuantityPrice = () => {
//     const quantity = formData.quantity || ""; // If quantity is empty, treat it as an empty string
//     const price = formData.price || ""; // If price is empty, treat it as an empty string

//     const updatedQuantityPrices = [...formData.quantityPrices, { quantity, price }];
//     setFormData({
//       ...formData,
//       quantityPrices: updatedQuantityPrices,
//       quantity: "", // Reset quantity input
//       price: "", // Reset price input
//     });
//   };

//   // Function to handle changes in existing quantity-price pairs
//   const handleQuantityPriceChange = (index, field, value) => {
//     const updatedQuantityPrices = formData.quantityPrices.map((item, idx) =>
//       idx === index ? { ...item, [field]: value } : item
//     );
//     setFormData({
//       ...formData,
//       quantityPrices: updatedQuantityPrices,
//     });
//   };

//   // Function to render input fields based on component type
//   function renderInputsByComponentType(getControlItem) {
//     const value = formData[getControlItem.name] || "";

//     switch (getControlItem.componentType) {
//       case "input":
//         return (
//           <Input
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//       case "select":
//         return (
//           <Select
//             onValueChange={(value) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: value,
//               })
//             }
//             value={value}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={getControlItem.label} />
//             </SelectTrigger>
//             <SelectContent>
//               {getControlItem.options?.map((optionItem) => (
//                 <SelectItem key={optionItem.id} value={optionItem.id}>
//                   {optionItem.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         );
//       case "textarea":
//         return (
//           <Textarea
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.id}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//       default:
//         return (
//           <Input
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//     }
//   }

//   return (
//     <form onSubmit={onSubmit}>
//       <div className="flex flex-col gap-3">
//         {formControls.map((controlItem) => (
//           <div className="grid w-full gap-1.5" key={controlItem.name}>
//             <Label className="mb-1 ">{controlItem.label}</Label>
//             {controlItem.componentType === "quantity-price-input" ? (
//               <>
//                 <div className="flex gap-2">
//                   <Input
//                     type="number"
//                     name="quantity"
//                     placeholder="Enter quantity (optional)"
//                     value={formData.quantity || ""}
//                     onChange={(e) =>
//                       setFormData({ ...formData, quantity: e.target.value })
//                     }
//                   />
//                   <Input
//                     type="number"
//                     name="price"
//                     placeholder="Enter price (optional)"
//                     value={formData.price || ""}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                   />
//                   <Button type="button" onClick={handleAddQuantityPrice}>
//                     Add
//                   </Button>
//                 </div>
//                 <div className="mt-3">
//                   {formData.quantityPrices?.length > 0 ? (
//                     formData.quantityPrices.map((item, index) => (
//                       <div key={index} className="flex gap-3">
//                         <Input
//                           type="number"
//                           placeholder="Quantity"
//                           value={item.quantity || ""}
//                           onChange={(e) =>
//                             handleQuantityPriceChange(index, "quantity", e.target.value)
//                           }
//                         />
//                         <Input
//                           type="number"
//                           placeholder="Price"
//                           value={item.price || ""}
//                           onChange={(e) =>
//                             handleQuantityPriceChange(index, "price", e.target.value)
//                           }
//                         />
//                       </div>
//                     ))
//                   ) : (
//                     <p>No quantity-price pairs added yet.</p>
//                   )}
//                 </div>
//               </>
//             ) : (
//               renderInputsByComponentType(controlItem)
//             )}
//           </div>
//         ))}
//       </div>
//       <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
//         {buttonText || "Submit"}
//       </Button>
//     </form>
//   );
// }

// export default CommonForm;


function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  // Function to add a new quantity-price pair
  const handleAddQuantityPrice = () => {
    const quantity = formData.quantity || ""; // Default to empty string if no value
    const price = formData.price || ""; // Default to empty string if no value

    // Add the new pair
    const updatedQuantityPrices = [
      ...formData.quantityPrices,
      { quantity: quantity.trim(), price: price.trim() },
    ];

    setFormData({
      ...formData,
      quantityPrices: updatedQuantityPrices,
      quantity: "", // Reset quantity input
      price: "", // Reset price input
    });
  };

  // Function to handle changes for existing quantity-price pairs
  const handleQuantityPriceChange = (index, field, value) => {
    const updatedQuantityPrices = formData.quantityPrices.map((item, idx) =>
      idx === index ? { ...item, [field]: value.trim() } : item
    );

    setFormData({
      ...formData,
      quantityPrices: updatedQuantityPrices,
    });
  };

  // Render input fields based on control type
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
      default:
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls?.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {controlItem.componentType === "quantity-price-input" ? (
              <>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity (optional)"
                    value={formData.quantity || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    name="price"
                    placeholder="Enter price (optional)"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                  <Button type="button" onClick={handleAddQuantityPrice}>
                    Add
                  </Button>
                </div>
                <div className="mt-3">
                  {formData.quantityPrices?.length > 0 ? (
                    formData.quantityPrices.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <Input
                          type="number"
                          placeholder="Quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityPriceChange(index, "quantity", e.target.value)
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Price"
                          value={item.price}
                          onChange={(e) =>
                            handleQuantityPriceChange(index, "price", e.target.value)
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <p>No quantity-price pairs added yet.</p>
                  )}
                </div>
              </>
            ) : (
              renderInputsByComponentType(controlItem)
            )}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
