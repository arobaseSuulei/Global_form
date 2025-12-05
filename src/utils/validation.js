// Fonction de sanitization pour prévenir les attaques XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .replace(/[<>]/g, '') // Supprime les balises HTML
    .trim()
}

// Validation de l'email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validation du téléphone (format français)
const validatePhone = (phone) => {
  const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/
  const cleaned = phone.replace(/\s/g, '')
  return phoneRegex.test(cleaned)
}

// Validation des formulaires selon le type d'action
export const validateForm = (actionType, formData) => {
  const errors = {}

  if (!actionType) {
    errors.actionType = 'Veuillez sélectionner un type d\'action'
    return errors
  }

  // Validation commune
  if (!formData.nom || formData.nom.trim().length < 2) {
    errors.nom = 'Le nom doit contenir au moins 2 caractères'
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Veuillez entrer une adresse email valide'
  }

  // Validation spécifique selon le type
  switch (actionType) {
    case 'contact':
      if (!formData.message || formData.message.trim().length < 10) {
        errors.message = 'Le message doit contenir au moins 10 caractères'
      }
      break

    case 'don':
      if (!formData.montant || parseFloat(formData.montant) <= 0) {
        errors.montant = 'Veuillez entrer un montant valide'
      }
      if (!formData.recurrence) {
        errors.recurrence = 'Veuillez sélectionner une récurrence'
      }
      break

    case 'benevolat':
      if (!formData.telephone || !validatePhone(formData.telephone)) {
        errors.telephone = 'Veuillez entrer un numéro de téléphone valide (format français)'
      }
      if (!formData.disponibilite) {
        errors.disponibilite = 'Veuillez sélectionner une disponibilité'
      }
      break

    case 'info':
      if (!formData.sujet || formData.sujet.trim().length < 3) {
        errors.sujet = 'Le sujet doit contenir au moins 3 caractères'
      }
      if (!formData.message || formData.message.trim().length < 10) {
        errors.message = 'Le message doit contenir au moins 10 caractères'
      }
      break

    default:
      break
  }

  return errors
}

