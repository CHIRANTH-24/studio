import { fileErrors } from 'shared/constants';

export const RouterNames = {
  SANDBOX: 'SANDBOX',
  TREE_ROOT_VIEW: 'TREE_ROOT_VIEW',
  TREE_VIEW: 'TREE_VIEW',
  STAGING_TREE_VIEW: 'STAGING_TREE_VIEW',
  CONTENTNODE_DETAILS: 'CONTENTNODE_DETAILS',
  MULTI_CONTENTNODE_DETAILS: 'MULTI_CONTENTNODE_DETAILS',
  IMPORT_FROM_CHANNELS: 'IMPORT_FROM_CHANNELS',
  IMPORT_FROM_CHANNELS_BROWSE: 'IMPORT_FROM_CHANNELS_BROWSE',
  IMPORT_FROM_CHANNELS_SEARCH: 'IMPORT_FROM_CHANNELS_SEARCH',
  IMPORT_FROM_CHANNELS_REVIEW: 'IMPORT_FROM_CHANNELS_REVIEW',
  ADD_TOPICS: 'ADD_TOPICS',
  ADD_EXERCISE: 'ADD_EXERCISE',
  UPLOAD_FILES: 'UPLOAD_FILES',
  TRASH: 'TRASH',
  ADD_PREVIOUS_STEPS: 'ADD_PREVIOUS_STEPS',
  ADD_NEXT_STEPS: 'ADD_NEXT_STEPS',
};

export const viewModes = {
  DEFAULT: 'DEFAULT_VIEW',
  COMFORTABLE: 'COMFORTABLE_VIEW',
  COMPACT: 'COMPACT_VIEW',
};

export const ValidationErrors = {
  TITLE_REQUIRED: 'TITLE_REQUIRED',
  LICENCE_REQUIRED: 'LICENCE_REQUIRED',
  COPYRIGHT_HOLDER_REQUIRED: 'COPYRIGHT_HOLDER_REQUIRED',
  LICENCE_DESCRIPTION_REQUIRED: 'LICENCE_DESCRIPTION_REQUIRED',
  MASTERY_MODEL_REQUIRED: 'MASTERY_MODEL_REQUIRED',
  MASTERY_MODEL_INVALID: 'MASTERY_MODEL_INVALID',
  QUESTION_REQUIRED: 'QUESTION_REQUIRED',
  INVALID_NUMBER_OF_CORRECT_ANSWERS: 'INVALID_NUMBER_OF_CORRECT_ANSWERS',
  NO_VALID_PRIMARY_FILES: 'NO_VALID_PRIMARY_FILES',
  ...fileErrors,
};

// These should match the `channel_error` enum on contentcuration.views.base.channels
export const ChannelEditPageErrors = Object.freeze({
  CHANNEL_NOT_FOUND: 'CHANNEL_EDIT_ERROR_CHANNEL_NOT_FOUND',
});

// should correspond to backend types
export const AssessmentItemTypes = {
  SINGLE_SELECTION: 'single_selection',
  MULTIPLE_SELECTION: 'multiple_selection',
  TRUE_FALSE: 'true_false',
  INPUT_QUESTION: 'input_question',
  PERSEUS_QUESTION: 'perseus_question',
};

export const AssessmentItemToolbarActions = {
  EDIT_ITEM: 'EDIT_ITEM',
  MOVE_ITEM_UP: 'MOVE_ITEM_UP',
  MOVE_ITEM_DOWN: 'MOVE_ITEM_DOWN',
  DELETE_ITEM: 'DELETE_ITEM',
  ADD_ITEM_ABOVE: 'ADD_ITEM_ABOVE',
  ADD_ITEM_BELOW: 'ADD_ITEM_BELOW',
};

export const AssessmentItemTypeLabels = {
  [AssessmentItemTypes.SINGLE_SELECTION]: 'questionTypeSingleSelection',
  [AssessmentItemTypes.MULTIPLE_SELECTION]: 'questionTypeMultipleSelection',
  [AssessmentItemTypes.TRUE_FALSE]: 'questionTypeTrueFalse',
  [AssessmentItemTypes.INPUT_QUESTION]: 'questionTypeInput',
  [AssessmentItemTypes.PERSEUS_QUESTION]: 'questionTypePerseus',
};

export const TabNames = {
  DETAILS: 'details',
  PREVIEW: 'preview',
  QUESTIONS: 'questions',
  RELATED: 'related',
};

export const modes = {
  EDIT: 'EDIT',
  NEW_TOPIC: 'NEW_TOPIC',
  NEW_EXERCISE: 'NEW_EXERCISE',
  UPLOAD: 'UPLOAD',
  VIEW_ONLY: 'VIEW_ONLY',
};
