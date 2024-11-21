import type { CreateReviewDTO } from "../../reviews/dto/review.dto.ts";

const multipleMovieReviewExampleObject = {
  "pageNumber": 0,
  "pageSize": 1,
  "totalNumberOfPages": 114,
  "totalCount": 114,
  "reviews": [
    {
      "_id": "664e4288a75d53f23f4049ca",
      "userId": "qnydtrfNxWSKBZrZvLYkvMIY7k72",
      "averagedAdvancedScore": 6.3,
      "notes":
        "Desipio animus paulatim molestias. Tremo adulescens comminor accusator cimentarius strues depereo.",
      "tmdbID": 630,
      "advancedScore": {
        "acting": 10,
        "characters": 2,
        "cinematography": 10,
        "climax": 8,
        "ending": 4,
        "music": 1,
        "personalScore": 1,
        "plot": 10,
        "theme": 9,
        "visuals": 8,
      },
      "public": true,
      "title": "arbustum aestivus repellat careo tepesco",
      "createdAt": "2024-05-22T19:07:52.354Z",
      "updatedAt": "2024-05-22T19:07:52.354Z",
      "reviewedDate": "2024-05-22",
      "movieDetails": {
        "id": 630,
        "backdrop_path": "/nRsr98MFztBGm532hCVMGXV6qOp.jpg",
        "budget": 2777000,
        "genres": [
          {
            "id": 12,
            "name": "Adventure",
          },
          {
            "id": 14,
            "name": "Fantasy",
          },
          {
            "id": 10751,
            "name": "Family",
          },
        ],
        "poster_path": "/pfAZFD7I2hxW9HCChTuAzsdE6UX.jpg",
        "release_date": "1939-08-15",
        "revenue": 33754967,
        "runtime": 102,
        "title": "The Wizard of Oz",
      },
    },
  ],
};

const singleMovieReviewExampleObject = {
  "_id": "664e4288a75d53f23f4049ca",
  "userId": "qnydtrfNxWSKBZrZvLYkvMIY7k72",
  "averagedAdvancedScore": 6.3,
  "notes":
    "Desipio animus paulatim molestias. Tremo adulescens comminor accusator cimentarius strues depereo.",
  "tmdbID": 630,
  "advancedScore": {
    "acting": 10,
    "characters": 2,
    "cinematography": 10,
    "climax": 8,
    "ending": 4,
    "music": 1,
    "personalScore": 1,
    "plot": 10,
    "theme": 9,
    "visuals": 8,
  },
  "public": true,
  "title": "arbustum aestivus repellat careo tepesco",
  "createdAt": "2024-05-22T19:07:52.354Z",
  "updatedAt": "2024-05-22T19:07:52.354Z",
  "reviewedDate": "2024-05-22",
  "movieDetails": {
    "id": 630,
    "backdrop_path": "/nRsr98MFztBGm532hCVMGXV6qOp.jpg",
    "budget": 2777000,
    "genres": [
      {
        "id": 12,
        "name": "Adventure",
      },
      {
        "id": 14,
        "name": "Fantasy",
      },
      {
        "id": 10751,
        "name": "Family",
      },
    ],
    "poster_path": "/pfAZFD7I2hxW9HCChTuAzsdE6UX.jpg",
    "release_date": "1939-08-15",
    "revenue": 33754967,
    "runtime": 102,
    "title": "The Wizard of Oz",
  },
};

const reviewAdvancedScoreExampleObject = {
  "acting": 10,
  "characters": 2,
  "cinematography": 10,
  "climax": 8,
  "ending": 4,
  "music": 1,
  "personalScore": 1,
  "plot": 10,
  "theme": 9,
  "visuals": 8,
};

const createPublicReviewExampleObject: CreateReviewDTO = {
  title: "arbustum aestivus repellat careo tepesco",
  notes:
    "Desipio animus paulatim molestias. Tremo adulescens comminor accusator cimentarius strues depereo.",
  tmdbID: 630,
  advancedScore: reviewAdvancedScoreExampleObject,
  public: true,
  reviewedDate: "2024-05-22",
};

const createPrivateReviewExampleObject: CreateReviewDTO = {
  title: "private movie review",
  notes: "private movie review notes",
  tmdbID: 630,
  advancedScore: reviewAdvancedScoreExampleObject,
  public: false,
  reviewedDate: "2024-05-22",
};

const updateReviewExampleObject: CreateReviewDTO = {
  title: "updated movie review",
  notes: "updated movie review notes",
  tmdbID: 630,
  advancedScore: reviewAdvancedScoreExampleObject,
  public: true,
  reviewedDate: "2024-05-22",
};

export {
  createPrivateReviewExampleObject,
  createPublicReviewExampleObject,
  multipleMovieReviewExampleObject,
  reviewAdvancedScoreExampleObject,
  singleMovieReviewExampleObject,
  updateReviewExampleObject,
};
