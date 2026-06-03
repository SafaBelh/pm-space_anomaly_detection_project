---

# Documentation Technique Complète – Système Multi-Tenant & Pipelines

## Introduction
Ce document décrit l’ensemble des fonctionnalités du moteur d’importation et d’analyse financière multi-tenant.  
Chaque section présente une **feature** avec ses sous‑fonctions illustrées par des diagrammes Mermaid.

---

## Feature A — Organisation (Tenants)
**Description** : Création et gestion des tenants (isolation par base de données ou schéma).

### Sous‑features

#### 1. Création d’un tenant par l’administrateur moteur
```mermaid
sequenceDiagram
    participant Admin as Admin Moteur
    participant API as API Moteur
    participant DB as Base de données
    Admin->>API: POST /tenants (nom, type=ISOLATED/SHARED)
    API->>DB: Insérer tenant (status = CREATING)
    alt ISOLATED
        API->>DB: CREATE DATABASE tenant_{id}
    else SHARED
        API->>DB: Créer schéma tenant_{id}
    end
    API->>DB: Mettre à jour status = ACTIVE
    API-->>Admin: 201 Created + configuration accès
```

#### 2. Suppression d’un tenant (avec CASCADE et DROP DB si ISOLATED)
```mermaid
flowchart TD
    A["Admin demande suppression tenant"] --> B{"Type d'isolation ?"}
    
    B -->|ISOLATED| C["Supprimer toutes les données liées (CASCADE)"]
    C --> D["DROP DATABASE tenant_id"]

    B -->|SHARED| E["Supprimer toutes les lignes + schéma (CASCADE)"]

    D --> F["Marquer tenant = DELETED"]
    E --> F

    F --> G["Réponse 204 No Content"]
```

---

## Feature B — Connecteurs ERP
**Description** : Déclaration des ERP disponibles (type, clé publique PEM pour vérification JWT).

### Sous‑features

#### 1. Création d’un connecteur (avec clé publique PEM)
```mermaid
sequenceDiagram
    participant Admin as Admin Moteur
    participant API as API Moteur
    participant Store as Stockage Connecteurs
    Admin->>API: POST /connectors (name, public_pem, erp_type)
    API->>API: Valider format PEM
    API->>Store: Enregistrer + générer connector_id
    Store-->>API: OK
    API-->>Admin: 201 Created (connector_id)
```

#### 2. Suppression d’un connecteur (refusé si utilisé)
```mermaid
flowchart TD
    A[Demande suppression connecteur] --> B{Connecteur référencé<br>par un tenant actif?}
    B -->|Oui| C[Refus suppression<br>409 Conflict]
    B -->|Non| D[Supprimer connecteur]
    D --> E[204 No Content]
```

#### 3. Exemple complet : création d’un connecteur et connexion ERP

Cela permet d’illustrer concrètement :

- La création du connecteur par l’admin (déjà décrite en 1.)
- Les informations partagées avec l’équipe ERP
- La vérification JWT lors de la connexion (qui complète le flux de la Feature D)

Voici comment l’intégrer dans la structure actuelle :

### Sous‑features

#### 1. Création d’un connecteur (avec clé publique PEM)
[... diagramme existant ...]

#### 2. Suppression d’un connecteur (refusé si utilisé)
[... diagramme existant ...]

#### 3. Exemple complet : création d’un connecteur et connexion ERP
```mermaid
sequenceDiagram
    participant Admin as Admin Moteur
    participant API as API Moteur
    participant DB as Base de données
    participant ERPTeam as Équipe ERP (ACME)
    participant ERP as Système ERP

    Note over Admin,DB: 1. Création du connecteur
    Admin->>API: POST /admin/connectors<br>{name: "ACME", authType: "JWT_SIGNED", publicKey: "PEM..."}
    API->>DB: Stocker connecteur (id, name, publicKey)
    DB-->>API: OK (id = uuid-abc)
    API-->>Admin: 201 Created (connector_id = uuid-abc)

    Note over Admin,ERPTeam: 2. Partage des informations
    Admin->>ERPTeam: Transmet :<br>connectorName = "ACME"<br>Instructions JWT :<br>{ tenant: "Whitecape", external_id: "TENANT_WC_00201323" }<br>Signer avec clé privée associée

    Note over ERP,API: 3. Connexion de l'ERP
    ERP->>API: POST /auth/erp_login<br>{ tenant_id: "Whitecape", jwt_token_signed: "..." }
    API->>API: Vérifier signature JWT avec clé publique du connecteur "ACME"
    alt Signature valide
        API-->>ERP: 200 OK + token_interne
    else Signature invalide
        API-->>ERP: 401 Unauthorized
    end
```

---

## Feature C — Pipelines d’Importation
**Description** : Importation et traitement des données ERP (factures, écritures comptables).

### 1. Cycle de vie complet d’un pipeline
```mermaid
stateDiagram-v2
    [*] --> CRÉATION : admin crée un pipeline
    CRÉATION --> CONFIGURATION : paramètres ERP, mapping
    CONFIGURATION --> SAUVEGARDE : utilisateur valide
    SAUVEGARDE --> EXÉCUTION : déclenchement (manuel/planifié)
    EXÉCUTION --> [*] : terminé (succès/échec)
    EXÉCUTION --> CONFIGURATION : retour pour correction
```

### 2. Flux d’exécution interne
```mermaid
flowchart LR
    A[Données ERP brutes] --> B[Adapter<br>conversion format]
    B --> C[Normalizer<br>dédoublonnage, typage]
    C --> D[Générateur de Séries<br>temporelles comptables]
    D --> E[Scoring<br>calculs KPI/budgets]
    E --> F[Alertes<br>détection anomalies]
    F --> G[(Base consolidée)]
    
    style B fill:#e1f5fe
    style C fill:#e1f5fe
    style D fill:#fff9c4
    style E fill:#fff9c4
    style F fill:#ffccbc
```

### 3. Gestion des statuts comptables (Provisionnel → Définitif)
```mermaid
stateDiagram-v2
    Provisionnel --> Définitif : clôture mensuelle validée
    Provisionnel --> Provisionnel : nouvelle écriture reçue
    Définitif --> [*] : verrouillé (plus de modifications)
    note right of Définitif
        Les calculs de budget utilisent
        le définitif si disponible
    end note
```

### 4. Détection des documents manquants
```mermaid
flowchart TD
    A[Exécution pipeline] --> B[Comparer numéros de séquences<br>attendus vs reçus]
    B --> C{Trouve un trou?}
    C -->|Oui| D[Créer alerte DOCUMENT_MANQUANT]
    D --> E[Inclure dans rapport exécution]
    C -->|Non| F[Aucune alerte de manquant]
```

---

## Feature D — Connexion Tenant ↔ ERP
**Description** : Authentification déléguée par jeton JWT (l’ERP signe, le moteur vérifie).

### Flux complet JWT
```mermaid
sequenceDiagram
    participant ERP as Système ERP
    participant API as API Moteur
    participant Connector as Connecteur (clé publique)
    participant Tenant as Tenant (session)
    ERP->>API: POST /auth/erp_login<br>{tenant_id, jwt_token_signed}
    API->>API: Extraire connector_id du tenant
    API->>Connector: Récupérer clé publique PEM
    API->>API: Vérifier signature JWT avec clé publique
    alt Signature valide
        API->>Tenant: Générer token interne (session)
        Tenant-->>API: token interne + droits ERP
        API-->>ERP: 200 OK + token_interne
    else Signature invalide
        API-->>ERP: 401 Unauthorized
    end
```

### Isolation des données en session ERP
- Le token interne ne permet d’accéder qu’aux ressources du **tenant** et du **connecteur ERP** utilisé.
- Chaque requête est filtrée automatiquement par `tenant_id` et `erp_session_id`.

---

## Feature E — Alertes et Feedback
**Description** : Gestion des anomalies détectées (factures dupliquées, montants incohérents, documents manquants).

### Machine à états des alertes
```mermaid
stateDiagram-v2
    [*] --> PENDING : détection anomalie
    PENDING --> CONFIRMED : utilisateur confirme l'anomalie
    PENDING --> REJECTED : utilisateur rejette (fausse alerte)
    PENDING --> IGNORED : utilisateur ignore temporairement
    CONFIRMED --> [*] : prise en compte dans les calculs
    REJECTED --> [*] : écart exclu des calculs
    IGNORED --> PENDING : réactivation manuelle
```

### Impact sur les calculs (exclusion/inclusion des factures)
```mermaid
flowchart TD
    A[Alerte sur une facture] --> B{État de l'alerte}
    B -->|CONFIRMED| C[Facture exclue des KPI<br>et du scoring]
    B -->|REJECTED| D[Facture incluse normalement]
    B -->|PENDING ou IGNORED| E[Facture incluse mais flaguée<br>+ notification tableau de bord]
    C --> F[Calculs recalculés automatiquement]
    D --> F
    E --> F
```

---

## Feature F — Budget et Prévisions
**Description** : Calculs budgétaires sans persistance (les budgets sont recalculés à la demande).

### Philosophie (aucune persistance)
```mermaid
flowchart LR
    A["Données historiques\n(factures définitives)"] --> B["Budget calculé en mémoire"]
    B --> C["Résultat retourné à l'API"]
    C --> D["Ne jamais écrire en base"]

    classDef warning stroke:#f00,stroke-width:3px;
    class D warning;
```

### Flux budgétaire complet
```mermaid
flowchart TD
    subgraph "Flux Budget"
        A[Collecte<br>factures + prévisions saisies] --> B[Vérification<br>cohérence, périodes]
        B --> C[Répartition<br>par centre de coût/produit]
        C --> D[Scaling<br>annualisation / prorata]
        D --> E[Comparaison<br>réel vs budget]
    end
    E --> F[(Résultat<br>écarts, indicateurs)]
```

### Endpoints budgétaires (exemples)
```mermaid
flowchart LR
    A["GET /budget?mois=2025-01"] --> B["Calcul à la volée"]
    C["POST /budget/simuler (avec hypothèses)"] --> D["Retourne simulation sans persistance"]
    E["POST /budget/recalculate-all"] --> F["Revalide tous les caches mémoire"]
```

---

## Feature G — Supervision et Administration
**Description** : Tableaux de bord administrateur avec indicateurs globaux.

### Indicateurs globaux et filtres par tenant
```mermaid
graph TD
    subgraph "Dashboard Admin"
        A[Nb tenants actifs] --> D[Filtre par tenant]
        B[Nb pipelines configurés] --> D
        C[Nb exécutions / 24h] --> D
        E[Nb alertes non traitées] --> D
    end
    D --> F[(Données agrégées<br>ou drill-down)]
```

### Exemple d’affichage
```mermaid
flowchart LR
    User[Admin] --> API_G[GET /admin/stats]
    API_G --> CheckTenant{tenant_id présent?}
    CheckTenant -->|Oui| TenantStats[Statistiques limitées au tenant]
    CheckTenant -->|Non| GlobalStats[Statistiques tous tenants]
```

---

## Sécurité — Isolation Multi‑Tenant

### Architecture de sécurité
```mermaid
flowchart TB
    subgraph "Niveau 1 – Isolation entre tenants"
        T1[Tenant A - base/schéma A]
        T2[Tenant B - base/schéma B]
        T3[Tenant C - base/schéma C]
    end
    subgraph "Niveau 2 – Isolation intra-tenant (par ERP)"
        E1[ERP1 - session token]
        E2[ERP2 - session token]
    end
    T1 --> E1
    T1 --> E2
    T2 --> E1
    
    style T1 fill:#c8e6c9
    style T2 fill:#c8e6c9
    style T3 fill:#c8e6c9
```

### Mesures de sécurité clés
```mermaid
mindmap
  root((Sécurité))
    Chiffrement
      Données sensibles au repos AES‑256
      TLS 1.3 en transit
    Authentification
      JWT + clés PEM par connecteur
      Rotation des clés
    Injection SQL
      Requêtes paramétrées
      ORM avec validation tenant_id
    Multi‑tenant
      Vérification explicite tenant_id sur chaque requête
      Middleware de contexte
    Fichiers
      Stockage isolé par tenant
      Scan antivirus à l’import
```

---

## Codes d’Erreur — Gestion des exceptions
Réponses API standardisées avec code HTTP explicite.

| Code HTTP | Signification         | Exemple de cas                             |
| --------- | --------------------- | ------------------------------------------ |
| 400       | Requête invalide      | Payload JSON mal formé, paramètre manquant |
| 401       | Non authentifié       | JWT expiré ou signature invalide           |
| 403       | Non autorisé          | Tentative d’accès à un autre tenant        |
| 404       | Ressource introuvable | Pipeline ID inexistant                     |
| 409       | Conflit               | Suppression d’un connecteur encore utilisé |
| 500       | Erreur interne        | Échec inattendu de la base de données      |

### Gestion des erreurs (flow)
```mermaid
flowchart TD
    A[Requête API] --> B{Middleware auth}
    B -->|échec| 401
    B -->|ok| C{Vérification tenant}
    C -->|échec| 403
    C -->|ok| D[Contrôle métier]
    D -->|violation règle| 409
    D -->|ressource absente| 404
    D -->|exception technique| 500
    D -->|succès| 2xx
```

---

