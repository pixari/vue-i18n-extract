export const expectedFromParsedVueFiles = [
  {
    path: 'header.titles.title_a',
    line: 1,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: 'missing.a',
    line: 2,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: 'header.steps[0]',
    line: 3,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: 'header.titles.title_a',
    line: 4,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: 'header.titles.title_a',
    line: 5,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: "Don\\'t leave me behind!",
    line: 9,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: 'Early ',
    line: 10,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: 'Early ',
    line: 11,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: 'Backtick: \\`',
    line: 12,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: 'Optimistic match 1',
    line: 13,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: 'Optimistic match 2',
    line: 14,
    file: '/tests/unit/fixtures/vue-files/file1.js'
  },
  {
    path: 'header.titles.title_b',
    line: 1,
    file: '/tests/unit/fixtures/vue-files/file2.js'
  },
  {
    path: 'missing.b',
    line: 2,
    file: '/tests/unit/fixtures/vue-files/file2.js'
  },
  {
    path: 'footer.logout',
    line: 3,
    file: '/tests/unit/fixtures/vue-files/file2.js'
  },
  {
    path: 'Key As Fallback',
    line: 1,
    file: '/tests/unit/fixtures/vue-files/file3.vue'
  },
  {
    path: 'Missing',
    line: 2,
    file: '/tests/unit/fixtures/vue-files/file3.vue'
  },
  {
    path: "Don\\'t leave me behind!",
    line: 3,
    file: '/tests/unit/fixtures/vue-files/file3.vue'
  },
  {
    path: 'Early ',
    line: 4,
    file: '/tests/unit/fixtures/vue-files/file3.vue'
  },
  {
    path: 'Early ',
    line: 5,
    file: '/tests/unit/fixtures/vue-files/file3.vue'
  },
  {
    path: 'Backtick: \\`',
    line: 6,
    file: '/tests/unit/fixtures/vue-files/file3.vue'
  },
  {
    path: 'header.titles.title_c',
    line: 1,
    file: '/tests/unit/fixtures/vue-files/folder/file3.vue'
  },
  {
    path: 'missing.c',
    line: 2,
    file: '/tests/unit/fixtures/vue-files/folder/file3.vue'
  },
  {
    path: 'missing.d',
    line: 4,
    file: '/tests/unit/fixtures/vue-files/folder/file3.vue'
  },
  {
    path: 'missing.e',
    line: 7,
    file: '/tests/unit/fixtures/vue-files/folder/file3.vue'
  },
  {
    path: 'missing.f',
    line: 10,
    file: '/tests/unit/fixtures/vue-files/folder/file3.vue'
  },
  {
    path: 'header.paragraphs.p_a',
    line: 3,
    file: '/tests/unit/fixtures/vue-files/folder/file3.vue'
  },
  {
    path: 'header.paragraphs.p_b',
    line: 6,
    file: '/tests/unit/fixtures/vue-files/folder/file3.vue'
  },
  {
    path: 'header.paragraphs.p_c',
    line: 9,
    file: '/tests/unit/fixtures/vue-files/folder/file3.vue'
  },
  {
    path: 'header.paragraphs.english_only',
    line: 1,
    file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue'
  },
  {
    path: 'missing.e',
    line: 2,
    file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue'
  },
  {
    path: 'missing.f.a',
    line: 3,
    file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue'
  },
  {
    path: 'missing.f.b',
    line: 4,
    file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue'
  },
  {
    path: 'missing.f.c',
    line: 4,
    file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue'
  }
];

export const expectedFromParsedLanguageFiles = {
  de_DE: [
    {
      line: 0,
      path: 'header.titles.title_a',
      file: '/tests/unit/fixtures/language-files/de_DE.json'
    },
    {
      line: 1,
      path: 'header.titles.title_b',
      file: '/tests/unit/fixtures/language-files/de_DE.json'
    },
    {
      line: 2,
      path: 'header.titles.title_c',
      file: '/tests/unit/fixtures/language-files/de_DE.json'
    },
    {
      line: 3,
      path: 'header.paragraphs.p_a',
      file: '/tests/unit/fixtures/language-files/de_DE.json'
    },
    {
      line: 4,
      path: 'header.paragraphs.german_only',
      file: '/tests/unit/fixtures/language-files/de_DE.json'
    },
    {
      line: 5,
      path: 'header.paragraphs.unused',
      file: '/tests/unit/fixtures/language-files/de_DE.json'
    },
    {
      line: 6,
      path: 'header.steps[0]',
      file: '/tests/unit/fixtures/language-files/de_DE.json'
    },
    {
      line: 7,
      path: 'header.steps[1]',
      file: '/tests/unit/fixtures/language-files/de_DE.json'
    },
    {
      line: 8,
      path: 'header.steps[2]',
      file: '/tests/unit/fixtures/language-files/de_DE.json'
    },
    {
      line: 9,
      path: 'Key As Fallback',
      file: '/tests/unit/fixtures/language-files/de_DE.json'
    }
  ],
  en_EN: [
    {
      line: 0,
      path: 'header.titles.title_a',
      file: '/tests/unit/fixtures/language-files/en_EN.json'
    },
    {
      line: 1,
      path: 'header.titles.title_b',
      file: '/tests/unit/fixtures/language-files/en_EN.json'
    },
    {
      line: 2,
      path: 'header.titles.title_c',
      file: '/tests/unit/fixtures/language-files/en_EN.json'
    },
    {
      line: 3,
      path: 'header.paragraphs.p_a',
      file: '/tests/unit/fixtures/language-files/en_EN.json'
    },
    {
      line: 4,
      path: 'header.paragraphs.english_only',
      file: '/tests/unit/fixtures/language-files/en_EN.json'
    },
    {
      line: 5,
      path: 'header.paragraphs.unused',
      file: '/tests/unit/fixtures/language-files/en_EN.json'
    },
    {
      line: 6,
      path: 'header.steps[0]',
      file: '/tests/unit/fixtures/language-files/en_EN.json'
    },
    {
      line: 7,
      path: 'header.steps[1]',
      file: '/tests/unit/fixtures/language-files/en_EN.json'
    },
    {
      line: 8,
      path: 'header.steps[2]',
      file: '/tests/unit/fixtures/language-files/en_EN.json'
    },
    {
      line: 9,
      path: 'Key As Fallback',
      file: '/tests/unit/fixtures/language-files/en_EN.json'
    }
  ],
  fr_FR: [
    {
      line: 0,
      path: 'footer.logout',
      file: '/tests/unit/fixtures/language-files/fr_FR.json'
    },
    {
      line: 0,
      path: 'header.titles.title_a',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml'
    },
    {
      line: 1,
      path: 'header.titles.title_b',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml'
    },
    {
      line: 2,
      path: 'header.titles.title_c',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml'
    },
    {
      line: 3,
      path: 'header.paragraphs.p_a',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml'
    },
    {
      line: 4,
      path: 'header.paragraphs.french_only',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml'
    },
    {
      line: 5,
      path: 'header.paragraphs.unused',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml'
    },
    {
      line: 6,
      path: 'header.steps[0]',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml'
    },
    {
      line: 7,
      path: 'header.steps[1]',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml'
    },
    {
      line: 8,
      path: 'header.steps[2]',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml'
    }
  ]
};

export const expectedI18NReport = {
  missingKeys: [
    {
      path: 'missing.a',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'de_DE'
    },
    {
      path: "Don\\'t leave me behind!",
      line: 9,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'de_DE'
    },
    {
      path: 'Early ',
      line: 10,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'de_DE'
    },
    {
      path: 'Early ',
      line: 11,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'de_DE'
    },
    {
      path: 'Backtick: \\`',
      line: 12,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'de_DE'
    },
    {
      path: 'Optimistic match 1',
      line: 13,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'de_DE'
    },
    {
      path: 'Optimistic match 2',
      line: 14,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'de_DE'
    },
    {
      path: 'missing.b',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/file2.js',
      language: 'de_DE'
    },
    {
      path: 'footer.logout',
      line: 3,
      file: '/tests/unit/fixtures/vue-files/file2.js',
      language: 'de_DE'
    },
    {
      path: 'Missing',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'de_DE'
    },
    {
      path: "Don\\'t leave me behind!",
      line: 3,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'de_DE'
    },
    {
      path: 'Early ',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'de_DE'
    },
    {
      path: 'Early ',
      line: 5,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'de_DE'
    },
    {
      path: 'Backtick: \\`',
      line: 6,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'de_DE'
    },
    {
      path: 'missing.c',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'de_DE'
    },
    {
      path: 'missing.d',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'de_DE'
    },
    {
      path: 'missing.e',
      line: 7,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'de_DE'
    },
    {
      path: 'missing.f',
      line: 10,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'de_DE'
    },
    {
      path: 'header.paragraphs.p_b',
      line: 6,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'de_DE'
    },
    {
      path: 'header.paragraphs.p_c',
      line: 9,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'de_DE'
    },
    {
      path: 'header.paragraphs.english_only',
      line: 1,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'de_DE'
    },
    {
      path: 'missing.e',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'de_DE'
    },
    {
      path: 'missing.f.a',
      line: 3,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'de_DE'
    },
    {
      path: 'missing.f.b',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'de_DE'
    },
    {
      path: 'missing.f.c',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'de_DE'
    },
    {
      path: 'missing.a',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'en_EN'
    },
    {
      path: "Don\\'t leave me behind!",
      line: 9,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'en_EN'
    },
    {
      path: 'Early ',
      line: 10,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'en_EN'
    },
    {
      path: 'Early ',
      line: 11,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'en_EN'
    },
    {
      path: 'Backtick: \\`',
      line: 12,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'en_EN'
    },
    {
      path: 'Optimistic match 1',
      line: 13,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'en_EN'
    },
    {
      path: 'Optimistic match 2',
      line: 14,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'en_EN'
    },
    {
      path: 'missing.b',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/file2.js',
      language: 'en_EN'
    },
    {
      path: 'footer.logout',
      line: 3,
      file: '/tests/unit/fixtures/vue-files/file2.js',
      language: 'en_EN'
    },
    {
      path: 'Missing',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'en_EN'
    },
    {
      path: "Don\\'t leave me behind!",
      line: 3,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'en_EN'
    },
    {
      path: 'Early ',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'en_EN'
    },
    {
      path: 'Early ',
      line: 5,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'en_EN'
    },
    {
      path: 'Backtick: \\`',
      line: 6,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'en_EN'
    },
    {
      path: 'missing.c',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'en_EN'
    },
    {
      path: 'missing.d',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'en_EN'
    },
    {
      path: 'missing.e',
      line: 7,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'en_EN'
    },
    {
      path: 'missing.f',
      line: 10,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'en_EN'
    },
    {
      path: 'header.paragraphs.p_b',
      line: 6,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'en_EN'
    },
    {
      path: 'header.paragraphs.p_c',
      line: 9,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'en_EN'
    },
    {
      path: 'missing.e',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'en_EN'
    },
    {
      path: 'missing.f.a',
      line: 3,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'en_EN'
    },
    {
      path: 'missing.f.b',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'en_EN'
    },
    {
      path: 'missing.f.c',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'en_EN'
    },
    {
      path: 'missing.a',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'fr_FR'
    },
    {
      path: "Don\\'t leave me behind!",
      line: 9,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'fr_FR'
    },
    {
      path: 'Early ',
      line: 10,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'fr_FR'
    },
    {
      path: 'Early ',
      line: 11,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'fr_FR'
    },
    {
      path: 'Backtick: \\`',
      line: 12,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'fr_FR'
    },
    {
      path: 'Optimistic match 1',
      line: 13,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'fr_FR'
    },
    {
      path: 'Optimistic match 2',
      line: 14,
      file: '/tests/unit/fixtures/vue-files/file1.js',
      language: 'fr_FR'
    },
    {
      path: 'missing.b',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/file2.js',
      language: 'fr_FR'
    },
    {
      path: 'Key As Fallback',
      line: 1,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'Missing',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'fr_FR'
    },
    {
      path: "Don\\'t leave me behind!",
      line: 3,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'Early ',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'Early ',
      line: 5,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'Backtick: \\`',
      line: 6,
      file: '/tests/unit/fixtures/vue-files/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'missing.c',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'missing.d',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'missing.e',
      line: 7,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'missing.f',
      line: 10,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'header.paragraphs.p_b',
      line: 6,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'header.paragraphs.p_c',
      line: 9,
      file: '/tests/unit/fixtures/vue-files/folder/file3.vue',
      language: 'fr_FR'
    },
    {
      path: 'header.paragraphs.english_only',
      line: 1,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'fr_FR'
    },
    {
      path: 'missing.e',
      line: 2,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'fr_FR'
    },
    {
      path: 'missing.f.a',
      line: 3,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'fr_FR'
    },
    {
      path: 'missing.f.b',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'fr_FR'
    },
    {
      path: 'missing.f.c',
      line: 4,
      file: '/tests/unit/fixtures/vue-files/folder/folder 2/file4.vue',
      language: 'fr_FR'
    }
  ],
  unusedKeys: [
    {
      line: 4,
      path: 'header.paragraphs.german_only',
      file: '/tests/unit/fixtures/language-files/de_DE.json',
      language: 'de_DE'
    },
    {
      line: 5,
      path: 'header.paragraphs.unused',
      file: '/tests/unit/fixtures/language-files/de_DE.json',
      language: 'de_DE'
    },
    {
      line: 7,
      path: 'header.steps[1]',
      file: '/tests/unit/fixtures/language-files/de_DE.json',
      language: 'de_DE'
    },
    {
      line: 8,
      path: 'header.steps[2]',
      file: '/tests/unit/fixtures/language-files/de_DE.json',
      language: 'de_DE'
    },
    {
      line: 5,
      path: 'header.paragraphs.unused',
      file: '/tests/unit/fixtures/language-files/en_EN.json',
      language: 'en_EN'
    },
    {
      line: 7,
      path: 'header.steps[1]',
      file: '/tests/unit/fixtures/language-files/en_EN.json',
      language: 'en_EN'
    },
    {
      line: 8,
      path: 'header.steps[2]',
      file: '/tests/unit/fixtures/language-files/en_EN.json',
      language: 'en_EN'
    },
    {
      line: 4,
      path: 'header.paragraphs.french_only',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml',
      language: 'fr_FR'
    },
    {
      line: 5,
      path: 'header.paragraphs.unused',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml',
      language: 'fr_FR'
    },
    {
      line: 7,
      path: 'header.steps[1]',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml',
      language: 'fr_FR'
    },
    {
      line: 8,
      path: 'header.steps[2]',
      file: '/tests/unit/fixtures/language-files/fr_FR.yaml',
      language: 'fr_FR'
    }
  ]
};
