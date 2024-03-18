"use client";
import { useEffect } from "react";
import { priceRanges } from "@/utils/filterData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StarsAndUp from "@/components/product/StarsAndUp";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";
import { useProduct } from "@/context/product";

export default function ProductFilter({ searchParams }) {
  const pathname = "/shop";
  const { minPrice, maxPrice, ratings, category, tag, brand } = searchParams;
  // context
  const { fetchCategoriesPublic, categories } = useCategory();
  const { fetchTagsPublic, tags } = useTag();
  const { fetchBrands, brands } = useProduct();

  useEffect(() => {
    fetchCategoriesPublic();
    fetchTagsPublic();
    fetchBrands();
  }, []);

  const router = useRouter();
  const activeButton = "btn btn-primary btn-raised mx-1 rounded-pill";
  const button = "btn btn-raised mx-1 rounded-pill";

  const handleRemoveFilter = (filterName) => {
    const updatedSearchParams = { ...searchParams };
    // delete updatedSearchParams[filterName];
    // if filterName is string
    if (typeof filterName === "string") {
      delete updatedSearchParams[filterName];
    }

    // if filterName is array
    if (Array.isArray(filterName)) {
      filterName?.forEach((name) => {
        delete updatedSearchParams[name];
      });
    }
    // reset page to 1 when applying new filtering options
    updatedSearchParams.page = 1;
    const queryString = new URLSearchParams(updatedSearchParams).toString();
    const newUrl = `${pathname}?${queryString}`;

    router.push(newUrl);
  };

  return (
    <div className="mb-5 overflow-scroll">
      <Link className="text-danger" href="/shop">
        Clear Filters
      </Link>

      <p className="mt-4 alert alert-primary">Price</p>
      <div className="row d-flex align-items-center mx-1">
        {priceRanges?.map((range) => {
          const isActive =
            minPrice === String(range?.min) && maxPrice === String(range?.max);

          const handleFilterClick = () => {
            // Clear the filter
            handleRemoveFilter(["minPrice", "maxPrice"]);

            // If the filter was not previously active, reapply it
            if (!isActive) {
              const url = {
                pathname,
                query: {
                  ...searchParams,
                  minPrice: range?.min,
                  maxPrice: range?.max,
                  page: 1,
                },
              };
              const queryString = new URLSearchParams(url.query).toString();
              router.push(`${url.pathname}?${queryString}`);
            }
          };

          return (
            <div key={range?.label}>
              <button
                onClick={handleFilterClick}
                className={isActive ? activeButton : button}
              >
                {range?.label}
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-4 alert alert-primary">Ratings</p>
      <div className="row d-flex align-items-center mx-1">
        {[5, 4, 3, 2, 1].map((ratingValue) => {
          const isActive = String(ratings) === String(ratingValue);

          const handleRatingClick = () => {
            // Clear the ratings filter
            handleRemoveFilter("ratings");

            // If the rating was not previously active, reapply it
            if (!isActive) {
              const url = {
                pathname,
                query: {
                  ...searchParams,
                  ratings: ratingValue,
                  page: 1,
                },
              };
              const queryString = new URLSearchParams(url.query).toString();
              router.push(`${url.pathname}?${queryString}`);
            }
          };

          return (
            <div key={ratingValue}>
              <button
                onClick={handleRatingClick}
                className={
                  isActive
                    ? "btn btn-primary btn-raised mx-1 rounded-pill"
                    : "btn btn-raised mx-1 rounded-pill"
                }
              >
                <StarsAndUp rating={ratingValue} />
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-4 alert alert-primary">Category</p>
      <div className="row d-flex align-items-center mx-1 filter-scroll">
        {categories?.map((c) => {
          const isActive = category === c._id;

          const handleCategoryClick = () => {
            // Clear the category filter
            handleRemoveFilter("category");

            // If the category was not previously active, reapply it
            if (!isActive) {
              delete searchParams.tag;

              const url = {
                pathname,
                query: {
                  ...searchParams,
                  category: c?._id,
                  page: 1,
                },
              };

              const queryString = new URLSearchParams(url.query).toString();
              router.push(`${url.pathname}?${queryString}`);
            }
          };

          return (
            <div key={c._id}>
              <button
                onClick={handleCategoryClick}
                className={isActive ? activeButton : button}
              >
                {c?.name}
              </button>
            </div>
          );
        })}
      </div>

      {category && (
        <>
          <p className="mt-4 alert alert-primary">Tags</p>
          <div className="row d-flex align-items-center mx-1 filter-scroll">
            {tags
              ?.filter((t) => t?.parentCategory === category)
              ?.map((t) => {
                const isActive = tag === t._id;

                const handleTagClick = () => {
                  // Clear the tag filter
                  handleRemoveFilter("tag");

                  // If the tag was not previously active, reapply it
                  if (!isActive) {
                    const url = {
                      pathname,
                      query: {
                        ...searchParams,
                        tag: t?._id,
                        page: 1,
                      },
                    };
                    const queryString = new URLSearchParams(
                      url.query
                    ).toString();
                    router.push(`${url.pathname}?${queryString}`);
                  }
                };

                return (
                  <div key={t._id}>
                    <button
                      onClick={handleTagClick}
                      className={isActive ? activeButton : button}
                    >
                      {t?.name}
                    </button>
                  </div>
                );
              })}
          </div>
        </>
      )}

      <p className="mt-4 alert alert-primary">Brands</p>
      <div className="row d-flex align-items-center mx-1 filter-scroll">
        {brands?.map((b) => {
          const isActive = brand === b;

          const handleBrandClick = () => {
            // Clear the brand filter
            handleRemoveFilter("brand");

            // If the brand was not previously active, reapply it
            if (!isActive) {
              const url = {
                pathname,
                query: {
                  ...searchParams,
                  brand: b,
                  page: 1,
                },
              };
              const queryString = new URLSearchParams(url.query).toString();
              router.push(`${url.pathname}?${queryString}`);
            }
          };

          return (
            <div key={b}>
              <button
                onClick={handleBrandClick}
                className={isActive ? activeButton : button}
              >
                {b}
              </button>
            </div>
          );
        })}
      </div>
      {/* <div className="row d-flex align-items-center mx-1 filter-scroll">
        {brands?.map((b) => {
          const isActive = brand === b;
          const url = {
            pathname,
            query: {
              ...searchParams,
              brand: b,
              page: 1,
            },
          };
          return (
            <div key={b}>
              <Link href={url} className={isActive ? activeButton : button}>
                {b}{" "}
              </Link>
              {isActive && (
                <span
                  onClick={() => handleRemoveFilter("brand")}
                  className="pointer"
                >
                  {" "}
                  X
                </span>
              )}{" "}
            </div>
          );
        })}
      </div> */}
      {/* <pre>{JSON.stringify(tags, null, 4)}</pre> */}
    </div>
  );
}
