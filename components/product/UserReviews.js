import RatingDistribution from "@/components/product/RatingDistribution";
import Stars from "@/components/product/Stars";

export default function UserReviews({ reviews }) {
  return (
    <>
      {reviews?.length > 0 ? (
        <div className="col-lg-8 offset-lg-2">
          <RatingDistribution reviews={reviews} />
          {/* List of user reviews */}
          <ul className="mt-4 bg-white">
            {reviews.map((review) => (
              <li className="list-group-item mb-1" key={review._id}>
                <div>
                  <p>
                    <strong>{review.postedBy.name}</strong>
                  </p>
                  <Stars rating={review.rating} />
                  {review?.comment && (
                    <p
                      className="mt-4 review-comment"
                      dangerouslySetInnerHTML={{
                        __html: review.comment.replace(/\n/g, "<br>"),
                      }}
                    />
                  )}
                </div>{" "}
              </li>
            ))}
          </ul>{" "}
        </div>
      ) : (
        <p>No reviews yet.</p>
      )}
    </>
  );
}
