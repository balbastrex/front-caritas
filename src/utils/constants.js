
export const UserProfiles = {
  ADMINISTRADOR: 1,
  DIRECTOR_ECONOMATO: 2,
  COMPRAS: 3,
  CAJA_PEDIDOS: 4,
  GESTOR_PARROQUIA: 5
}

export const getProfileName = (profileId) => {
  switch (profileId) {
    case UserProfiles.ADMINISTRADOR:
      return "Administrador";
    case UserProfiles.DIRECTOR_ECONOMATO:
      return "Director Economato";
    case UserProfiles.COMPRAS:
      return "Compras";
    case UserProfiles.CAJA_PEDIDOS:
      return "Caja Pedidos";
    case UserProfiles.GESTOR_PARROQUIA:
      return "Gestor Parroquia";
    default:
      return "Desconocido";
  }
}
