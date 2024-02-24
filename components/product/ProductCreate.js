"use client";
import { useEffect } from "react";
import { useProduct } from "@/context/product";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";

export default function ProductCreate() {
  const {
    product,
    setProduct,
    updatingProduct,
    setUpdatingProdcut,
    createProduct,
    updateProduct,
    deleteProduct,
    uploading,
    setUploading,
    uploadImages,
    deleteImage,
  } = useProduct();

  const { categories, fetchCategories } = useCategory();
  const { tags, fetchTags } = useTag();

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  return (
    <div>
      <p className="lead">{updatingProduct ? "Update" : "Create"} Product</p>
      <input
        type="text"
        placeholder="Title"
        value={updateProduct ? updatingProduct?.title : product?.title}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProdcut({ ...updatingProduct, title: e.target.value })
            : setProduct({
                ...product,
                title: e.target.value,
              })
        }
        className="form-control p-2 my-2"
      />

      <textarea
        row="5"
        className="form-control p-2 mb-2"
        placeholder="Description"
        value={
          updateProduct ? updatingProduct?.description : product?.description
        }
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProdcut({
                ...updatingProduct,
                description: e.target.value,
              })
            : setProduct({
                ...product,
                description: e.target.value,
              })
        }
      ></textarea>

      <input
        type="number"
        placeholder="Price"
        min="1"
        className="form-control p-2 mb-2"
        value={updateProduct ? updatingProduct?.price : product?.price}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProdcut({
                ...updatingProduct,
                price: e.target.value,
              })
            : setProduct({
                ...product,
                price: e.target.value,
              })
        }
      />

      <input
        type="text"
        placeholder="Color"
        value={updateProduct ? updatingProduct?.color : product?.color}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProdcut({ ...updatingProduct, color: e.target.value })
            : setProduct({
                ...product,
                color: e.target.value,
              })
        }
        className="form-control p-2 my-2"
      />

      <input
        type="text"
        placeholder="Brand"
        value={updateProduct ? updatingProduct?.brand : product?.brand}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProdcut({ ...updatingProduct, brand: e.target.value })
            : setProduct({
                ...product,
                brand: e.target.value,
              })
        }
        className="form-control p-2 my-2"
      />

      <input
        type="number"
        placeholder="Stock"
        min="1"
        className="form-control p-2 mb-2"
        value={updateProduct ? updatingProduct?.stock : product?.stock}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProdcut({
                ...updatingProduct,
                stock: e.target.value,
              })
            : setProduct({
                ...product,
                stock: e.target.value,
              })
        }
      />

      <div className="form-group">
        <select
          name="category"
          className="form-control p-2 mb-2"
          onChange={(e) => {
            const categoryId = e.target.value;
            const categoryName =
              e.target.options[e.target.selectedIndex].getAttribute("name");

            const category = categoryId
              ? { _id: categoryId, name: categoryName }
              : null;

            if (updatingProduct) {
              setUpdatingProdcut({
                ...updatingProduct,
                category,
              });
            } else {
              setProduct({ ...product, category });
            }
          }}
          value={
            updatingProduct
              ? updatingProduct?.category?._id
              : product?.category?._id
          }
        >
          <option value="">Select Category</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id} name={c?.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex flex-wrap justify-content-evenly align-items-center">
        {tags
          ?.filter(
            (ft) =>
              ft?.parentCategory ===
              (updateProduct?.category?._id || product?.category?._id)
          )
          ?.map((tag) => (
            <div key={tag._id} className="form-check">
              <input
                type="checkbox"
                value={tag?._id}
                onChange={(e) => {
                  const tagId = e.target.value;
                  const tagName = e.tag?.name;

                  let selectedTags = updatingProduct
                    ? [...ProductCreate(updateProduct?.tags ?? [])]
                    : [...(product?.tags ?? [])];

                  if (e.target.checked) {
                    selectedTags.push({ _id: tagId, name: tagName });
                  } else {
                    selectedTags = selectedTags.filter((t) => t._id !== tagId);
                  }

                  if (updatingProduct) {
                    setUpdatingProdcut({
                      ...updatingProduct,
                      tags: selectedTags,
                    });
                  } else {
                    setProduct({ ...product, tags: selectedTags });
                  }
                }}
              />
              <label>{tag?.name}</label>
            </div>
          ))}
      </div>

      <div className="form-group mb-3">
        <label
          className={`btn btn-primary col-12 ${uploading ? "disabled" : ""}`}
        >
          {uploading ? "Processing" : "Upload Images"}
          <input
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={uploadImages}
            disabled={uploading}
          />
        </label>{" "}
      </div>
      <pre>{JSON.stringify(product, null, 4)}</pre>
    </div>
  );
}
