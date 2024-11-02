export function getTeachingLevel(teachingLevel: string | undefined) {
  switch (teachingLevel) {
    case 'GRADUACAO':
      return 'Graduação';
    case 'POS_GRADUACAO':
      return 'Pós-graduação';
    case 'MESTRADO':
      return 'Mestrado';
    case 'DOUTORADO':
      return 'Doutorado';
    case 'TECNICO':
      return 'Técnico';
    case 'TECNICO_INTEGRADO':
      return 'Técnico integrado';
    case 'FORMACAO_COMPLEMENTAR':
      return 'Formação complementar';
    case 'LATU_SENSU':
      return 'Lato sensu';
    default:
      return teachingLevel;
  }
}


export function getTeachingLevelKey(teachingLevelName: string | undefined) {
  switch (teachingLevelName) {
    case 'Graduação':
      return 'GRADUACAO';
    case 'Pós-graduação':
      return 'POS_GRADUACAO';
    case 'Mestrado':
      return 'MESTRADO';
    case 'Doutorado':
      return 'DOUTORADO';
    case 'Técnico':
      return 'TECNICO';
    case 'Técnico integrado':
      return 'TECNICO_INTEGRADO';
    case 'Formação complementar':
      return 'FORMACAO_COMPLEMENTAR';
    case 'Lato sensu':
      return 'LATU_SENSU';
    default:
      return teachingLevelName;
  }
}
