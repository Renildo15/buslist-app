export type OptionType = {
  id: string;
  type: string;
  is_filtereded?: boolean | null;
};

export type Option = {
  title: string;
  data: OptionType[];
};

export const optionsFilters: Option[] = [
  {
    title: 'Filtrar avisos por: ',
    data: [
      { id: '1', type: 'Todas', is_filtereded: null },
      { id: '2', type: 'Lidos', is_filtereded: true },
      { id: '3', type: 'Não lidos', is_filtereded: false },
    ],
  },
];

export const optionsFilterStudent: Option[] = [
  {
    title:'Filtrar alunos por: ',
    data: [
      { id: '1', type: 'Todos', is_filtereded: null },
      { id: '2', type: 'Volta', is_filtereded: true },
      { id: '3', type: 'Não volta', is_filtereded: false },
    ]
  },
  {
    title:'Filtrar alunos por: ',
    data: []
  }
]