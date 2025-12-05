import { useEffect } from 'react'

const ACTION_LABELS = {
  contact: 'Contact',
  don: 'Don',
  benevolat: 'Bénévolat',
  info: 'Demande d\'information'
}

const ACTION_MESSAGES = {
  contact: {
    title: 'Merci pour votre message !',
    impact: 'Votre message a été reçu et sera traité dans les plus brefs délais. Notre équipe vous répondra sous 48 heures.',
    project: 'Cette année, nous nous concentrons sur l\'amélioration de notre communication et de notre réactivité avec nos partenaires et supporters.'
  },
  don: {
    title: 'Merci pour votre générosité !',
    impact: 'Votre don contribue directement à nos projets et permet de faire une réelle différence dans la vie de nombreuses personnes.',
    project: 'En 2024, nous avons pour objectif de financer 10 nouveaux projets d\'aide sociale et d\'éducation. Votre contribution nous rapproche de cet objectif.'
  },
  benevolat: {
    title: 'Merci pour votre engagement !',
    impact: 'Votre volonté de nous aider en tant que bénévole est précieuse. Nous vous contacterons très prochainement pour discuter des opportunités disponibles.',
    project: 'En 2024, nous développons de nouveaux programmes de bénévolat dans les domaines de l\'éducation, de l\'environnement et de l\'aide sociale. Votre participation est essentielle.'
  },
  info: {
    title: 'Votre demande a été reçue !',
    impact: 'Nous avons bien reçu votre demande d\'information et nous vous répondrons dans les plus brefs délais avec toutes les informations demandées.',
    project: 'En 2024, nous renforçons notre transparence et notre communication pour mieux informer nos partenaires et le public sur nos actions et nos projets.'
  }
}

function ConfirmationPage({ data, onReset }) {
  const currentYear = new Date().getFullYear()
  const actionType = data.actionType
  const actionLabel = ACTION_LABELS[actionType] || actionType
  const messages = ACTION_MESSAGES[actionType] || ACTION_MESSAGES.contact

  // Calculer le montant pour les dons
  let displayAmount = ''
  if (actionType === 'don' && data.montant) {
    displayAmount = `${parseFloat(data.montant).toFixed(2)}€`
    if (data.recurrence && data.recurrence !== 'unique') {
      const recurrenceLabels = {
        mensuel: 'par mois',
        trimestriel: 'par trimestre',
        annuel: 'par an'
      }
      displayAmount += ` ${recurrenceLabels[data.recurrence] || ''}`
    }
  }

  // Mettre à jour le message d'impact pour les dons
  let impactMessage = messages.impact
  if (actionType === 'don' && displayAmount) {
    impactMessage = `Votre don de ${displayAmount} contribue directement à nos projets et permet de faire une réelle différence dans la vie de nombreuses personnes.`
  } else if (actionType === 'don') {
    impactMessage = `Votre don contribue directement à nos projets et permet de faire une réelle différence dans la vie de nombreuses personnes.`
  }

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10">
          {/* Icône de succès */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Titre */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
            {messages.title}
          </h1>

          {/* Informations personnelles */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            {data.nom && (
              <div className="mb-3">
                <p className="text-sm text-gray-600">Nom</p>
                <p className="text-lg font-semibold text-gray-900">{data.nom}</p>
              </div>
            )}
            
            <div className="mb-3">
              <p className="text-sm text-gray-600">Type d'action</p>
              <p className="text-lg font-semibold text-indigo-600">{actionLabel}</p>
            </div>

            {actionType === 'don' && displayAmount && (
              <div className="mb-3">
                <p className="text-sm text-gray-600">Montant</p>
                <p className="text-lg font-semibold text-green-600">{displayAmount}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-600">Année</p>
              <p className="text-lg font-semibold text-gray-900">{currentYear}</p>
            </div>
          </div>

          {/* Message d'impact */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-6 rounded-r-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Votre impact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {impactMessage}
            </p>
          </div>

          {/* Suivi du projet */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Suivi du projet {currentYear}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {messages.project}
            </p>
          </div>

          {/* Bouton retour */}
          <div className="flex justify-center">
            <button
              onClick={onReset}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              Retour au formulaire
            </button>
          </div>

          {/* Note de confirmation */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Un email de confirmation a été envoyé à {data.email || 'votre adresse email'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage

