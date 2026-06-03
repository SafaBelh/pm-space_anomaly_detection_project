import { useState, useEffect } from "react";
import {
  LayoutList, LayoutGrid, CalendarDays, FileText,
  ChevronRight, ChevronDown, X, Search, Moon, Sun,
  AlertTriangle, Zap, TrendingUp, Shield, Database,
  Code2, TestTube2, Rocket, BookOpen, Server,
  ExternalLink, Check, Circle, Clock, ArrowLeft,
  BarChart3, Users, Activity, Target, Layers,
  PanelLeftClose, PanelLeftOpen, Menu, Download,
  FileBadge, Cpu, Globe, Link2, Plug, GitBranch,
  ScanLine, LineChart, BellRing, Wallet, LayoutDashboard,
  Split, MonitorSmartphone, FlaskConical, PackageSearch,
  Bug, Lock, Gauge, Container, Workflow, ScrollText,
  CloudCog, CheckSquare, Square, ChevronLeft, Sparkles
} from "lucide-react";

const FUNCTIONS = [
  {
    id: 0, label: "F-0", name: "Mise en place de l'environnement", who: "",
    status: "in-progress", progress: 60, color: "#14B8A6", Icon: Server,
    subfunctions: [
      { id: "0.1", name: "Installer Java 25 & Spring Boot", status: "done", stories: [
        { id: "US-0.1.1", text: "Utiliser Java 25 pour de meilleures performances", endpoint: "java -version → 21" },
        { id: "US-0.1.2", text: "Backend démarre simplement avec Maven", endpoint: "mvn spring-boot:run" },
      ], tasks: [
        { id: "t1", text: "Installer JDK 25 (Eclipse Temurin ou Oracle)", done: false },
        { id: "t2", text: "Installer Maven 3.9+", done: false },
        { id: "t3", text: "Cloner le code et lancer mvn clean install", done: false },
        { id: "t4", text: "Démarrer l'application : mvn spring-boot:run", done: false },
        { id: "t5", text: "Vérifier http://localhost:8080/actuator/health", done: false },
      ]},
      { id: "0.2", name: "Installer PostgreSQL", status: "done", stories: [
        { id: "US-0.2.1", text: "Données stockées dans PostgreSQL", endpoint: "psql connection test" },
      ], tasks: [
        { id: "t6", text: "Installer PostgreSQL 16", done: false },
        { id: "t7", text: "Créer un utilisateur anomaly_user", done: false },
        { id: "t8", text: "Créer la base anomaly_db", done: false },
        { id: "t9", text: "Tester la connexion avec psql", done: false },
      ]},
      { id: "0.3", name: "Installer Python 3.9+", status: "todo", stories: [
        { id: "US-0.3.1", text: "Calculs statistiques faits par Python", endpoint: "python scripts/compute_series.py --help" },
      ], tasks: [
        { id: "t10", text: "Installer Python 3.11", done: false },
        { id: "t11", text: "Créer un environnement virtuel venv", done: false },
        { id: "t12", text: "Installer les dépendances : pip install -r requirements.txt", done: false },
        { id: "t13", text: "Tester : python scripts/compute_series.py --help", done: false },
      ]},
      { id: "0.4", name: "Installer Node.js pour le frontend (widgets)", status: "todo", stories: [
        { id: "US-0.4.1", text: "Interface réactive — Node.js installé", endpoint: "npm run dev" },
      ], tasks: [
        { id: "t14", text: "Installer Node.js 20 LTS", done: false },
        { id: "t15", text: "Aller dans le dossier frontend/ (à créer)", done: false },
        { id: "t16", text: "Lancer npm install", done: false },
        { id: "t17", text: "Lancer npm run dev", done: false },
      ]},
      { id: "0.5", name: "Configurer les variables d'environnement", status: "todo", tasks: [
        { id: "t18", text: "Créer fichier .env avec ADMIN_PASSWORD, JWT_SECRET, ENCRYPTION_KEY", done: false },
        { id: "t19", text: "Ajouter DB_URL, DB_USERNAME, DB_PASSWORD", done: false },
      ]},
    ]
  },
  {
    id: 1, label: "F-1", name: "Gestion des Clients (Multi-tenancy)", who: "Backend",
    status: "done", progress: 99, color: "#D94F3D", Icon: Users,
    subfunctions: [
      { id: "1.1", name: "Créer & gérer les comptes clients", status: "done", stories: [
        { id: "US-1.1.1", text: "En tant que client, un administrateur crée mon entreprise dans le système", endpoint: "POST /admin/tenants" },
        { id: "US-1.1.2", text: "En tant que client, mes données sont complètement séparées", endpoint: "— isolation" },
        { id: "US-1.1.3", text: "En tant que client, je peux supprimer mon compte et toutes mes données", endpoint: "DELETE /admin/tenants/{id}" },
      ], tasks: [
        { id: "t20", text: "Tester : créer client A et client B", done: false },
        { id: "t21", text: "Tester : client A crée une facture → client B ne la voit pas", done: false },
        { id: "t22", text: "Tester : supprimer client A → plus aucune donnée de A dans la base", done: false },
        { id: "t23", text: "Test réel client 1 : Créer un compte, se connecter, vérifier isolation", done: false },
        { id: "t24", text: "Test réel client 2 : Vérifier qu'il ne voit pas les données du Client 1", done: false },
        { id: "t25", text: "Test réel client 3 : Supprimer Client 3 et vérifier la base", done: false },
      ]},
    ]
  },
  {
    id: 2, label: "F-2", name: "Connexion & Sécurité", who: "Sécurité",
    status: "done", progress: 99, color: "#8B5CF6", Icon: Lock,
    subfunctions: [
      { id: "2.1", name: "Connexion classique (mot de passe)", status: "done", stories: [
        { id: "US-2.1.1", text: "En tant que client, je veux me connecter avec identifiant et mot de passe", endpoint: "POST /auth/login" },
        { id: "US-2.1.2", text: "En tant que client, les employés n'accèdent pas aux fonctions admin", endpoint: "— middleware rôles" },
      ], tasks: [
        { id: "t26", text: "Tester : connexion Client 1 → jeton reçu", done: false },
        { id: "t27", text: "Tester : mauvais mot de passe → 401", done: false },
        { id: "t28", text: "Tester : client tente d'appeler /admin/tenants → 403", done: false },
      ]},
      { id: "2.2", name: "Connexion depuis l'ERP (iframe)", status: "in-progress", stories: [
        { id: "US-2.2.1", text: "En tant que client ERP, les utilisateurs ne se reconnectent pas", endpoint: "POST /auth/embed" },
        { id: "US-2.2.2", text: "En tant que client, les utilisateurs ERP ne voient que leurs données", endpoint: "— filter connector_id" },
      ], tasks: [
        { id: "t29", text: "Tester : simuler un jeton ERP signé RSA → jeton interne OK", done: false },
        { id: "t30", text: "Tester : session ERP → liste des alertes filtrées", done: false },
        { id: "t31", text: "Test réel client 1 : Intégrer l'iframe dans l'ERP Ask&Go, vérifier les données", done: false },
      ]},
    ]
  },
  {
    id: 3, label: "F-3", name: "Connecteurs ERP", who: "Backend",
    status: "done", progress: 99, color: "#F97316", Icon: Plug,
    subfunctions: [
      { id: "3.1", name: "Déclarer les ERP disponibles", status: "done", stories: [
        { id: "US-3.1.1", text: "En tant qu'admin moteur, ajouter un nouveau type d'ERP (Sage, Ciel, EBP)", endpoint: "POST /admin/connectors" },
        { id: "US-3.1.2", text: "En tant qu'admin moteur, ne pas supprimer un connecteur encore utilisé", endpoint: "DELETE → 409" },
      ], tasks: [
        { id: "t32", text: "Tester : créer connecteur Ask&Go, Sage, Ciel", done: false },
        { id: "t33", text: "Tester : supprimer Ask&Go alors que Client 1 l'utilise → 409", done: false },
        { id: "t34", text: "Test réel client 1,2,3 : Associer chaque client à un connecteur différent", done: false },
      ]},
      { id: "3.2", name: "Lier un client à un ERP", status: "done", stories: [
        { id: "US-3.2.1", text: "En tant que client, lier mon compte moteur à mon ERP", endpoint: "POST /tenants/{id}/erp-connections" },
      ], tasks: [
        { id: "t35", text: "Tester : lier Client 1 à Ask&Go avec external_id = SAGE001", done: false },
        { id: "t36", text: "Tester : doublon → 409", done: false },
        { id: "t37", text: "Test réel : Vérifier que le lien permet l'authentification embed", done: false },
      ]},
    ]
  },
  {
    id: 4, label: "F-4", name: "Pipelines d'importation", who: "Backend",
    status: "done", progress: 99, color: "#3B82F6", Icon: GitBranch,
    subfunctions: [
      { id: "4.1", name: "Créer un pipeline", status: "done", stories: [
        { id: "US-4.1.1", text: "En tant que client, créer un pipeline pour importer mes factures", endpoint: "POST /pipelines" },
        { id: "US-4.1.2", text: "En tant que client, tester ma connexion JDBC avant de valider", endpoint: "POST /pipelines/preview-jdbc" },
        { id: "US-4.1.3", text: "En tant que client, importer un CSV et voir un aperçu", endpoint: "POST /pipelines/preview-csv" },
      ], tasks: [
        { id: "t38", text: "Tester : créer pipeline JDBC pour Client 1", done: false },
        { id: "t39", text: "Test réel client 1 (CSV) : Uploader un fichier CSV de factures réelles → vérifier les colonnes", done: false },
        { id: "t40", text: "Test réel client 2 (JDBC) : Preview sur la base de données du client 2", done: false },
        { id: "t41", text: "Test réel client 3 (CSV) : Importer un CSV avec montants en format européen (1.000,50)", done: false },
      ]},
      { id: "4.2", name: "Mapping des champs & exécution automatique", status: "done", stories: [
        { id: "US-4.2.1", text: "En tant que client, choisir quelle colonne correspond au fournisseur, montant, date", endpoint: "PUT /pipelines/{id}/mapping" },
      ], tasks: [
        { id: "t42", text: "Tester : mapper fournisseur, montant, date → exécution déclenchée", done: false },
        { id: "t43", text: "Test réel client 1 : Mapper un fichier CSV réel et lancer l'import", done: false },
        { id: "t44", text: "Test réel client 2 : Mapper une requête JDBC réelle (jointures)", done: false },
      ]},
      { id: "4.3", name: "Gestion des statuts (REÇU / COMPTABILISÉ)", status: "done", stories: [
        { id: "US-4.3.1", text: "En tant que client, les factures provisoires (REÇU) ne faussent pas mes statistiques", endpoint: "— isFinal=false" },
        { id: "US-4.3.2", text: "En tant que client, une facture COMPTABILISÉ remplace la provisoire", endpoint: "— transition" },
      ], tasks: [
        { id: "t45", text: "Tester : importer une facture REÇU puis la même en COMPTABILISÉ → mise à jour", done: false },
        { id: "t46", text: "Test réel client 1 : Importer 100 factures REÇU, puis les définitives, vérifier les séries", done: false },
      ]},
      { id: "4.4", name: "Planification des imports", status: "done", stories: [
        { id: "US-4.4.1", text: "En tant que client, l'import s'exécute automatiquement (CRON)", endpoint: "CRON schedule" },
        { id: "US-4.4.2", text: "En tant que client, le système vérifie toutes les X minutes (POLLING)", endpoint: "POLLING mode" },
      ], tasks: [
        { id: "t47", text: "Tester : planification CRON 0 2 * * * (2h du matin)", done: false },
        { id: "t48", text: "Test réel client 1 : Polling toutes les 30 minutes sur une API ERP", done: false },
      ]},
    ]
  },
  {
    id: 5, label: "F-5", name: "Calculs statistiques (Python)", who: "Data Science",
    status: "done", progress: 99, color: "#EC4899", Icon: LineChart,
    subfunctions: [
      { id: "5.1", name: "Calcul des séries (moyennes, écarts-types)", status: "done", stories: [
        { id: "US-5.1.1", text: "En tant que client, le système détecte automatiquement la saisonnalité", endpoint: "— compute_series.py" },
      ], tasks: [
        { id: "t49", text: "Tester : données uniformes sur 12 mois → non saisonnier", done: false },
        { id: "t50", text: "Tester : données avec été haut, hiver bas → saisonnier", done: false },
        { id: "t51", text: "Test réel client 1 : Vérifier la saisonnalité sur 3 ans de vraies factures", done: false },
      ]},
      { id: "5.2", name: "Détection d'anomalies (montants suspects)", status: "done", stories: [
        { id: "US-5.2.1", text: "En tant que client, être alerté quand un montant dépasse anormalement la moyenne", endpoint: "— detect.py score 0-100" },
      ], tasks: [
        { id: "t52", text: "Tester : montant 110, moyenne 100, tolérance 10% → alerte si score > 60", done: false },
        { id: "t53", text: "Test réel client 1 : Introduire une facture volontairement élevée, vérifier l'alerte", done: false },
        { id: "t54", text: "Test réel client 2 : Même test avec données réelles d'un autre secteur", done: false },
      ]},
      { id: "5.3", name: "Détection des factures manquantes", status: "done", stories: [
        { id: "US-5.3.1", text: "En tant que client, être prévenu si une facture attendue n'est pas arrivée à temps", endpoint: "— missing.py MISSING alert" },
      ], tasks: [
        { id: "t55", text: "Tester : série avec facture tous les 30 jours → alerte si +10 jours de retard", done: false },
        { id: "t56", text: "Test réel client 3 : Simuler un manque de facture et vérifier l'alerte", done: false },
      ]},
    ]
  },
  {
    id: 6, label: "F-6", name: "Alertes & décisions", who: "Backend + Frontend",
    status: "in-progress", progress: 85, color: "#F59E0B", Icon: BellRing,
    subfunctions: [
      { id: "6.1", name: "Visualisation des alertes", status: "done", stories: [
        { id: "US-6.1.1", text: "En tant que client, voir toutes les alertes en attente", endpoint: "GET /alerts?status=PENDING" },
        { id: "US-6.1.2", text: "En tant que client, filtrer par type (montant suspect, facture manquante)", endpoint: "?type=AMOUNT&startDate=..." },
      ], tasks: [
        { id: "t57", text: "Tester : créer alerte de montant et alerte manquante → filtres OK", done: false },
        { id: "t58", text: "Test réel client 1 : Accéder à la liste des alertes via l'interface", done: false },
      ]},
      { id: "6.2", name: "Traitement des alertes", status: "in-progress", stories: [
        { id: "US-6.2.1", text: "En tant que client, confirmer une anomalie vraie → facture ignorée des calculs", endpoint: "POST /feedback/{alertId} CONFIRMED" },
        { id: "US-6.2.2", text: "En tant que client, rejeter un faux positif → système ajuste la tolérance", endpoint: "REJECTED → tolerance max 200%" },
      ], tasks: [
        { id: "t59", text: "Tester : confirmer alerte → facture ignorée", done: false },
        { id: "t60", text: "Tester : rejeter alerte → tolérance passe de 10% à 15%", done: false },
        { id: "t61", text: "Test réel client 1 : Rejeter une alerte sur une facture normale, vérifier qu'elle ne réapparaît plus", done: false },
      ]},
    ]
  },
  {
    id: 7, label: "F-7", name: "Budget & prévisions", who: "Backend",
    status: "done", progress: 99, color: "#22C55E", Icon: Wallet,
    subfunctions: [
      { id: "7.1", name: "Budget implicite (basé sur l'historique)", status: "done", stories: [
        { id: "US-7.1.1", text: "En tant que client, le budget annuel est calculé automatiquement (3 dernières années)", endpoint: "GET /budget/{year}" },
        { id: "US-7.1.2", text: "En tant que client, voir la répartition mensuelle de mon budget", endpoint: "— pattern saisonnier" },
      ], tasks: [
        { id: "t62", text: "Tester : 3 ans [100k, 120k, 90k] → budget 103.3k", done: false },
        { id: "t63", text: "Test réel client 1 : Vérifier que le budget calculé correspond à sa réalité", done: false },
        { id: "t64", text: "Test réel client 2 : Comparer avec ses prévisions internes", done: false },
      ]},
      { id: "7.2", name: "Simulations & alertes budgétaires", status: "done", stories: [
        { id: "US-7.2.1", text: "En tant que client, tester un autre budget annuel (simulation non persistée)", endpoint: "POST /budget/simulate" },
        { id: "US-7.2.2", text: "En tant que client, être alerté si je dépasse mon budget mensuel/annuel", endpoint: "BUDGET_MONTHLY_OVERRUN" },
      ], tasks: [
        { id: "t65", text: "Tester : simulation 60k → répartition affichée", done: false },
        { id: "t66", text: "Test réel client 3 : Dépasser volontairement le budget et vérifier l'alerte", done: false },
      ]},
    ]
  },
  {
    id: 8, label: "F-8", name: "Tableau de bord admin", who: "Backend + Frontend",
    status: "done", progress: 99, color: "#14B8A6", Icon: LayoutDashboard,
    subfunctions: [
      { id: "8.1", name: "Stats globales", status: "done", stories: [
        { id: "US-8.1.1", text: "En tant qu'admin moteur, voir des chiffres globaux (clients, pipelines, alertes)", endpoint: "GET /admin/stats" },
        { id: "US-8.1.2", text: "En tant qu'admin moteur, voir les mêmes indicateurs par client", endpoint: "GET /admin/stats/tenant/{id}" },
      ], tasks: [
        { id: "t67", text: "Tester stats globales après avoir créé 3 clients", done: false },
        { id: "t68", text: "Test réel : Vérifier que le client 1 ne voit que ses propres stats → 403 sur /admin", done: false },
      ]},
    ]
  },
  {
    id: 9, label: "F-9", name: "Fractionnement des paiements", who: "Backend + Data Science",
    status: "todo", progress: 0, color: "#D94F3D", Icon: Split,
    subfunctions: [
      { id: "9.1", name: "Détection & regroupement des tranches", status: "todo", sfTag: "proposition", stories: [
        { id: "US-9.1.1", text: "En tant que client, les acomptes d'une même facture ne déclenchent pas de fausses alertes", endpoint: "— InstallmentDetector" },
      ], tasks: [
        { id: "t69", text: "Créer la table ai_invoice_installments", done: false, tag: "proposition" },
        { id: "t70", text: "Coder InstallmentDetector (même fournisseur + libellé + dates proches)", done: false, tag: "proposition" },
        { id: "t71", text: "Modifier detect.py pour scorer le total agrégé", done: false, tag: "proposition" },
        { id: "t72", text: "Test réel client 1 : Importer 3 tranches (3000, 3000, 4000) → une seule alerte si total anormal", done: false, tag: "proposition" },
      ]},
      { id: "9.2", name: "Cycle de vie des tranches", status: "todo", sfTag: "proposition", stories: [
        { id: "US-9.2.1", text: "En tant que client, le scoring n'a lieu que lorsque toutes les tranches sont arrivées", endpoint: "— lifecycle" },
      ], tasks: [
        { id: "t73", text: "Tester : 1ère tranche arrive → stockée, pas de scoring", done: false, tag: "proposition" },
        { id: "t74", text: "Tester : dernière tranche arrive → scoring lancé", done: false, tag: "proposition" },
        { id: "t75", text: "Test réel client 2 : Cas d'une facture payée en 3 mensualités", done: false, tag: "proposition" },
      ]},
    ]
  },
  {
    id: 10, label: "F-10", name: "Widgets ERP externes", who: "Frontend + Backend",
    status: "todo", progress: 0, color: "#8B5CF6", Icon: MonitorSmartphone,
    subfunctions: [
      { id: "10.1", name: "Widget liste des alertes", status: "todo", sfTag: "proposition", stories: [
        { id: "US-10.1.1", text: "En tant que client ERP, afficher la liste des alertes dans mon propre écran", endpoint: "React UMD widget" },
      ], tasks: [
        { id: "t76", text: "Créer le composant AlertListWidget", done: false, tag: "proposition" },
        { id: "t77", text: "Le packager en UMD/ESM", done: false, tag: "proposition" },
        { id: "t78", text: "Test réel client 1 : Intégration dans Ask&Go via iframe", done: false, tag: "proposition" },
      ]},
      { id: "10.2", name: "Widget feedback (traiter une alerte)", status: "todo", sfTag: "proposition", stories: [
        { id: "US-10.2.1", text: "En tant que client, confirmer/rejeter une alerte directement depuis l'ERP", endpoint: "POST /feedback/{alertId}" },
      ], tasks: [
        { id: "t79", text: "Créer AlertFeedbackWidget + mini graphique Recharts", done: false, tag: "proposition" },
        { id: "t80", text: "Appel API POST /feedback/{alertId}", done: false, tag: "proposition" },
      ]},
      { id: "10.3", name: "Widget budget", status: "todo", sfTag: "proposition", stories: [
        { id: "US-10.3.1", text: "En tant que client, voir mon budget prévisionnel dans l'ERP", endpoint: "GET /budget/{year}" },
        { id: "US-10.3.2", text: "En tant que client, simuler un budget différent depuis l'ERP", endpoint: "POST /budget/simulate" },
      ], tasks: [
        { id: "t81", text: "Créer BudgetTrackerWidget : barres prévu vs réel", done: false, tag: "proposition" },
        { id: "t82", text: "Couleurs : vert/orange/rouge selon dépassement", done: false, tag: "proposition" },
      ]},
      { id: "10.4", name: "Backend pour les widgets", status: "todo", sfTag: "proposition", stories: [
        { id: "US-10.4.1", text: "En tant que système, gérer CORS par connecteur", endpoint: "— CORS dynamic" },
        { id: "US-10.4.2", text: "En tant que système, fournir une config de thème par connecteur", endpoint: "GET /widgets/config" },
      ], tasks: [
        { id: "t83", text: "Ajouter colonne allowed_origins dans ai_erp_connectors", done: false, tag: "proposition" },
        { id: "t84", text: "Créer table ai_widget_configs", done: false, tag: "proposition" },
        { id: "t85", text: "Test réel client 1,2,3 : Vérifier que chaque ERP a sa propre configuration", done: false, tag: "proposition" },
      ]},
    ]
  },
  {
    id: 11, label: "F-11", name: "Migration Frontend (Statique → React)", who: "Frontend",
    status: "todo", progress: 0, color: "#EC4899", Icon: Code2,
    subfunctions: [
      { id: "11.1", name: "Pages d'authentification", status: "todo", stories: [
        { id: "US-11.1.1", text: "En tant que client, se connecter via une page moderne et réactive", endpoint: "/login React" },
      ], tasks: [
        { id: "t86", text: "Créer le projet React avec Vite", done: false },
        { id: "t87", text: "Mettre en place React Router (/login, /admin, /pipelines, /alerts, /budget)", done: false },
        { id: "t88", text: "Intégrer Axios + intercepteur JWT", done: false },
      ]},
      { id: "11.2", name: "Dashboard admin dynamique", status: "todo", stories: [
        { id: "US-11.2.1", text: "En tant qu'admin, voir des graphiques interactifs (clients, tendances)", endpoint: "Recharts dashboard" },
      ], tasks: [
        { id: "t89", text: "Migrer la page admin vers React avec Recharts", done: false },
      ]},
      { id: "11.3", name: "Gestion des pipelines dynamique", status: "todo", stories: [
        { id: "US-11.3.1", text: "En tant que client, configurer un pipeline sans recharger la page", endpoint: "Wizard pas à pas React" },
      ], tasks: [
        { id: "t90", text: "Créer wizard pipeline en React (step by step)", done: false },
      ]},
      { id: "11.4", name: "Liste des alertes dynamique", status: "todo", stories: [
        { id: "US-11.4.1", text: "En tant que client, filtrer les alertes instantanément (sans rafraîchissement)", endpoint: "Filtres en temps réel" },
      ], tasks: [
        { id: "t91", text: "Migrer la page alertes vers React avec filtres temps réel", done: false },
        { id: "t92", text: "Test réel client 1,2,3 : Parcours complet de l'application dynamique", done: false },
      ]},
    ]
  },
  {
    id: 12, label: "F-12", name: "Tests complets (données réelles)", who: "QA",
    status: "todo", progress: 5, color: "#F97316", Icon: FlaskConical,
    subfunctions: [
      { id: "12.1", name: "Tests unitaires", status: "todo", tasks: [
        { id: "t93", text: "Configurer JaCoCo (80% lignes, 70% branches)", done: false },
        { id: "t94", text: "Tester les services principaux (Admin, Auth, Pipeline, Alert, Budget, Detection)", done: false },
      ]},
      { id: "12.2", name: "Tests d'intégration avec données réelles (PostgreSQL)", status: "todo", stories: [
        { id: "US-12.2.1", text: "En tant que client, le système fonctionne avec mes vraies données (CSV)", endpoint: "CSV client 1" },
        { id: "US-12.2.2", text: "En tant que client, le système se connecte à ma base JDBC réelle", endpoint: "JDBC client 2" },
        { id: "US-12.2.3", text: "En tant que client, les alertes sont justes sur mes données historiques", endpoint: "3 ans client 3" },
      ], tasks: [
        { id: "t95", text: "Client 1 : Fournir 5 fichiers CSV de factures réelles, importer, vérifier séries et alertes", done: false },
        { id: "t96", text: "Client 2 : Accès JDBC base de test, preview, importer 1000 factures, comparer résultats", done: false },
        { id: "t97", text: "Client 3 : Export 3 ans de factures, pipeline historique, vérifier saisonnalité et budget", done: false },
      ]},
      { id: "12.3", name: "Tests de sécurité", status: "todo", tasks: [
        { id: "t98", text: "Scan OWASP ZAP sur l'API", done: false },
        { id: "t99", text: "Tester injection SQL sur tous les endpoints", done: false },
        { id: "t100", text: "Tester cross-tenant (Client 1 accède aux données Client 2)", done: false },
        { id: "t101", text: "Tester JWT avec algorithme none → rejeté", done: false },
      ]},
      { id: "12.4", name: "Tests de performance & charge", status: "todo", tasks: [
        { id: "t102", text: "JMeter : 10 000 appels /alerts en moins de 500ms", done: false },
        { id: "t103", text: "Import CSV 50 000 lignes en moins de 5 minutes", done: false },
        { id: "t104", text: "100 connexions simultanées /auth/login", done: false },
      ]},
    ]
  },
  {
    id: 13, label: "F-13", name: "Documentation", who: "",
    status: "in-progress", progress: 30, color: "#22C55E", Icon: BookOpen,
    subfunctions: [
      { id: "13.1", name: "Documentation API", status: "in-progress", stories: [
        { id: "US-13.1.1", text: "En tant que client, un guide pour intégrer les widgets dans son ERP", endpoint: "WIDGET_INTEGRATION.md" },
        { id: "US-13.1.2", text: "En tant que client, une documentation API claire", endpoint: "/swagger-ui.html" },
      ], tasks: [
        { id: "t105", text: "Rédiger DEPLOYMENT.md (installation sans Docker)", done: false },
        { id: "t106", text: "Rédiger TROUBLESHOOTING.md", done: false },
        { id: "t107", text: "Rédiger WIDGET_INTEGRATION.md", done: false },
        { id: "t108", text: "Finaliser Swagger avec tous les exemples", done: false },
      ]},
    ]
  },
];

const DOCS = [
  {
    id: "doc1",
    type: "pdf",
    title: "Analyse Pipeline — EAU_SAISON",
    subtitle: "18 factures · Cycle semestriel 150/300 EUR · Juin 2026",
    description: "Document technique d'analyse du pipeline d'importation et des comportements attendus. Couvre : normalisation, détection de doublons, scoring Python, budget implicite, alertes et feedback.",
    sections: [
      { title: "Données d'entrée", content: "18 factures EAU_SAISON · Pattern semestriel 150 EUR (fév, avr, oct, déc) / 300 EUR (juin, août). Toutes COMPTABILISÉ." },
      { title: "Pipeline d'importation", content: "18 lignes normalisées · 1 série créée (EAU_SAISON + Eau potable) · 0 anomalie initiale · use_seasonality=true (ratio=0 < 0.7)" },
      { title: "Résultats Python", content: "n=18 · mu=200.0 · sigma≈86.6 · cv≈0.433 · monthly_mu={2:150, 4:150, 6:300, 8:300, 10:150, 12:150} · high_cv=true" },
      { title: "Budget implicite 2026", content: "Budget = 1200 EUR/an · Répartition saisonnière : 150 EUR (fév,avr,oct,déc) / 300 EUR (juin,août) · scaling=1.0" },
      { title: "Alerte — Facture 500 EUR", content: "Montant 500 EUR vs max_acceptable 165 EUR → score=100 → CRITIQUE · AMOUNT alert créée" },
      { title: "Feedback REJECTED", content: "tolerance_pct : 10% → 200% (plafonné) · Facture reste active dans les calculs" },
      { title: "Feedback CONFIRMED", content: "Facture exclue (ignored=true) · ignoreReason=CONFIRMED_ANOMALY · tolerance inchangée" },
      { title: "Document manquant", content: "nextExpected = 2027-02-01 · deadline = 2027-02-11 · Alerte MISSING score=100 si today > deadline" },
    ],
    color: "#3B82F6",
    Icon: ScanLine,
    filename: "doc-technique-analyse.pdf",
  },
  {
    id: "doc2",
    type: "pdf",
    title: "Pipeline JDBC — Ask&Go Multi-tables",
    subtitle: "companies × invoices × invoice_lines × payments · Juin 2026",
    description: "Document technique sur le pipeline JDBC avec jointures, nettoyage et détection d'anomalies depuis l'ERP Ask&Go. Schéma 4 tables, comportements de filtrage et transition provisionnel→définitif.",
    sections: [
      { title: "Schéma ERP Ask&Go", content: "4 tables : companies · invoices · invoice_lines · payments · Jointures INNER JOIN · PreparedStatement (anti-injection)" },
      { title: "Données d'exemple", content: "7 sociétés dont C006 (nom NULL → rejeté) et C007 (autre tenant → filtré SQL) · Anomalies injectées intentionnellement" },
      { title: "Configuration Pipeline", content: "JDBC PostgreSQL · 3 tables jointes · fieldMapping : supplier=c.name, amount=l.amount · conditions : tenant_code, doc_type=FACTURE, currency=EUR, amount>0" },
      { title: "Requête SQL générée", content: "PreparedStatement avec 6 paramètres · Filtres : tenant, doc_type, currency, is_active, amount>0, status IN (REÇU, COMPTABILISÉ)" },
      { title: "Résultats import", content: "36 lignes extraites · 4 filtrées SQL · 2 rejetées normalisation (supplier null, label null) · 34 valides · Transition INV-003 provisionnel → définitif" },
      { title: "Séries créées", content: "S001 EAU_SAISON : n=24, mu=120, cv=0 (non saisonnier) · S002 ELEC_HEBDO : n=2 · S003 INTERNET_FIBRE : n=1" },
      { title: "Anomalie AMOUNT", content: "Facture 500 EUR vs max_acceptable 132 EUR → score=100 → CRITIQUE · explanation : Montant 500 dépasse la limite 132" },
      { title: "Anomalie MISSING", content: "lastValidatedDate=2026-02-15 · nextExpected=2026-03-17 · deadline=2026-03-27 · today=2026-03-30 > deadline → MISSING alert" },
    ],
    color: "#F97316",
    Icon: Database,
    filename: "doc-technique-jdbc.pdf",
  },
  {
    id: "doc3",
    type: "pdf",
    title: "Moteur de Détection d'Anomalies Budgétaires",
    subtitle: "Documentation Technique v4.0 · Référence complète · Juin 2026",
    description: "Document de référence complet pour les équipes techniques, testeurs, clients et intégrateurs ERP. Couvre l'architecture, le modèle de données, toutes les features (A→G), sécurité, endpoints, codes d'erreur et annexes.",
    sections: [
      { title: "Stack technique", content: "Java JDK 25 · Spring Boot 4.x · PostgreSQL 16+ · Python 3.11+ · Flyway 10.x · Nimbus JOSE JWT · Maven 3.9+" },
      { title: "Modèle de données", content: "Tables principales : ai_tenants · ai_erp_connectors · ai_tenant_erp_connections · ai_pipelines · ai_invoices · ai_series · ai_anomalies · ai_alerts · ai_feedback" },
      { title: "Features couvertes", content: "A : Organisation (tenants) · B : Connecteurs ERP · C : Pipelines d'importation · D : Auth déléguée ERP · E : Alertes & feedback · F : Budget & prévisions · G : Supervision" },
      { title: "Sécurité", content: "Isolation multi-tenant (tenant_id sur toutes les tables) · AES/GCM chiffrement · BCrypt mots de passe · PreparedStatement anti-injection SQL · RSA/ECDSA validation JWT" },
      { title: "Budget & prévisions (Feature F)", content: "Aucune persistance · Budget implicite N-1/N-2/N-3 · Simulation proportionnelle · Scoring BUDGET_MONTHLY_OVERRUN / BUDGET_ANNUAL_OVERRUN · Saisonnalité automatique" },
      { title: "Endpoints — synthèse", content: "POST /auth/login · POST /auth/embed · POST /admin/tenants · POST /admin/connectors · POST /pipelines · GET /alerts · POST /feedback/{alertId} · GET /admin/stats" },
      { title: "Variables d'environnement", content: "ADMIN_PASSWORD · JWT_SECRET (≥32 chars) · ENCRYPTION_KEY (≥16 chars) · SPRING_DATASOURCE_URL · SPRING_DATASOURCE_USERNAME · SPRING_DATASOURCE_PASSWORD" },
      { title: "Codes d'erreur", content: "400 Requête invalide · 401 Non authentifié · 403 Interdit · 404 Ressource introuvable · 409 Conflit · 500 Erreur interne" },
    ],
    color: "#8B5CF6",
    Icon: ScrollText,
    filename: "Documentation_Technique_Moteur_Anomalies_v4.pdf",
  },
  {
    id: "doc4",
    type: "md",
    title: "Documentation Technique — Système Multi-Tenant & Pipelines",
    subtitle: "Features A→G · Diagrammes Mermaid · Architecture complète",
    description: "Documentation complète avec diagrammes de séquence, flowcharts et state machines au format Mermaid. Contient les flux détaillés de chaque feature : tenants, connecteurs ERP, pipelines, auth JWT déléguée, alertes, budget et supervision.",
    sections: [
      { title: "Feature A — Organisation (Tenants)", content: "Création ISOLATED/SHARED · Suppression CASCADE · DROP DATABASE si ISOLATED · Diagrammes sequence + flowchart" },
      { title: "Feature B — Connecteurs ERP", content: "Création avec clé publique PEM · Suppression (409 si utilisé) · Exemple complet création + connexion ERP (ACME)" },
      { title: "Feature C — Pipelines d'importation", content: "Cycle de vie CRÉATION→CONFIGURATION→EXÉCUTION · Flux interne Adapter→Normalizer→Scoring→Alertes · Statuts Provisionnel→Définitif" },
      { title: "Feature D — Auth JWT déléguée", content: "Flux complet JWT signé (ERP signe, moteur vérifie) · Isolation par connector_id et external_id · Token interne 1h" },
      { title: "Feature E — Alertes et Feedback", content: "Machine à états PENDING→CONFIRMED/REJECTED/IGNORED · Impact sur les calculs (inclusion/exclusion factures)" },
      { title: "Feature F — Budget et Prévisions", content: "Philosophie aucune persistance · Flux budgétaire complet · Endpoints GET/POST · Scaling et saisonnalité" },
      { title: "Feature G — Supervision", content: "Dashboard admin · Indicateurs globaux et par tenant · Filtres drill-down" },
      { title: "Sécurité multi-tenant", content: "Architecture 2 niveaux (inter-tenant + intra-tenant par ERP) · AES-256, TLS 1.3, JWT PEM, rotation des clés, PreparedStatement" },
    ],
    color: "#22C55E",
    Icon: GitBranch,
    filename: "Documentation_Technique_Comple_te___Syste_me_Multi-Tenant___Pipelines.md",
    mdNote: "Ce fichier contient des diagrammes Mermaid. Ouvrir avec Typora, VS Code + extension Mermaid, ou tout éditeur compatible Mermaid pour visualiser les diagrammes.",
    mdEditors: ["Typora", "VS Code + Mermaid Preview", "Obsidian", "Mark Text"],
  },
];

const STATUS_META = {
  done:         { label: "Terminé",   color: "#22C55E", bg: "rgba(34,197,94,0.08)",   Icon: Check },
  "in-progress":{ label: "En cours",  color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  Icon: Clock },
  todo:         { label: "À faire",   color: "#6B7280", bg: "rgba(107,114,128,0.06)", Icon: Circle },
};

function getTotalTasks(fn) {
  return fn.subfunctions.reduce((a, s) => a + (s.tasks?.length || 0), 0);
}

function injectCSS(dark) {
  const id = "pm-css";
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const el = document.createElement("style");
  el.id = id;
  el.textContent = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:${dark?"#111214":"#F0EDE8"};
  --bg2:${dark?"#18191C":"#E8E4DE"};
  --surface:${dark?"#1C1D21":"#FFFFFF"};
  --surface2:${dark?"#212226":"#FAFAF8"};
  --border:${dark?"#2D3038":"#D5D0C8"};
  --border2:${dark?"#3D4149":"#C4BFB6"};
  --text:${dark?"#F3F4F6":"#18191C"};
  --text2:${dark?"#9CA3AF":"#525761"};
  --muted:${dark?"#6B7280":"#6B7280"};
  --accent:#D94F3D;--accent2:#E8736A;
  --accent-bg:${dark?"rgba(217,79,61,0.12)":"#FDF1F0"};
  --accent-glow:rgba(217,79,61,0.18);
  --green:#22C55E;--purple:#8B5CF6;--blue:#3B82F6;--orange:#F97316;--teal:#14B8A6;--warning:#F59E0B;
  --glass:${dark?"rgba(28,29,33,0.85)":"rgba(255,255,255,0.7)"};
  --glass-border:${dark?"rgba(61,65,73,0.6)":"rgba(255,255,255,0.9)"};
  --shadow:0 2px 20px rgba(0,0,0,${dark?0.3:0.08});
  --shadow2:0 8px 40px rgba(0,0,0,${dark?0.4:0.12});
  --mono:'IBM Plex Mono',monospace;
  --sans:'Syne',system-ui,sans-serif;
  --r:10px;
}
html,body,#root{height:100%;font-family:var(--sans)}
.app{display:flex;height:100vh;overflow:hidden;background:var(--bg)}
.sb{width:64px;min-width:64px;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;align-items:center;padding:12px 0;gap:4px;transition:width .22s cubic-bezier(.4,0,.2,1);overflow:hidden;z-index:40;box-shadow:2px 0 20px rgba(0,0,0,${dark?0.2:0.04})}
.sb.open{width:280px;min-width:280px;align-items:stretch;padding:0}
.sb-logo{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:11px;font-weight:900;color:#fff;flex-shrink:0;box-shadow:0 4px 16px var(--accent-glow);cursor:pointer;transition:transform .15s}
.sb-logo:hover{transform:scale(1.06)}
.sb.open .sb-logo{display:none}
.sb-top{padding:16px 20px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px}
.sb-brand{font-size:15px;font-weight:800;letter-spacing:-.03em;color:var(--text)}
.sb-brand span{color:var(--accent)}
.sb-brand small{display:block;font-family:var(--mono);font-size:8px;color:var(--muted);margin-top:2px;letter-spacing:.1em;font-weight:500}
.sb-toggle{width:28px;height:28px;border-radius:7px;background:var(--bg2);border:1px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--muted);margin-left:auto;flex-shrink:0;transition:all .15s}
.sb-toggle:hover{border-color:var(--accent);color:var(--accent)}
.sb-scroll{flex:1;overflow-y:auto;padding:8px 0}
.sb-icon-btn{width:40px;height:40px;border-radius:9px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--muted);transition:all .15s;flex-shrink:0}
.sb-icon-btn:hover{background:var(--accent-bg);color:var(--accent)}
.sb-icon-btn.active{background:var(--accent-bg);color:var(--accent)}
.sb-section{padding:14px 20px 6px;font-family:var(--mono);font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.16em;color:var(--border2)}
.sb-item{display:flex;align-items:center;gap:10px;padding:8px 16px;cursor:pointer;border-left:3px solid transparent;transition:all .12s;font-size:13px;color:var(--text2);position:relative}
.sb-item:hover{background:var(--accent-bg);color:var(--text);border-left-color:var(--accent-glow)}
.sb-item.sel{background:var(--accent-bg);color:var(--accent);border-left-color:var(--accent);font-weight:700}
.sb-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.sb-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px}
.main{flex:1;overflow:hidden;display:flex;flex-direction:column;min-width:0}
.topbar{height:52px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;padding:0 24px;background:var(--surface);flex-shrink:0}
.topbar-title{font-size:16px;font-weight:800;letter-spacing:-.02em;color:var(--text)}
.topbar-sep{color:var(--border2)}
.topbar-sub{font-size:13px;color:var(--muted)}
.topbar-actions{margin-left:auto;display:flex;align-items:center;gap:8px}
.tb-btn{font-family:var(--mono);font-size:10px;font-weight:700;padding:7px 14px;border-radius:7px;border:1px solid var(--border);background:var(--surface2);color:var(--muted);cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .15s;letter-spacing:.04em}
.tb-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-bg)}
.view-tabs{display:flex;gap:2px;border-bottom:1px solid var(--border);background:var(--bg2);padding:0 24px;flex-shrink:0}
.view-tab{font-family:var(--mono);font-size:10px;font-weight:700;padding:10px 18px;cursor:pointer;color:var(--muted);border-bottom:2px solid transparent;transition:all .14s;letter-spacing:.06em;text-transform:uppercase;display:flex;align-items:center;gap:7px;white-space:nowrap}
.view-tab:hover{color:var(--text)}
.view-tab.on{color:var(--accent);border-bottom-color:var(--accent)}
.content{flex:1;overflow-y:auto;padding:24px;background:var(--bg)}
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px}
.stat-card{background:var(--glass);backdrop-filter:blur(12px);border:1px solid var(--glass-border);border-radius:var(--r);padding:18px 20px;box-shadow:var(--shadow)}
.stat-label{font-family:var(--mono);font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--muted);margin-bottom:10px}
.stat-val{font-size:28px;font-weight:800;letter-spacing:-.03em;color:var(--text);line-height:1}
.stat-sub{font-family:var(--mono);font-size:10px;color:var(--muted);margin-top:6px}
.fn-list{display:flex;flex-direction:column;gap:10px}
.fn-card{background:var(--glass);backdrop-filter:blur(12px);border:1px solid var(--glass-border);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow);transition:box-shadow .15s,border-color .15s;cursor:pointer}
.fn-card:hover{box-shadow:var(--shadow2);border-color:var(--border2)}
.fn-card.expanded{border-color:var(--border2)}
.fn-header{display:flex;align-items:center;gap:12px;padding:14px 18px}
.fn-label{font-family:var(--mono);font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;letter-spacing:.06em;flex-shrink:0}
.fn-name{font-size:14px;font-weight:700;letter-spacing:-.01em;color:var(--text);flex:1}
.fn-meta{display:flex;align-items:center;gap:10px;flex-shrink:0}
.badge{display:inline-flex;align-items:center;gap:4px;font-family:var(--mono);font-size:8px;font-weight:700;padding:3px 8px;border-radius:4px;letter-spacing:.05em;border:1px solid}
.who-badge{font-family:var(--mono);font-size:9px;color:var(--muted);background:var(--bg2);border:1px solid var(--border);padding:3px 8px;border-radius:4px}
.progress-wrap{width:80px;display:flex;flex-direction:column;gap:3px;align-items:flex-end}
.progress-bar{height:4px;background:var(--bg2);border-radius:2px;width:100%;overflow:hidden;border:1px solid var(--border)}
.progress-fill{height:100%;border-radius:2px;transition:width .5s cubic-bezier(.4,0,.2,1)}
.progress-pct{font-family:var(--mono);font-size:9px;color:var(--muted)}
.fn-body{border-top:1px solid var(--border);background:var(--surface2)}
.sf-list{display:flex;flex-direction:column}
.sf-item{border-bottom:1px solid var(--border)}
.sf-item:last-child{border:none}
.sf-header{display:flex;align-items:center;gap:10px;padding:12px 24px;cursor:pointer;transition:background .12s}
.sf-header:hover{background:var(--bg2)}
.sf-id{font-family:var(--mono);font-size:9px;color:var(--muted);width:28px;flex-shrink:0}
.sf-name{font-size:13px;font-weight:600;color:var(--text);flex:1}
.sf-body{padding:0 24px 14px 62px;background:var(--bg)}
.stories-title{font-family:var(--mono);font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--muted);margin-bottom:8px;padding-top:12px}
.story-row{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:6px;border:1px solid var(--border);margin-bottom:5px;background:var(--glass);transition:border-color .12s}
.story-row:hover{border-color:var(--border2)}
.story-id{font-family:var(--mono);font-size:9px;color:var(--accent);font-weight:700;width:80px;flex-shrink:0}
.story-text{flex:1;font-size:12px;color:var(--text);line-height:1.4}
.story-ep{font-family:var(--mono);font-size:9px;color:var(--muted);flex-shrink:0;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tasks-title{font-family:var(--mono);font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--muted);margin-bottom:8px;padding-top:10px}
.task-row{display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:1px solid var(--border)}
.task-row:last-child{border:none}
.task-check{width:16px;height:16px;border-radius:4px;border:1.5px solid var(--border2);cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .15s;margin-top:2px}
.task-check.done{background:var(--green);border-color:var(--green);color:#fff}
.task-text{font-size:12px;color:var(--text2);flex:1;line-height:1.5;font-family:var(--mono)}
.task-text.done{text-decoration:line-through;color:var(--muted);opacity:0.65}
.board{display:flex;gap:16px;overflow-x:auto;padding-bottom:16px;height:100%;align-items:flex-start}
.board-col{min-width:320px;max-width:320px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);display:flex;flex-direction:column;max-height:calc(100vh - 180px)}
.board-col-hd{padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--text);flex-shrink:0}
.board-col-count{font-family:var(--mono);font-size:9px;padding:2px 7px;border-radius:8px;font-weight:700;margin-left:auto}
.board-col-body{flex:1;overflow-y:auto;padding:10px}
.board-card{background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:12px 14px;margin-bottom:8px;cursor:pointer;transition:all .15s;box-shadow:var(--shadow)}
.board-card:hover{box-shadow:var(--shadow2);transform:translateY(-1px)}
.timeline{display:flex;flex-direction:column;gap:2px}
.tl-row{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:8px;border:1px solid var(--border);background:var(--glass);transition:all .12s;cursor:pointer}
.tl-row:hover{border-color:var(--border2);box-shadow:var(--shadow)}
.tl-id{font-family:var(--mono);font-size:10px;color:var(--accent);font-weight:700;width:36px;flex-shrink:0}
.tl-name{flex:1;font-size:13px;font-weight:600;color:var(--text)}
.tl-bar-wrap{width:200px;height:8px;background:var(--bg2);border-radius:4px;overflow:hidden;border:1px solid var(--border);flex-shrink:0}
.tl-bar{height:100%;border-radius:4px;transition:width .4s}
.tl-pct{font-family:var(--mono);font-size:10px;color:var(--muted);width:36px;text-align:right;flex-shrink:0}
.detail{position:fixed;right:0;top:0;bottom:0;width:520px;background:var(--surface);border-left:1px solid var(--border);box-shadow:-8px 0 40px rgba(0,0,0,${dark?0.35:0.1});z-index:50;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s cubic-bezier(.4,0,.2,1)}
.detail.open{transform:translateX(0)}
.detail-hd{padding:18px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;flex-shrink:0}
.detail-close{width:28px;height:28px;border-radius:7px;background:var(--bg2);border:1px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--muted);margin-left:auto;transition:all .15s}
.detail-close:hover{border-color:var(--accent);color:var(--accent)}
.detail-body{flex:1;overflow-y:auto;padding:20px}
.detail-section{margin-bottom:22px}
.detail-section-title{font-family:var(--mono);font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--muted);margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid var(--border)}
.search-wrap{position:relative;flex:1;max-width:340px}
.search-inp{width:100%;font-family:var(--mono);font-size:11px;padding:7px 10px 7px 32px;background:var(--bg2);border:1px solid var(--border);border-radius:7px;color:var(--text);outline:none;transition:all .15s}
.search-inp:focus{border-color:var(--accent);background:var(--surface);box-shadow:0 0 0 3px rgba(217,79,61,0.08)}
.search-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--muted)}
.filter-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px;align-items:center}
.filter-label{font-family:var(--mono);font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--muted)}
.chip{font-family:var(--mono);font-size:9px;font-weight:700;padding:5px 12px;border-radius:20px;border:1px solid var(--border);cursor:pointer;color:var(--muted);background:var(--surface2);transition:all .15s;letter-spacing:.04em}
.chip:hover{border-color:var(--accent);color:var(--accent)}
.chip.on{background:var(--accent-bg);border-color:var(--accent-glow);color:var(--accent)}
.docs-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px}
.doc-card{background:var(--glass);backdrop-filter:blur(12px);border:1px solid var(--glass-border);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow)}
.doc-card-hd{padding:20px 22px 16px;border-bottom:1px solid var(--border)}
.doc-card-title{font-size:16px;font-weight:800;letter-spacing:-.02em;color:var(--text);margin-bottom:4px}
.doc-card-subtitle{font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.04em}
.doc-card-desc{font-size:12px;color:var(--text2);line-height:1.6;padding:14px 22px;border-bottom:1px solid var(--border)}
.doc-sections{padding:14px 22px}
.doc-section-item{padding:9px 0;border-bottom:1px solid var(--border)}
.doc-section-item:last-child{border:none}
.doc-section-name{font-family:var(--mono);font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:4px}
.doc-section-content{font-size:11px;color:var(--text2);line-height:1.5}
.doc-card-footer{padding:14px 22px;border-top:1px solid var(--border);display:flex;align-items:center;gap:10px}
.doc-pin-badge{font-family:var(--mono);font-size:8px;font-weight:700;padding:3px 8px;border-radius:4px;background:rgba(34,197,94,0.08);color:#22C55E;border:1px solid rgba(34,197,94,0.2);display:flex;align-items:center;gap:4px}
.dark-btn{width:36px;height:20px;border-radius:10px;border:none;cursor:pointer;position:relative;transition:background .25s;flex-shrink:0}
.dark-btn-thumb{position:absolute;top:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .25s;box-shadow:0 1px 4px rgba(0,0,0,.2)}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,${dark?0.55:0.25});z-index:49;backdrop-filter:blur(2px)}
.tag-badge{display:inline-flex;align-items:center;gap:3px;font-family:var(--mono);font-size:8px;font-weight:700;padding:2px 7px;border-radius:10px;letter-spacing:.04em;flex-shrink:0;white-space:nowrap}
.tag-proposition{background:rgba(139,92,246,0.1);color:#8B5CF6;border:1px solid rgba(139,92,246,0.25)}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
::-webkit-scrollbar-track{background:transparent}
  `;
  document.head.appendChild(el);
}

export default function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("ae-dark") === "1"; } catch(e) { return false; }
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFn, setSelectedFn] = useState(null);
  const [expandedFns, setExpandedFns] = useState({});
  const [expandedSfs, setExpandedSfs] = useState({});
  const [view, setView] = useState("list");
  const [tasks, setTasks] = useState(() => {
    const defaults = {};
    FUNCTIONS.forEach(fn => fn.subfunctions.forEach(sf => (sf.tasks || []).forEach(t => { defaults[t.id] = t.done; })));
    try {
      const saved = localStorage.getItem("ae-tasks-v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed };
      }
    } catch (e) {}
    return defaults;
  });
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailFn, setDetailFn] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => { injectCSS(dark); }, [dark]);

  const toggleFn = (id) => setExpandedFns(e => ({ ...e, [id]: !e[id] }));
  const toggleSf = (id) => setExpandedSfs(e => ({ ...e, [id]: !e[id] }));
  const toggleTask = (tid) => setTasks(prev => {
    const next = { ...prev, [tid]: !prev[tid] };
    try { localStorage.setItem("ae-tasks-v1", JSON.stringify(next)); } catch (e) {}
    return next;
  });
  const resetTasks = () => {
    const defaults = {};
    FUNCTIONS.forEach(fn => fn.subfunctions.forEach(sf => (sf.tasks || []).forEach(t => { defaults[t.id] = false; })));
    try { localStorage.removeItem("ae-tasks-v1"); } catch(e) {}
    setTasks(defaults);
  };
  const doneTasksCount = Object.values(tasks).filter(Boolean).length;
  const totalTasksCount = Object.keys(tasks).length;
  const openDetail = (fn, e) => { e.stopPropagation(); setDetailFn(fn); setDetailOpen(true); };

  const getFnProgress = (fn) => {
    const allTasks = fn.subfunctions.flatMap(sf => sf.tasks || []);
    if (allTasks.length === 0) return fn.progress;
    const done = allTasks.filter(t => tasks[t.id]).length;
    return Math.round((done / allTasks.length) * 100);
  };

  const getFnStatus = (fn) => {
    const progress = getFnProgress(fn);
    if (progress === 0) return "todo";
    if (progress === 100) return "done";
    return "in-progress";
  };

  const filteredFns = FUNCTIONS.filter(fn => {
    const liveStatus = getFnStatus(fn);
    if (statusFilter !== "ALL" && liveStatus !== statusFilter) return false;
    if (search && !fn.name.toLowerCase().includes(search.toLowerCase()) && !fn.label.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const doneFns = FUNCTIONS.filter(f => getFnStatus(f) === "done").length;
  const inProgFns = FUNCTIONS.filter(f => getFnStatus(f) === "in-progress").length;
  const todoFns = FUNCTIONS.filter(f => getFnStatus(f) === "todo").length;
  const totalTasks = FUNCTIONS.reduce((a, f) => a + getTotalTasks(f), 0);
  const avgCompletion = Math.round(FUNCTIONS.reduce((a, f) => a + getFnProgress(f), 0) / FUNCTIONS.length);

  const VIEWS = [
    { id: "list", label: "List", Icon: LayoutList },
    { id: "board", label: "Board", Icon: LayoutGrid },
    { id: "timeline", label: "Timeline", Icon: CalendarDays },
    { id: "docs", label: "Docs", Icon: FileText },
  ];

  return (
    <div className="app">
      <aside className={`sb${sidebarOpen ? " open" : ""}`}>
        {!sidebarOpen ? (
          <>
            <div className="sb-logo" onClick={() => setSidebarOpen(true)}>AE</div>
            <div style={{ height: 8 }} />
            {VIEWS.map(v => (
              <div key={v.id} className={`sb-icon-btn${view === v.id ? " active" : ""}`} onClick={() => setView(v.id)} title={v.label}>
                <v.Icon size={18} />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="sb-top">
              <div className="sb-logo" style={{ cursor: "default" }}>AE</div>
              <div className="sb-brand">Anomaly<span>Engine</span><small>v3.0 · PROJECT BOARD</small></div>
              <button className="sb-toggle" onClick={() => setSidebarOpen(false)}>
                <ChevronLeft size={14} />
              </button>
            </div>
            <div className="sb-scroll">
              <div className="sb-section">Views</div>
              {VIEWS.map(v => (
                <div key={v.id} className={`sb-item${view === v.id ? " sel" : ""}`} onClick={() => setView(v.id)}>
                  <v.Icon size={14} />
                  <span className="sb-name">{v.label}</span>
                  {v.id === "docs" && (
                    <span style={{ fontFamily: "var(--mono)", fontSize: 8, background: "rgba(34,197,94,0.12)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.2)", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>3 PDF · 1 MD</span>
                  )}
                </div>
              ))}
              <div className="sb-section" style={{ marginTop: 12 }}>Functions</div>
              {FUNCTIONS.map(fn => {
                const sm = STATUS_META[getFnStatus(fn)];
                return (
                  <div key={fn.id} className={`sb-item${selectedFn === fn.id ? " sel" : ""}`}
                    onClick={() => { setSelectedFn(fn.id === selectedFn ? null : fn.id); setView("list"); }}>
                    <div className="sb-dot" style={{ background: fn.color }} />
                    <span className="sb-name">{fn.label} {fn.name}</span>
                    <sm.Icon size={10} color={sm.color} />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </aside>

      <div className="main">
        <div className="topbar">
          {!sidebarOpen && (
            <button className="tb-btn" onClick={() => setSidebarOpen(true)} style={{ padding: "7px 10px" }}>
              <Menu size={14} />
            </button>
          )}
          <span className="topbar-title">AnomalyEngine</span>
          <span className="topbar-sep">/</span>
          <span className="topbar-sub">Project Board</span>
          <div className="topbar-actions">
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: "var(--bg2)", borderRadius: 7, border: "1px solid var(--border)" }}>
              <CheckSquare size={11} color="var(--green)" />
              <span style={{ color: "var(--text)", fontWeight: 700 }}>{doneTasksCount}</span>
              <span>/</span>
              <span>{totalTasksCount}</span>
              <span style={{ color: "var(--muted)" }}>tâches</span>
            </div>
            <button className="tb-btn" onClick={resetTasks} title="Remettre toutes les tâches à zéro" style={{ padding: "5px 10px", fontSize: 9 }}>
              <Square size={11} /> Reset
            </button>
            <div className="search-wrap">
              <Search size={12} className="search-icon" />
              <input className="search-inp" placeholder="Search functions..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="dark-btn" onClick={() => setDark(d => { const n = !d; try { localStorage.setItem("ae-dark", n?"1":"0"); } catch(e){} return n; })} style={{ background: dark ? "#D94F3D" : "#D5D0C8" }}>
              <div className="dark-btn-thumb" style={{ left: dark ? "18px" : "2px" }} />
            </button>
            <span style={{ color: "var(--muted)" }}>{dark ? <Moon size={14} /> : <Sun size={14} />}</span>
          </div>
        </div>

        <div className="view-tabs">
          {VIEWS.map(v => (
            <div key={v.id} className={`view-tab${view === v.id ? " on" : ""}`} onClick={() => setView(v.id)}>
              <v.Icon size={12} />
              {v.label}
              {v.id === "docs" && (
                <span style={{ fontFamily: "var(--mono)", fontSize: 8, background: "rgba(34,197,94,0.1)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.25)", padding: "1px 5px", borderRadius: 3, fontWeight: 700 }}>PIN</span>
              )}
            </div>
          ))}
        </div>

        <div className="content">
          {view === "docs" && (
            <>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <FileBadge size={18} color="var(--accent)" />
                  <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", color: "var(--text)" }}>Documents Techniques</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 8, background: "rgba(34,197,94,0.1)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.25)", padding: "3px 8px", borderRadius: 4, fontWeight: 700 }}>3 PDF · 1 MD · TOUJOURS ATTACHÉS</span>
                </div>
                <p style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)" }}>Documents de référence permanents — analyses pipelines, documentation technique v4, architecture multi-tenant avec diagrammes Mermaid</p>
              </div>
              <div className="docs-grid">
                {DOCS.map(doc => (
                  <div key={doc.id} className="doc-card">
                    {doc.type === "md" && (
                      <div style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.2)", padding: "8px 18px", display: "flex", alignItems: "center", gap: 8 }}>
                        <AlertTriangle size={12} color="#F59E0B" />
                        <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "#F59E0B", fontWeight: 700, letterSpacing: ".06em" }}>FICHIER MARKDOWN — CONTIENT DES DIAGRAMMES MERMAID</span>
                      </div>
                    )}
                    <div className="doc-card-hd" style={{ borderLeft: `4px solid ${doc.color}`, paddingLeft: 18 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: doc.color + "18", border: `1px solid ${doc.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <doc.Icon size={18} color={doc.color} />
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                            <div className="doc-card-title">{doc.title}</div>
                            <span style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: doc.type === "pdf" ? "rgba(59,130,246,0.1)" : "rgba(245,158,11,0.1)", color: doc.type === "pdf" ? "#3B82F6" : "#F59E0B", border: `1px solid ${doc.type === "pdf" ? "rgba(59,130,246,0.2)" : "rgba(245,158,11,0.2)"}`, flexShrink: 0 }}>
                              {doc.type === "pdf" ? "PDF" : "MD"}
                            </span>
                          </div>
                          <div className="doc-card-subtitle">{doc.subtitle}</div>
                        </div>
                      </div>
                    </div>
                    <div className="doc-card-desc">{doc.description}</div>
                    {doc.type === "md" && doc.mdNote && (
                      <div style={{ margin: "0 22px 12px", padding: "10px 14px", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)", borderRadius: 7 }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "#F59E0B", marginBottom: 5 }}>⚠ Ouvrir avec un éditeur Mermaid</div>
                        <div style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.5, marginBottom: 6 }}>{doc.mdNote}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {doc.mdEditors.map(ed => (
                            <span key={ed} style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(245,158,11,0.1)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.25)" }}>{ed}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="doc-sections">
                      {doc.sections.map((s, i) => (
                        <div key={i} className="doc-section-item">
                          <div className="doc-section-name">{s.title}</div>
                          <div className="doc-section-content">{s.content}</div>
                        </div>
                      ))}
                    </div>
                    <div className="doc-card-footer">
                      <div className="doc-pin-badge">
                        <Check size={9} />
                        TOUJOURS ATTACHÉ
                      </div>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--muted)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.filename}</span>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <a href={`/docs/${doc.filename}`} download className="tb-btn" style={{ padding: "5px 10px", fontSize: 9, textDecoration: "none" }}>
                          <Download size={11} /> {doc.type === "pdf" ? "PDF" : "MD"}
                        </a>
                        {doc.type === "pdf" ? (
                          <a href={`/docs/${doc.filename}`} target="_blank" rel="noopener noreferrer" className="tb-btn" style={{ padding: "5px 10px", fontSize: 9, textDecoration: "none" }}>
                            <ExternalLink size={11} /> Ouvrir
                          </a>
                        ) : (
                          <button className="tb-btn" style={{ padding: "5px 10px", fontSize: 9 }} onClick={() => { const a = document.createElement("a"); a.href = `/docs/${doc.filename}`; a.download = doc.filename; a.click(); }}>
                            <ExternalLink size={11} /> Télécharger
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {view !== "docs" && (
            <>
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-label">Total Functions</div>
                  <div className="stat-val">{FUNCTIONS.length}</div>
                  <div className="stat-sub">{doneFns} terminées · {inProgFns} en cours · {todoFns} à faire</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Total Tasks</div>
                  <div className="stat-val" style={{ color: "var(--blue)" }}>{totalTasks}</div>
                  <div className="stat-sub">test + dev tasks</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Completion</div>
                  <div className="stat-val" style={{ color: "var(--green)" }}>{avgCompletion}%</div>
                  <div className="stat-sub">avg across functions</div>
                </div>
              </div>
              <div className="filter-row">
                <span className="filter-label">Status:</span>
                {["ALL", "done", "in-progress", "todo"].map(s => (
                  <div key={s} className={`chip${statusFilter === s ? " on" : ""}`} onClick={() => setStatusFilter(s)}>
                    {s === "ALL" ? "All" : STATUS_META[s]?.label}
                  </div>
                ))}
              </div>
            </>
          )}

          {view === "list" && (
            <div className="fn-list">
              {(selectedFn !== null ? filteredFns.filter(f => f.id === selectedFn) : filteredFns).map(fn => {
                const liveProgress = getFnProgress(fn);
                const liveStatus = getFnStatus(fn);
                const sm = STATUS_META[liveStatus];
                const isExp = expandedFns[fn.id];
                return (
                  <div key={fn.id} className={`fn-card${isExp ? " expanded" : ""}`}>
                    <div className="fn-header" onClick={() => toggleFn(fn.id)}>
                      <div style={{ color: "var(--muted)", transition: "transform .2s", transform: isExp ? "rotate(90deg)" : "rotate(0deg)", flexShrink: 0 }}>
                        <ChevronRight size={16} />
                      </div>
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: fn.color + "18", border: `1px solid ${fn.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <fn.Icon size={14} color={fn.color} />
                      </div>
                      <div className="fn-label" style={{ background: fn.color + "18", color: fn.color, border: `1px solid ${fn.color}30` }}>{fn.label}</div>
                      <div className="fn-name">{fn.name}</div>
                      <div className="fn-meta">
                        {fn.who && <div className="who-badge">{fn.who}</div>}
                        <div className="badge" style={{ background: sm.bg, color: sm.color, borderColor: sm.color + "30" }}>
                          <sm.Icon size={9} />{sm.label}
                        </div>
                        <div className="progress-wrap">
                          <div className="progress-bar"><div className="progress-fill" style={{ width: liveProgress + "%", background: fn.color }} /></div>
                          <div className="progress-pct">{liveProgress}%</div>
                        </div>
                        <button className="tb-btn" style={{ padding: "4px 10px", fontSize: 9 }} onClick={(e) => openDetail(fn, e)}>
                          <ExternalLink size={10} /> Detail
                        </button>
                      </div>
                    </div>
                    {isExp && (
                      <div className="fn-body">
                        <div className="sf-list">
                          {fn.subfunctions.map(sf => {
                            const sfOpen = expandedSfs[sf.id];
                            const sfSm = STATUS_META[sf.status];
                            return (
                              <div key={sf.id} className="sf-item">
                                <div className="sf-header" onClick={() => toggleSf(sf.id)}>
                                  <span className="sf-id">{sf.id}</span>
                                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: sfSm.color, flexShrink: 0 }} />
                                  <span className="sf-name">{sf.name}</span>
                                  {sf.sfTag === "proposition" && <span className="tag-badge tag-proposition"><Sparkles size={8} /> Proposition</span>}
                                  {sf.stories && (
                                    <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--muted)", marginRight: 8 }}>
                                      {sf.stories.length} stories
                                    </span>
                                  )}
                                  {sf.tasks && (
                                    <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--muted)", marginRight: 8 }}>
                                      {sf.tasks.filter(t => tasks[t.id]).length}/{sf.tasks.length} tasks
                                    </span>
                                  )}
                                  <div style={{ color: "var(--muted)", transition: "transform .2s", transform: sfOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                                    <ChevronRight size={12} />
                                  </div>
                                </div>
                                {sfOpen && (
                                  <div className="sf-body">
                                    {sf.stories && sf.stories.length > 0 && (
                                      <>
                                        <div className="stories-title">User Stories</div>
                                        {sf.stories.map(s => (
                                          <div key={s.id} className="story-row">
                                            <span className="story-id">{s.id}</span>
                                            <span className="story-text">{s.text}</span>
                                            <span className="story-ep">{s.endpoint}</span>
                                          </div>
                                        ))}
                                      </>
                                    )}
                                    {sf.tasks && sf.tasks.length > 0 && (
                                      <>
                                        <div className="tasks-title">Tasks</div>
                                        {sf.tasks.map(t => (
                                          <div key={t.id} className="task-row">
                                            <div className={`task-check${tasks[t.id] ? " done" : ""}`} onClick={() => toggleTask(t.id)}>
                                              {tasks[t.id] ? <Check size={10} color="#fff" /> : null}
                                            </div>
                                            <span className={`task-text${tasks[t.id] ? " done" : ""}`}>{t.text}</span>
                                            {t.tag === "proposition" && <span className="tag-badge tag-proposition"><Sparkles size={8} /> Proposition</span>}
                                          </div>
                                        ))}
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {view === "board" && (
            <div className="board">
              {[
                { key: "todo", label: "À faire", color: "#6B7280", Icon: Circle },
                { key: "in-progress", label: "En cours", color: "#F59E0B", Icon: Clock },
                { key: "done", label: "Terminé", color: "#22C55E", Icon: Check },
              ].map(col => {
                const fns = filteredFns.filter(f => getFnStatus(f) === col.key);
                return (
                  <div key={col.key} className="board-col">
                    <div className="board-col-hd">
                      <col.Icon size={14} color={col.color} />
                      {col.label}
                      <div className="board-col-count" style={{ background: `${col.color}18`, color: col.color, border: `1px solid ${col.color}30` }}>{fns.length}</div>
                    </div>
                    <div className="board-col-body">
                      {fns.map(fn => {
                        const bProgress = getFnProgress(fn);
                        return (
                        <div key={fn.id} className="board-card" onClick={(e) => openDetail(fn, e)}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                            <div style={{ width: 26, height: 26, borderRadius: 6, background: fn.color + "18", border: `1px solid ${fn.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <fn.Icon size={13} color={fn.color} />
                            </div>
                            <div>
                              <div style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: fn.color + "18", color: fn.color, border: `1px solid ${fn.color}30`, display: "inline-block", marginBottom: 4 }}>{fn.label}</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{fn.name}</div>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                            {fn.who && <div className="who-badge">{fn.who}</div>}
                          </div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: bProgress + "%", background: fn.color }} /></div>
                          <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--muted)", marginTop: 4, textAlign: "right" }}>{bProgress}%</div>
                        </div>
                      )})}
                      {fns.length === 0 && (
                        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--border2)", padding: "20px 0", textAlign: "center" }}>No functions</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {view === "timeline" && (
            <div className="timeline">
              {filteredFns.map(fn => {
                const tlProgress = getFnProgress(fn);
                const sm = STATUS_META[getFnStatus(fn)];
                return (
                  <div key={fn.id} className="tl-row" onClick={(e) => openDetail(fn, e)}>
                    <span className="tl-id">{fn.label}</span>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: fn.color, flexShrink: 0 }} />
                    <span className="tl-name">{fn.name}</span>
                    {fn.who && <div className="who-badge" style={{ flexShrink: 0 }}>{fn.who}</div>}
                    <div className="badge" style={{ background: sm.bg, color: sm.color, borderColor: sm.color + "30", flexShrink: 0 }}>
                      <sm.Icon size={9} />{sm.label}
                    </div>
                    <div className="tl-bar-wrap"><div className="tl-bar" style={{ width: tlProgress + "%", background: fn.color }} /></div>
                    <span className="tl-pct">{tlProgress}%</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {detailOpen && <div className="overlay" onClick={() => setDetailOpen(false)} />}
      <div className={`detail${detailOpen ? " open" : ""}`}>
        {detailFn && (
          <>
            <div className="detail-hd">
              <div style={{ width: 32, height: 32, borderRadius: 8, background: detailFn.color + "18", border: `1px solid ${detailFn.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <detailFn.Icon size={16} color={detailFn.color} />
              </div>
              <div className="fn-label" style={{ background: detailFn.color + "18", color: detailFn.color, border: `1px solid ${detailFn.color}30`, fontSize: 11, padding: "4px 10px", borderRadius: 5 }}>{detailFn.label}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", letterSpacing: "-.02em", flex: 1 }}>{detailFn.name}</div>
              <button className="detail-close" onClick={() => setDetailOpen(false)}><X size={14} /></button>
            </div>
            <div className="detail-body">
              <div className="detail-section">
                <div className="detail-section-title">Overview</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                  {(() => { const sm = STATUS_META[getFnStatus(detailFn)]; return <div className="badge" style={{ background: sm.bg, color: sm.color, borderColor: sm.color + "30" }}><sm.Icon size={9} />{sm.label}</div>; })()}
                  {detailFn.who && <div className="who-badge">{detailFn.who}</div>}
                  <div className="badge" style={{ background: "rgba(59,130,246,0.08)", color: "var(--blue)", borderColor: "rgba(59,130,246,0.2)" }}><CheckSquare size={9} />{getTotalTasks(detailFn)} tasks</div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", marginBottom: 4 }}>
                    <span>Progress</span><span style={{ color: detailFn.color, fontWeight: 700 }}>{getFnProgress(detailFn)}%</span>
                  </div>
                  <div style={{ height: 8, background: "var(--bg2)", borderRadius: 4, overflow: "hidden", border: "1px solid var(--border)" }}>
                    <div style={{ height: "100%", width: getFnProgress(detailFn) + "%", background: detailFn.color, borderRadius: 4, transition: "width .4s" }} />
                  </div>
                </div>
              </div>
              <div className="detail-section">
                <div className="detail-section-title">Subfunctions ({detailFn.subfunctions.length})</div>
                {detailFn.subfunctions.map(sf => {
                  const sfSm = STATUS_META[sf.status];
                  return (
                    <div key={sf.id} style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", borderRadius: 8, padding: "12px 14px", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: sf.stories || sf.tasks ? 10 : 0 }}>
                        <sfSm.Icon size={10} color={sfSm.color} />
                        <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--muted)", flexShrink: 0 }}>SF-{sf.id}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", flex: 1 }}>{sf.name}</span>
                        <div className="badge" style={{ background: sfSm.bg, color: sfSm.color, borderColor: sfSm.color + "30", fontSize: 8 }}>{sfSm.label}</div>
                      </div>
                      {sf.stories && sf.stories.map(s => (
                        <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", borderRadius: 5, background: "var(--bg2)", marginBottom: 3, border: "1px solid var(--border)" }}>
                          <span style={{ fontFamily: "var(--mono)", fontSize: 8, color: "var(--accent)", fontWeight: 700, width: 60, flexShrink: 0 }}>{s.id}</span>
                          <span style={{ fontSize: 11, color: "var(--text)", flex: 1, lineHeight: 1.4 }}>{s.text}</span>
                        </div>
                      ))}
                      {sf.tasks && (
                        <div style={{ marginTop: sf.stories ? 8 : 0 }}>
                          <div style={{ fontFamily: "var(--mono)", fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--muted)", marginBottom: 4 }}>
                            Tasks ({sf.tasks.filter(t => tasks[t.id]).length}/{sf.tasks.length})
                          </div>
                          {sf.tasks.map(t => (
                            <div key={t.id} style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "4px 0", borderBottom: "1px solid var(--border)" }}>
                              <div onClick={() => toggleTask(t.id)} className={`task-check${tasks[t.id] ? " done" : ""}`} style={{ marginTop: 1 }}>
                                {tasks[t.id] ? <Check size={10} color="#fff" /> : null}
                              </div>
                              <span className={`task-text${tasks[t.id] ? " done" : ""}`} style={{ fontSize: 11 }}>{t.text}</span>
                              {t.tag === "proposition" && <span className="tag-badge tag-proposition" style={{ marginTop: 2 }}><Sparkles size={8} /> Proposition</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}