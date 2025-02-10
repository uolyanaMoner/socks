// const Product = require("../../models/Product");

// const searchProducts = async (req, res) => {
//     try {
//         const { keyword } = req.params;
//         if (!keyword || typeof keyword !== "string") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Keyword is required and must be if string format",
//             });
//         }

//         const regEx = new RegExp(keyword, "i");

//         const createSearchQuery = {
//             $or: [
//                 { title: regEx },
//                 { description: regEx },
//                 { category: regEx },
//                 { brand: regEx },
//             ],
//         };

//         const searchResults = await Product.find(createSearchQuery);

//         res.status(200).json({
//             success: true,
//             data: searchResults,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Error",
//         });
//     }
// };

// module.exports = { searchProducts };


const Product = require("../../models/Product");
const Order = require("../../models/Order");

const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        console.log("🔍 Searching for:", keyword); // ✅ هل الكلمة بتوصل؟

        if (!keyword || typeof keyword !== "string") {
            return res.status(400).json({
                success: false,
                message: "Keyword is required and must be a string",
            });
        }

        const regEx = new RegExp(keyword, "i");

        // 🔍 البحث في المنتجات
        const productQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx },
            ],
        };

        // 🔍 البحث في الأوردرات
        const orderQuery = {
            $or: [
                { "addressInfo.fullName": regEx },
                { "addressInfo.phone": regEx },
            ],
        };

        // ✅ جرب البحث كل واحد لوحده
        const products = await Product.find(productQuery);
        console.log("📦 Products Found:", products);

        const orders = await Order.find(orderQuery);
        console.log("📜 Orders Found:", orders);

        res.status(200).json({
            success: true,
            products,
            orders,
        });

    } catch (error) {
        console.error("❌ Error in searchProducts:", error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

module.exports = { searchProducts };
