# Formm - Formulaires Dynamiques React

Application React avec Tailwind CSS pour créer des formulaires dynamiques avec différents types d'actions : contact, don, bénévolat et demande d'information.

## Fonctionnalités

- ✅ Formulaire dynamique avec 4 types d'actions
- ✅ Champs adaptatifs selon le type sélectionné
- ✅ Validation et sécurité intégrées
- ✅ Design responsive (mobile, tablette, PC)
- ✅ Page de confirmation personnalisée avec :
  - Nom de l'utilisateur
  - Type d'action effectué
  - Année en cours
  - Message d'impact
  - Suivi du projet de l'année

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Build

```bash
npm run build
```

## Types de formulaires

### Contact
- Nom, Email, Téléphone (optionnel), Message

### Don
- Nom, Email, Montant, Récurrence (unique/mensuel/trimestriel/annuel), Message (optionnel)

### Bénévolat
- Nom, Email, Téléphone, Disponibilité, Compétences, Message (optionnel)

### Demande d'information
- Nom, Email, Sujet, Message

## Sécurité

- Sanitization des entrées utilisateur
- Validation côté client
- Protection contre les attaques XSS
- Validation des formats (email, téléphone)

## Technologies

- React 18
- Tailwind CSS 3
- Vite
- React Router DOM

# Global_form
