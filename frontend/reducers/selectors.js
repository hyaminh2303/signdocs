import memoize from 'lodash/memoize';
import { createSelector } from 'reselect';

// Documents
export const getAllDocuments = (state) => state.entities.documents;

// Users
export const getAllUsers = (state) => state.entities.users;

// Errors
export const getErrors = (state, type = 'session') => state.errors[type] || [];

//
//
// Reselect selectors
export const getDocumentsAsArray = createSelector(getAllDocuments, (docs) =>
  Object.values(docs),
);

export const getUsersAsArray = createSelector(getAllUsers, (users) =>
  Object.values(users),
);

export const getUserDetails = (userId) =>
  createSelector([getAllUsers], (users) => users[userId]);

export const getDocumentById = (docId) =>
  createSelector([getAllDocuments], (docs) => docs[docId]);

export const getAssociatedUsers = memoize((docId) =>
  createSelector([getAllDocuments, getAllUsers], (docs, users) => {
    const doc = docs[docId];
    if (doc && doc.editorIds)
      return doc.editorIds.map((userId) => users[userId]);
    return [];
  }),
);
