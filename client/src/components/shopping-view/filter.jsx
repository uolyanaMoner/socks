// import { filterOptions } from "@/config";
// import { Fragment } from "react";
// import { Label } from "../ui/label";
// import { Checkbox } from "../ui/checkbox";
// import { Separator } from "../ui/separator";

// function ProductFilter({ filters, handleFilter }) {
//   return (
//     <div className="bg-background rounded-lg shadow-sm">
//       <div className="p-4 border-b">
//         <h2 className="text-lg font-extrabold">Filters</h2>
//       </div>
//       <div className="p-4 space-y-4">
//         {Object.keys(filterOptions).map((keyItem) => (
//           <Fragment>
//             <div>
//               <h3 className="text-base font-bold">{keyItem}</h3>
//               <div className="grid gap-2 mt-2">
//                 {filterOptions[keyItem].map((option) => (
//                   <Label className="flex font-medium items-center gap-2 ">
//                     <Checkbox
//                       checked={
//                         filters &&
//                         Object.keys(filters).length > 0 &&
//                         filters[keyItem] &&
//                         filters[keyItem].indexOf(option.id) > -1
//                       }
//                       onCheckedChange={() => handleFilter(keyItem, option.id)}
//                     />
//                     {option.label}
//                   </Label>
//                 ))}
//               </div>
//             </div>
//             <Separator />
//           </Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductFilter;

import { useState, useEffect, Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { filterOptions } from "@/config";

function ProductFilter({ filters, handleFilter }) {
  const [products, setProducts] = useState([]); // إضافة حالة لتخزين المنتجات

  // تابع handleFilter مع إضافة تحميل المنتجات بعد التغيير في الفلاتر
  const handleCheckboxChange = (key, optionId) => {
    handleFilter(key, optionId); // تحديث الفلاتر
  };

  // useEffect(() => {
  //   // تحويل الفلاتر إلى URL Parameters
  //   const queryParams = new URLSearchParams(filters).toString();

  //   // طلب المنتجات بناءً على الفلاتر
  //   fetch(`/api/products?${queryParams}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProducts(data.data); // تخزين المنتجات في الحالة
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //     });
  // }, [filters]); // كلما تم تغيير الفلاتر، يتم استدعاء الـ API

  useEffect(() => {
    // تحويل الفلاتر إلى URL Parameters
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key].length) {
        queryParams.append(key, filters[key].join(","));
      }
    });
  
    fetch(`/api/products?${queryParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [filters]);
  



  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex font-medium items-center gap-2 "
                  >
                    <Checkbox
                      checked={filters[keyItem]?.includes(option.id)}
                      onCheckedChange={() =>
                        handleCheckboxChange(keyItem, option.id)
                      }
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
