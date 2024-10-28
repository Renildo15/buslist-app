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