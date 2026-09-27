import axios from "axios";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const allPro = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllProduct"
        );

        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    allPro();
  }, []);

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border border-gray-200 bg-white">

          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 text-left">

              <th className="border px-4 py-3">
                Title
              </th>

              <th className="border px-4 py-3">
                Images
              </th>

              <th className="border px-4 py-3">
                Price
              </th>

              <th className="border px-4 py-3">
                Discount Price
              </th>

              <th className="border px-4 py-3">
                Category
              </th>

              <th className="border px-4 py-3">
                Stock
              </th>

              <th className="border px-4 py-3">
                Tags
              </th>

              <th className="border px-4 py-3">
                Action
              </th>

            </tr>
          </thead>

          {/* Table Body */}
          <tbody>

            {data.map((product) => (

              <tr
                key={product._id}
                className="hover:bg-gray-50"
              >

                {/* Title */}
                <td className="border px-4 py-3">
                  {product.title}
                </td>


                {/* Images */}
                <td className="border px-4 py-3">
                  <div className="flex gap-2">

                    {product.images?.map((image, index) => (

                      <img
                        key={index}
                        src={image}
                        alt={product.title}
                        className="h-16 w-16 rounded-md border object-cover"
                      />

                    ))}

                  </div>
                </td>


                {/* Price */}
                <td className="border px-4 py-3">
                  ${product.price}
                </td>


                {/* Discount Price */}
                <td className="border px-4 py-3 font-semibold text-green-600">
                  ${product.discountPrice}
                </td>


                {/* Category */}
                <td className="border px-4 py-3">
                  {product.category}
                </td>


                {/* Stock */}
                <td className="border px-4 py-3">
                  {product.stock}
                </td>


                {/* Tags */}
                <td className="border px-4 py-3">

                  {product.tags?.map((tag, index) => (

                    <span
                      key={index}
                      className="mr-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {tag}
                    </span>

                  ))}

                </td>


                {/* Action */}
                <td className="border px-4 py-3">

                  <div className="flex gap-2">

                    <button
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                    >
                      Update
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ProductList;