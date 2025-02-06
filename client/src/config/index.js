export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

// export const addProductFormElements = [
//   {
//     label: "Title",
//     name: "title",
//     componentType: "input",
//     type: "text",
//     placeholder: "Enter product title",
//   },
//   {
//     label: "Description",
//     name: "description",
//     componentType: "textarea",
//     placeholder: "Enter product description",
//   },
//   {
//     label: "Category",
//     name: "category",
//     componentType: "select",
//     options: [
//       { id: "men", label: "Men" },
//       { id: "women", label: "Women" },
//       { id: "kids", label: "Kids" },
//       { id: "unisex", label: "Unisex" }, // إضافة خيار "Unisex"
//     ],
//   },
//   {
//     label: "Price",
//     name: "price",
//     componentType: "input",
//     type: "number",
//     placeholder: "Enter product price",
//   },
//   {
//     label: "Sale Price",
//     name: "salePrice",
//     componentType: "input",
//     type: "number",
//     placeholder: "Enter sale price (optional)",
//   },
//   {
//     label: "Total Stock",
//     name: "totalStock",
//     componentType: "input",
//     type: "number",
//     placeholder: "Enter total stock",
//   },
//   {
//     label: "Color",
//     name: "color",
//     componentType: "input",
//     type: "text",
//     placeholder: "Enter product color",
//   },
//   {
//     label: "Brand",
//     name: "brand",
//     componentType: "select",
//     options: [
//       { id: "nike", label: "Nike" },
//       { id: "adidas", label: "Adidas" },
//       { id: "newBalance", label: "New Balance" },
//     ],
//   },
// ];


export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "unisex", label: "Unisex" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
  {
    label: "Color",
    name: "color",
    componentType: "input",
    type: "text",
    placeholder: "Enter product color",
  },
  {
    label: "Size",
    name: "size",
    componentType: "input",
    type: "text",
    placeholder: "Enter product size",
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "newBalance", label: "New Balance" },
    ],
  },
  {
    label: "Enter Quantity and Price",
    name: "quantityPrices",
    componentType: "quantity-price-input",
    placeholder: "Enter quantities and their respective prices",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  unisex: ["Men", "Women"], // جعل Unisex يرتبط بـ Men و Women
  
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  newBalance : 'New Balance'
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "unisex", label: "Unisex" }, // إضافة خيار Unisex

  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "newBalance ", label: "New Balance" },   
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Full Name",
    name: "fullName",
    componentType: "input",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "اكتب عنوانك بالتفصيل",
  },
  // {
  //   label: "City",
  //   name: "city",
  //   componentType: "input",
  //   type: "text",
  //   placeholder: "Enter your city",
  // },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
    dir: "ltr",
    inputMode: "numeric",
  },
  {
    label: "Email",
    name: "email",
    componentType: "input",
    type: "text",
    placeholder: "Enter your Email",
  },
  {
    label: "Could you please send me the address details",
    name: "notes",
    componentType: "textarea",
    placeholder: "اكتب اي ملاحظات للاوردر او العنوان عشان ميحصلش اي لغبطة",
  },
];

export   const shippingCosts = {
  القاهرة: 55,
  الاسكندرية: 70,
  الجيزة: 55,
  القلوبية: 75,
  مطروح: 95,
  اسوان: 85,
  المنوفية: 75,
  البحيرة: 75,
  "كفر الشيخ": 75,
  الشرقية: 75,
  الغربية: 75,
  "البحر الاحمر": 95,
  "شرم الشيخ": 110,
  الاسماعلية: 70,
  السويس: 70,
  بورسعيد: 70,
  الدهقلية: 75,
  دمياط: 75,
  الفيوم: 85,
  المنيا: 85,
  "بني سويف": 85,
  اسيوط: 85,
  الاقصر: 85,
  سوهاج: 85,
  قنا: 85,
  مترو: 45,
  "الوادي الجديد": 0,
  "جنوب سينا": 115,
};
