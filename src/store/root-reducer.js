import { combineReducers } from '@reduxjs/toolkit';
import { reducer as calendarReducer } from '../slices/calendar';
import { reducer as chatReducer } from '../slices/chat';
import { reducer as kanbanReducer } from '../slices/kanban';
import { reducer as mailReducer } from '../slices/mail';
import marketReducer from '../slices/market';
import parishReducer from '../slices/parish';
import beneficiaryReducer from '../slices/beneficiary';
import countriesReducer from '../slices/countries';
import familyTypeReducer from '../slices/familyType';
import citizenTypeReducer from '../slices/citizenType';
import civilStateTypeReducer from '../slices/civilStateType';
import employmentTypeReducer from '../slices/employmentType';
import guardianshipTypeReducer from '../slices/guardianshipType';
import educationTypeReducer from '../slices/educationType';
import authorizationTypeReducer from '../slices/authorizationType';
import turnReducer from '../slices/turn';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
  market: marketReducer,
  parish: parishReducer,
  beneficiary: beneficiaryReducer,
  countries: countriesReducer,
  familytype: familyTypeReducer,
  citizentype: citizenTypeReducer,
  civilstatetype: civilStateTypeReducer,
  employmenttype: employmentTypeReducer,
  guardianshiptype: guardianshipTypeReducer,
  educationtype: educationTypeReducer,
  authorizationtype: authorizationTypeReducer,
  turn: turnReducer,
});
