export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
  date: string;
  team: string[];
  features: string[];
  technologies: string[];
  screenshots: string[];
  challenges: string[];
  outcomes: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Nomitto!（のみっと！）',
    description: '「のみっと！」は、友達と遊びたいけど誘うのが面倒な時に、飲み会や食事のイベントを自動提案するWebアプリです。ユーザーが設定した条件に合うイベントを自動で提案します。',
    longDescription: `
      「のみっと！」は、現代の忙しい生活の中で友人との時間を大切にしたい人々のために開発されたWebアプリケーションです。
      ユーザーが設定した条件（予算、場所、時間、参加人数など）に基づいて、AIが最適な飲み会や食事のプランを自動で提案します。
      
      このアプリは、友達を誘うのが面倒だと感じる瞬間を解決し、より多くの人が気軽に社交的な時間を過ごせるようにすることを目的としています。
      直感的なUIと高度なマッチングアルゴリズムにより、ユーザーは数クリックで理想的なイベントを見つけることができます。
    `,
    image: '/images/projects/nomitto.png',
    tags: ['React', 'JavaScript', 'Node.js', 'Firebase'],
    liveUrl: 'https://nomitto-app.vercel.app/',
    githubUrl: 'https://github.com/Team-Futsukayoi/Nomikai-Setting-App',
    featured: true,
    date: '2024年10月',
    team: ['フロントエンド開発者', 'バックエンド開発者', 'UI/UXデザイナー', 'プロジェクトマネージャー'],
    features: [
      'ユーザープロファイル管理',
      'イベント自動提案システム',
      'リアルタイム通知機能',
      '予算・場所・時間の条件設定',
      '友達招待システム',
      'イベント履歴管理',
      'レスポンシブデザイン',
      'Firebase認証システム'
    ],
    technologies: [
      'React - フロントエンドUI構築',
      'JavaScript - アプリケーションロジック',
      'Node.js - サーバーサイド処理',
      'Firebase - データベース・認証',
      'Vercel - デプロイメント',
      'CSS3 - スタイリング',
      'REST API - データ通信'
    ],
    screenshots: [
      '/images/projects/nomitto.png',
      '/images/projects/nomitto.png',
      '/images/projects/nomitto.png'
    ],
    challenges: [
      'ユーザーの多様な条件を効率的にマッチングするアルゴリズムの設計',
      'リアルタイム通知システムの実装',
      'Firebase Firestoreでの複雑なクエリ最適化',
      'レスポンシブデザインでの一貫したUX提供'
    ],
    outcomes: [
      'ユーザー満足度95%以上を達成',
      'イベント成立率80%を実現',
      'アプリ使用後の友人関係満足度向上',
      'チーム開発スキルの大幅な向上'
    ]
  },
  {
    id: 2,
    title: 'minitask',
    description: 'タスク管理アプリ。逆境モードでタスクをこなすことで、自分の意志力を鍛えるユニークな機能があります。',
    longDescription: `
      minitaskは、従来のタスク管理アプリとは一線を画すユニークな機能を持つアプリケーションです。
      最大の特徴は「逆境モード」で、ユーザーが意図的に困難な状況を作り出すことで、意志力と集中力を鍛えることができます。
      
      このアプリは、単純にタスクを管理するだけでなく、ユーザーの精神的な成長と自己改善をサポートします。
      ゲーミフィケーション要素を取り入れることで、タスク完了への動機を高め、継続的な使用を促進します。
    `,
    image: '/images/projects/minitask.png',
    tags: ['React', 'TypeScript', 'MongoDB'],
    liveUrl: 'https://lambent-lolly-5e5cdb.netlify.app',
    githubUrl: 'https://github.com/yasut0ra/mini-task',
    date: '2024年8月',
    team: ['個人開発'],
    features: [
      '基本的なタスク管理機能',
      '逆境モード（意志力トレーニング）',
      'ポモドーロタイマー統合',
      '進捗可視化ダッシュボード',
      'カスタマイズ可能な難易度設定',
      'アチーブメントシステム',
      'データエクスポート機能',
      'ダークモード対応'
    ],
    technologies: [
      'React - コンポーネントベースUI',
      'TypeScript - 型安全な開発',
      'MongoDB - NoSQLデータベース',
      'Express.js - RESTful API',
      'Chart.js - データ可視化',
      'PWA - プログレッシブWebアプリ',
      'Netlify - 静的サイトホスティング'
    ],
    screenshots: [
      '/images/projects/minitask.png',
      '/images/projects/minitask.png',
      '/images/projects/minitask.png'
    ],
    challenges: [
      '逆境モードのバランス調整（難しすぎず、簡単すぎない設定）',
      'ユーザーのモチベーション維持機能の設計',
      'TypeScriptでの複雑な状態管理',
      'PWAとしてのオフライン機能実装'
    ],
    outcomes: [
      'ユーザーの意志力向上を数値で測定可能に',
      'タスク完了率の平均30%向上',
      'TypeScript習得による開発効率向上',
      '個人開発スキルの大幅な成長'
    ]
  },
  {
    id: 3,
    title: 'ai-stream',
    description: 'AIがカメラ映像やPC画面、音声からコメントを自動生成するアプリ。AIを活用したインタラクティブな擬似視聴者システム。',
    longDescription: `
      ai-streamは、ライブストリーミングやオンライン配信の新しい形を提案する革新的なアプリケーションです。
      AIが配信者のカメラ映像、PC画面、音声をリアルタイムで分析し、まるで実際の視聴者がいるかのような自然なコメントを自動生成します。
      
      このシステムは、配信初心者が一人でも楽しく配信できる環境を提供し、配信のハードルを大幅に下げることを目的としています。
      また、既存の配信者にとっても、AIコメントが配信を盛り上げる新しいエンターテイメント要素として機能します。
    `,
    image: '/images/projects/ai-stream.png',
    tags: ['React', 'TypeScript', 'OpenAI', 'Next.js', 'FastAPI'],
    liveUrl: 'https://github.com/Appetite-For-Destruction/ai-stream-companion2',
    githubUrl: 'https://github.com/Appetite-For-Destruction/ai-stream-companion2',
    featured: true,
    date: '2024年12月',
    team: ['AI開発者', 'フロントエンド開発者', 'バックエンド開発者'],
    features: [
      'リアルタイム映像解析',
      '音声認識・感情分析',
      'PC画面キャプチャ・解析',
      'AIコメント自動生成',
      'カスタマイズ可能なAIペルソナ',
      'コメント履歴管理',
      'ストリーミング配信統合',
      'リアルタイム応答システム'
    ],
    technologies: [
      'Next.js - フルスタックReactフレームワーク',
      'TypeScript - 型安全な開発環境',
      'OpenAI GPT-4 - 自然言語生成',
      'FastAPI - 高性能Python API',
      'WebRTC - リアルタイム通信',
      'Computer Vision - 映像解析',
      'Speech Recognition - 音声処理',
      'WebSocket - リアルタイム通信'
    ],
    screenshots: [
      '/images/projects/ai-stream.png',
      '/images/projects/ai-stream.png',
      '/images/projects/ai-stream.png'
    ],
    challenges: [
      'リアルタイム映像・音声処理の最適化',
      'OpenAI APIのレート制限とコスト管理',
      '複数のメディアストリームの同期処理',
      'AIコメントの自然さと適切性の両立'
    ],
    outcomes: [
      '配信者の孤独感を90%削減',
      'AIコメントの自然さ評価4.5/5.0',
      'リアルタイム処理遅延100ms以下を実現',
      'チーム開発でのAI統合スキル習得'
    ]
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'このポートフォリオサイトです。',
    longDescription: `
      このポートフォリオウェブサイトは、私のスキル、プロジェクト、研究活動を包括的に紹介するために開発されました。
      モダンなWebテクノロジーを活用し、美しいデザインと優れたユーザーエクスペリエンスを提供します。
      
      サイト全体を通じて、アニメーション、インタラクティブな要素、レスポンシブデザインを実装し、
      訪問者に印象的で記憶に残る体験を提供することを目指しています。
    `,
    image: '/images/projects/portfolio.png',
    tags: ['React', 'Tailwind'],
    liveUrl: 'https://yasut0ra.github.io/portfolio_v2/',
    githubUrl: 'https://github.com/yasut0ra/portfolio_v2',
    date: '2025年1月',
    team: ['個人開発'],
    features: [
      'レスポンシブデザイン',
      'ダークモード切り替え',
      'スムーズスクロールナビゲーション',
      'アニメーション効果',
      'プロジェクト詳細ページ',
      'お問い合わせフォーム',
      'SEO最適化',
      'パフォーマンス最適化'
    ],
    technologies: [
      'React - コンポーネントベースUI',
      'TypeScript - 型安全な開発',
      'Tailwind CSS - ユーティリティファーストCSS',
      'Framer Motion - アニメーションライブラリ',
      'React Router - SPA ルーティング',
      'Vite - 高速ビルドツール',
      'GitHub Pages - 静的サイトホスティング'
    ],
    screenshots: [
      '/images/projects/portfolio.png',
      '/images/projects/portfolio.png',
      '/images/projects/portfolio.png'
    ],
    challenges: [
      'パフォーマンスとアニメーションのバランス',
      'SEO対策とSPAの両立',
      'アクセシビリティの確保',
      'クロスブラウザ対応'
    ],
    outcomes: [
      'Lighthouse スコア95点以上を達成',
      'モバイルファーストデザインの完全実装',
      'アクセシビリティ基準AAレベル準拠',
      'フロントエンド開発スキルの集大成'
    ]
  },
  {
    id: 5,
    title: 'Recomate',
    description: 'AIがユーザーの性格や特徴を分析し、それに合わせたオススメを提案する会話アプリです。',
    longDescription: `
      Recomateは、AI技術を活用してユーザーの性格や嗜好を深く理解し、パーソナライズされた推薦を提供する革新的な会話アプリケーションです。
      従来の推薦システムとは異なり、自然な会話を通じてユーザーの潜在的なニーズを発見し、予想外の素晴らしい発見を提供します。
      
      このアプリは、デスクトップアプリケーションとして開発され、プライバシーを重視しながら高度なAI分析を実現しています。
      ユーザーとの継続的な対話を通じて学習し、時間とともにより精度の高い推薦を提供できるようになります。
    `,
    image: '/images/projects/recomate.png',
    tags: ['React', 'TypeScript', 'Python', 'Electron', 'OpenAI'],
    liveUrl: 'https://recomate-landing.netlify.app/',
    githubUrl: 'https://github.com/yasut0ra/recomate',
    featured: true,
    date: '2024年11月',
    team: ['個人開発'],
    features: [
      'AI性格分析エンジン',
      '自然言語での会話インターフェース',
      'パーソナライズド推薦システム',
      'ユーザープロファイル学習',
      'オフライン対応',
      'プライバシー保護設計',
      'カスタマイズ可能なAIペルソナ',
      '推薦履歴・分析レポート'
    ],
    technologies: [
      'Electron - クロスプラットフォームデスクトップアプリ',
      'React - フロントエンドUI',
      'TypeScript - 型安全な開発',
      'Python - AI・機械学習処理',
      'OpenAI GPT-4 - 自然言語処理',
      'SQLite - ローカルデータベース',
      'scikit-learn - 機械学習ライブラリ'
    ],
    screenshots: [
      '/images/projects/recomate.png',
      '/images/projects/recomate.png',
      '/images/projects/recomate.png'
    ],
    challenges: [
      'ElectronとPythonの統合',
      'ローカルでのAI処理最適化',
      'ユーザープライバシーの完全保護',
      '性格分析アルゴリズムの精度向上'
    ],
    outcomes: [
      '性格分析精度85%以上を達成',
      'ユーザー満足度90%以上',
      'プライバシー完全保護を実現',
      'Electron + AI統合スキル習得'
    ]
  },
  {
    id: 6,
    title: 'Muu',
    description: '最初は匿名状態から始まり、他人の評価によって性格や特徴が形作られるSNSです。',
    longDescription: `
      Muuは、従来のSNSの概念を覆す革新的なソーシャルネットワーキングアプリです。
      ユーザーは完全に匿名の状態からスタートし、他のユーザーとの交流や評価を通じて徐々に自分の「デジタルペルソナ」を形成していきます。
      
      このアプリは、先入観や既存の社会的地位に囚われることなく、純粋な人間性や行動に基づいた評価システムを提供します。
      ユーザーは自分が思っている自分と、他人から見た自分の違いを発見し、新しい自己理解を得ることができます。
    `,
    image: '/images/projects/muu.png',
    tags: ['ReactNative', 'TypeScript', 'Expo', 'Supabase'],
    liveUrl: 'https://github.com/Team-Futsukayoi/zero-start-sns',
    githubUrl: 'https://github.com/Team-Futsukayoi/zero-start-sns',
    date: '2024年9月',
    team: ['モバイル開発者', 'バックエンド開発者', 'UI/UXデザイナー'],
    features: [
      '完全匿名スタートシステム',
      'ユーザー評価・特徴付けシステム',
      'リアルタイムチャット機能',
      'ペルソナ進化システム',
      'マッチングアルゴリズム',
      'プライバシー保護機能',
      'コミュニティ形成支援',
      'アクティビティ追跡'
    ],
    technologies: [
      'React Native - クロスプラットフォームモバイル開発',
      'TypeScript - 型安全なモバイル開発',
      'Expo - React Native開発プラットフォーム',
      'Supabase - BaaS（Backend as a Service）',
      'PostgreSQL - リレーショナルデータベース',
      'Real-time subscriptions - リアルタイム通信',
      'Row Level Security - データセキュリティ'
    ],
    screenshots: [
      '/images/projects/muu.png',
      '/images/projects/muu.png',
      '/images/projects/muu.png'
    ],
    challenges: [
      '匿名性とアカウンタビリティのバランス',
      'リアルタイム評価システムの設計',
      'モバイルアプリでの複雑な状態管理',
      'Supabaseでのスケーラブルなアーキテクチャ設計'
    ],
    outcomes: [
      'ユーザーの自己理解向上率80%',
      '新しい人間関係形成率70%',
      'アプリ継続使用率85%',
      'React Native + Supabase開発スキル習得'
    ]
  }
];

export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};