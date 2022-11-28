import {UserProfiles} from '../../utils/constants';

export const isAllowedRouteForProfile = (profileId, urlPath) => permissions[urlPath]?.find((profile) => (profile === profileId)) !== undefined
export const isAllowedSectionForProfile = (profileId, section) => generalSection[section]?.find((profile) => (profile === profileId)) !== undefined

const generalSection = {
  'General': [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  'Mantenimiento': [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.COMPRAS, UserProfiles.CAJA_PEDIDOS, UserProfiles.GESTOR_PARROQUIA],
}

const permissions = {
  "/dashboard": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/markets": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/markets/new": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/markets/[marketId]/edit": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/parishes": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/parishes/new": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/parishes/[parishId]/edit": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/beneficiaries": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.GESTOR_PARROQUIA],
  "/dashboard/beneficiaries/new": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.GESTOR_PARROQUIA],
  "/dashboard/beneficiaries/[beneficiaryId]/edit": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.GESTOR_PARROQUIA],
  "/dashboard/products": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.COMPRAS],
  "/dashboard/products/new": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.COMPRAS],
  "/dashboard/products/[productId]/edit": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.COMPRAS],
  "/dashboard/orders": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.CAJA_PEDIDOS],
  "/dashboard/orders/new": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.CAJA_PEDIDOS],
  "/dashboard/orders/[orderId]/edit": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.CAJA_PEDIDOS],
  "/dashboard/invoices": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/turns": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/turns/new": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/turns/[turnId]/edit": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  "/dashboard/calendar": [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
}

export const defaultURLProfile = {
  1: "/dashboard",
  2: "/dashboard",
  3: "/dashboard/products",
  4: "/dashboard/orders",
  5: "/dashboard/beneficiaries",
}
