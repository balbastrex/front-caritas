import {combineReducers} from '@reduxjs/toolkit';
import authorizationTypeReducer from '../slices/authorizationType';
import beneficiaryReducer from '../slices/beneficiary';
import {reducer as calendarReducer} from '../slices/calendar';
import {reducer as chatReducer} from '../slices/chat';
import citizenTypeReducer from '../slices/citizenType';
import civilStateTypeReducer from '../slices/civilStateType';
import countriesReducer from '../slices/countries';
import educationTypeReducer from '../slices/educationType';
import employmentTypeReducer from '../slices/employmentType';
import familyTypeReducer from '../slices/familyType';
import guardianshipTypeReducer from '../slices/guardianshipType';
import {reducer as kanbanReducer} from '../slices/kanban';
import {reducer as mailReducer} from '../slices/mail';
import marketReducer from '../slices/market';
import orderReducer from '../slices/order';
import parishReducer from '../slices/parish';
import productReducer from '../slices/product';
import receiptReducer from '../slices/receipt';
import serviceReducer from '../slices/service';
import turnReducer from '../slices/turn';
import providerReducer from '../slices/provider';
import userReducer from '../slices/user';
import noteReducer from '../slices/note';

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
  product: productReducer,
  service: serviceReducer,
  order: orderReducer,
  receipt: receiptReducer,
  provider: providerReducer,
  user: userReducer,
  note: noteReducer,
});
