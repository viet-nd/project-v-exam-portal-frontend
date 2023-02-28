import * as subjectsConstants from "../constants/subjectsConstants";

const subjectsInitialState = {
  loading: false,
  error: null,
  subjects: [],
  isAdded: false,
  isDeleted: false,
  isUpdated: false,
};

// const addcategoryInitialState = {
//     loading: false,
//     error: null,
//     isAdded: false,
//   };

export const subjectsReducer = (state = subjectsInitialState, action) => {
  switch (action.type) {
    case subjectsConstants.FETCH_SUBJECTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case subjectsConstants.FETCH_SUBJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        subjects: action.payload,
      };

    case subjectsConstants.FETCH_SUBJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case subjectsConstants.ADD_SUBJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case subjectsConstants.ADD_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: true,
        subjects: [...state.subjects, action.payload],
      };
    case subjectsConstants.ADD_SUBJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case subjectsConstants.DELETE_SUBJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case subjectsConstants.DELETE_SUBJECT_SUCCESS:
      const temp = state.subjects;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].subId == action.payload) {
          temp.splice(i, 1);
        }
      }
      return {
        ...state,
        loading: false,
        isDeleted: true,
        subjects: temp,
      };

    case subjectsConstants.DELETE_SUBJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case subjectsConstants.UPDATE_SUBJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case subjectsConstants.UPDATE_SUBJECT_SUCCESS:
      const temp2 = state.subjects;
      temp2.forEach((sub, index) => {
        if (sub.subId == action.payload.subId) {
          temp.splice(index,1, action.payload);
        }
      });
      return {
        ...state,
        loading: false,
        isUpdated: true,
        subjects: temp2,
      };

    case subjectsConstants.UPDATE_SUBJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


