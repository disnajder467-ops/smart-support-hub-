const defaultSettings = {
  slaHours: {
    critical: 4,
    high: 8,
    medium: 24,
    low: 72
  }
};

const startDeployments = [
  {
    id: "DEP-01",
    client: "Колледж, учебная часть",
    product: "Система расписания",
    version: "v1.2.0",
    stage: "training",
    owner: "Иванов А.",
    plannedDate: "2026-11-20",
    done: 2,
    total: 3
  },
  {
    id: "DEP-02",
    client: "Городская библиотека №3",
    product: "Электронный каталог",
    version: "v1.2.1",
    stage: "setup",
    owner: "Смирнова Е.",
    plannedDate: "2026-11-25",
    done: 1,
    total: 3
  },
  {
    id: "DEP-03",
    client: "Лицей №14",
    product: "Портал успеваемости",
    version: "v1.2.1",
    stage: "production",
    owner: "Козлов Д.",
    plannedDate: "2026-11-05",
    done: 3,
    total: 3
  }
];

const startIncidents = [
  {
    id: "INC-001",
    title: "Не открывается отчёт по посещаемости",
    priority: "high",
    status: "in_progress",
    createdAt: "2026-11-11T09:00:00",
    resolvedAt: null
  },
  {
    id: "INC-002",
    title: "Ошибка авторизации преподавателей",
    priority: "critical",
    status: "resolved",
    createdAt: "2026-11-10T10:00:00",
    resolvedAt: "2026-11-10T12:30:00"
  },
  {
    id: "INC-003",
    title: "Медленная загрузка списка групп",
    priority: "medium",
    status: "new",
    createdAt: "2026-11-11T11:00:00",
    resolvedAt: null
  },
  {
    id: "INC-004",
    title: "Опечатка в заголовке профиля студента",
    priority: "low",
    status: "resolved",
    createdAt: "2026-11-08T14:00:00",
    resolvedAt: "2026-11-09T10:00:00"
  },
  {
    id: "INC-005",
    title: "Сбой синхронизации расписания",
    priority: "high",
    status: "resolved",
    createdAt: "2026-11-09T08:00:00",
    resolvedAt: "2026-11-09T19:00:00"
  },
  {
    id: "INC-006",
    title: "Не приходят уведомления на почту",
    priority: "medium",
    status: "in_progress",
    createdAt: "2026-11-11T08:30:00",
    resolvedAt: null
  }
];

const startRequests = [
  {
    id: "REQ-001",
    title: "Добавить экспорт отчёта в PDF",
    type: "perfective",
    status: "planned",
    targetVersion: "v1.3.0"
  },
  {
    id: "REQ-002",
    title: "Исправить кодировку при выгрузке CSV",
    type: "corrective",
    status: "done",
    targetVersion: "v1.2.1"
  },
  {
    id: "REQ-003",
    title: "Адаптация интерфейса под мобильные браузеры",
    type: "adaptive",
    status: "planned",
    targetVersion: "v1.3.0"
  },
  {
    id: "REQ-004",
    title: "Обновление библиотеки графиков до актуальной версии",
    type: "preventive",
    status: "new",
    targetVersion: "v1.3.0"
  }
];

const startReleases = [
  {
    id: "REL-001",
    version: "v1.2.0",
    date: "2026-10-25",
    level: "minor",
    changes: [
      "Добавлен модуль учёта внедрений",
      "Реализована фильтрация инцидентов по статусу"
    ]
  },
  {
    id: "REL-002",
    version: "v1.2.1",
    date: "2026-11-05",
    level: "patch",
    changes: [
      "Исправлено открытие отчёта в формате CSV",
      "Обновлено руководство пользователя"
    ]
  }
];
