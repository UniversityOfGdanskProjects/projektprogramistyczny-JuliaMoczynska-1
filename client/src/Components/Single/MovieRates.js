import React, { useContext, useEffect } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UsedInputs";
import Rating from "../Stars";
import { Empty } from "../Notfications/Empty";
import { useFormik } from "formik";
import { ReviewValidation } from "../Validation/MovieValidation";
import toast from "react-hot-toast";
import { InlineError } from "../Notfications/Error";
import { Link } from "react-router-dom";
import { reviewMovieAction } from "../../Api/Actions/MoviesActions";
import { useCreateReviewReducer } from "../../Api/Movies/ReviewMovie";
import { UserContext } from "../../Context/Context";
import { useGetMovieDetailsReducer } from "../../Api/Movies/ByIdMovie";
import { useKeycloak } from "@react-keycloak/web";

const Ratings = [
  {
    title: "0 - Poor",
    value: 0,
  },
  {
    title: "1 - Fair",
    value: 1,
  },
  {
    title: "2 - Good",
    value: 2,
  },
  {
    title: "3 - Very Good",
    value: 3,
  },
  {
    title: "4 - Excellent",
    value: 4,
  },
  {
    title: "5 - Masterpiece",
    value: 5,
  },
];

function MovieRates({ movie }) {
  const [createReviewState, createReviewDispatch] = useCreateReviewReducer();
  const [, byIdMovieDispatch] = useGetMovieDetailsReducer();
  const { isLoading, isError } = createReviewState;
  const { userInfo } = useContext(UserContext);
  const { keycloak } = useKeycloak();

  const formik = useFormik({
  initialValues: {
    rating: 0,
    comment: "",
  },
  validationSchema: ReviewValidation,
  onSubmit: async (values) => {
      try {
        await reviewMovieAction({
          id: movie?._id,
          review: values,
        }, createReviewDispatch, byIdMovieDispatch, userInfo);

        window.location.reload();
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      createReviewDispatch({ type: "CREATE_REVIEW_RESET" });
    }
  }, [isError, createReviewDispatch]);

  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* write review */}
        <form
          onSubmit={formik.handleSubmit}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold">
            Review "{movie?.name}"
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Write a review for this movie. It will be posted on this page. lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Donec
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Rating"
              options={Ratings}
              name="rating"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rating}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={formik.values.rating} />
            </div>
            {formik.errors.rating && formik.touched.rating && (
              <InlineError text={formik.errors.rating} />
            )}
          </div>
          {/* message */}
          <div className="w-full">
            <Message
              name="comment"
              label="Message"
              placeholder="Make a comment..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comment}
            />
            {formik.errors.comment && formik.touched.comment && (
              <InlineError text={formik.errors.comment} />
            )}
          </div>

          {/* submit */}
          {userInfo && keycloak.authenticated ? (
            <button
              disabled={isLoading}
              type="submit"
              className="bg-subMain text-white py-4 w-full flex-colo rounded"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-main border border-dashed border-border text-subMain py-4 w-full flex-colo rounded"
            >
              Login to review this movie
            </Link>
          )}
        </form>
        {/* REVIWERS */}
        <div className="col-span-3 flex w-full flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">
            Reviews ({movie?.numberOfReviews})
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
            {movie?.reviews?.length > 0 ? (
              movie?.reviews?.map((review) => (
                <div
                  key={review?._id}
                  className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg"
                >
                  <div className="col-span-7 flex flex-col gap-2">
                    <h2>{review?.userName}</h2>
                    <p className="text-xs leading-6 font-medium text-text">
                      {review?.comment}
                    </p>
                  </div>
                  {/* rates */}
                  <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                    <Rating value={review?.rating} />
                  </div>
                </div>
              ))
            ) : (
              <Empty message={`Be first to rate "${movie?.name}"`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieRates;
