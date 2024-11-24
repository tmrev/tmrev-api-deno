import { tmrev } from "../models/mongodb.ts";

const movieDetailsLookUp = [
  {
    $lookup: {
      from: tmrev.collection.movies,
      localField: "tmdbID",
      foreignField: "id",
      as: "movieDetails",
    },
  },
  {
    $unwind: "$movieDetails",
  },
];

const movieDetailsProjection = {
  movieDetails: {
    id: 1,
    title: 1,
    poster_path: 1,
    backdrop_path: 1,
    release_date: 1,
    genres: 1,
    runtime: 1,
    budget: 1,
    revenue: 1,
  },
};

const movieDetailsProjectionWithCast = {
  movieDetails: {
    ...movieDetailsProjection.movieDetails,
    credits: 1,
  },
};

const movieDetailsPipeline = [
  ...movieDetailsLookUp,
  {
    $project: {
      _id: 1,
      userId: 1,
      tmdbID: 1,
      title: 1,
      notes: 1,
      public: 1,
      createdAt: 1,
      updatedAt: 1,
      averagedAdvancedScore: 1,
      advancedScore: 1,
      reviewedDate: 1,
      ...movieDetailsProjection,
    },
  },
];

const variableMovieDetailsPipeline = (
  shouldIncludeCredits: boolean = false,
) => {
  return [
    ...movieDetailsLookUp,
    {
      $project: {
        _id: 1,
        userId: 1,
        tmdbID: 1,
        title: 1,
        notes: 1,
        public: 1,
        createdAt: 1,
        updatedAt: 1,
        averagedAdvancedScore: 1,
        advancedScore: 1,
        reviewedDate: 1,
        ...shouldIncludeCredits
          ? movieDetailsProjectionWithCast
          : movieDetailsProjection,
      },
    },
  ];
};

export {
  movieDetailsLookUp,
  movieDetailsPipeline,
  movieDetailsProjectionWithCast,
  variableMovieDetailsPipeline,
};
