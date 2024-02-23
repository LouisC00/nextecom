// components/tag/TagList
"use client";
import { useEffect } from "react";
import { useTag } from "@/context/tag";
export default function TagsList() {
  // context
  const { tags, fetchTags, setUpdatingTag } = useTag();

  useEffect(() => {
    fetchTags();
  }, []);

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
