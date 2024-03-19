"use client";
import { useEffect } from "react";
import { useTag } from "@/context/tag";
import Link from "next/link"; // Use Link from next/link

export default function TagsList({ category }) {
  // context
  const { fetchTagsPublic, tags, setUpdatingTag } = useTag();

  useEffect(() => {
    fetchTagsPublic();
  }, []);
  console.log(tags);
  if (category && category._id) {
    // Display only filtered tags within Link
    const filteredTags = tags.filter((t) => t.parentCategory === category._id);

    return (
      <div className="container mb-5">
        <div className="row">
          <div className="col">
            {filteredTags.map((t) => (
              <div key={t._id}>
                <Link href={`/tag/${t.slug}`} className="btn text-dark">
                  {t?.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    // this is for editing tag in the create tag page
    return (
      <div className="container mb-5">
        <div className="row">
          <div className="col">
            {tags.map((t) => (
              <button
                key={t._id}
                className="btn"
                onClick={() => {
                  setUpdatingTag(t);
                }}
              >
                {" "}
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
