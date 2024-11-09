export type NoticeType = {
  id: string;
  type: string;
  is_filtereded?: boolean | null;
};

export type Notice = {
  title: string;
  data: NoticeType[];
};

export const optionsFilters: Notice[] = [
  {
    title: 'Filtrar avisos por: ',
    data: [
      { id: '1', type: 'Todas', is_filtereded: null },
      { id: '2', type: 'Lidos', is_filtereded: true },
      { id: '3', type: 'Não lidos', is_filtereded: false },
    ],
  },
];
